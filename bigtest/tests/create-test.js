import { expect } from 'chai';
import { beforeEach, describe, it } from '@bigtest/mocha';

import { describeApp } from '..helpers/setup-app';
import CreatePage from '../interactors/create-page';
import IndexPage from '../interactors/index-page';

describeApp('Create Detail Route', () => {
  beforeEach(function() {
    return this.visit('/requests/new');
  });

  it('has disabled the save button when form is empty', () => {
    expect(CreatePage.isSaveDisabled).to.be.true;
  });

  describe('creating a record', () => {
    describe('with filled in values', () => {
      beforeEach(() => {
        return CreatePage
          .changeOwnerName('Amber')
          .changeStartDate('02-26-2019')
          .changeEndDate('03-01-2019');
      });

      it('updates the form values accordingly', () => {
        expect(CreatePage.ownerName).to.equal('Amber');
        expect(CreatePage.startDate).to.equal('02-26-2019');
        expect(CreatePage.endDate).to.equal('03-01-2019');
      });

      it('enables the save button', () => {
        expect(CreatePage.isSaveDisabled).to.be.false;
      });

      describe('clicking save', () => {
        let payload;
        beforeEach(function() {
          this.server.post('/requests', (db, netReq) => {
            payload = JSON.parse(netReq.requestBody);
            return db.requests.insert(payload);
          });

          return CreatePage.clickSave();
        });

        it('sends a POST request with the full payload', () => {
          expect(payload.owner).to.equal('Amber');
          expect(payload.startDate).to.equal('02-26-2019');
          expect(payload.endDate).to.equal('03-01-2019');
          expect(payload.status).to.equal('Pending');
        });

        it('navigates to the index page', () => {
          expect(IndexPage.isPresent).to.be.true;
        });

        it('shows the new record on the index page', () => {
          expect(IndexPage.requestList(0).ownerName).to.equal('Amber');
          expect(IndexPage.requestList(0).startDate).to.equal('02-26-2019');
          expect(IndexPage.requestList(0).endDate).to.equal('03-01-2019');
          expect(IndexPage.requestList(0).status).to.equal('Pending');
        });
      });
    });
  });
});