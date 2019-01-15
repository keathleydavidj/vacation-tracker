import { expect } from 'chai';
import { beforeEach, describe, it } from '@bigtest/mocha';

import { describeApp } from '../helpers/setup-app';
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
      beforeEach(async () => {
        await CreatePage.changeOwnerName('Amber')
        await CreatePage.changeStartDate('12')
        await CreatePage.changeEndDate('22');
      });
     
      it('updates the form values accordingly', () => {
        expect(CreatePage.ownerName).to.equal('Amber');
        expect(CreatePage.startDate.value).to.equal('01-12-2019');
        expect(CreatePage.endDate.value).to.equal('01-22-2019');
      });

      it('enables the save button', () => {
        expect(CreatePage.isSaveDisabled).to.be.false;
      });

      describe('clicking save', () => {
        let payload;
        beforeEach(function() {
          this.server.post('/requests', (db, netReq) => {
            payload = JSON.parse(netReq.requestBody);
            return db.requests.create(payload);
          });

          return CreatePage.clickSave();
        });

        it('sends a POST request with the full payload', () => {
          expect(payload.owner).to.equal('Amber');
          expect(payload.startDate).to.equal('2019-01-12T18:00:00.000Z');
          expect(payload.endDate).to.equal('2019-01-22T18:00:00.000Z');
          expect(payload.status).to.equal('Pending');
        });

        it('navigates to the index page', () => {
          expect(IndexPage.isPresent).to.be.true;
        });

        it('shows the new record on the index page', () => {
          let lastIndex = IndexPage.requestList().length - 1;
          expect(IndexPage.requestList(lastIndex).ownerName).to.equal('Amber');
          expect(IndexPage.requestList(lastIndex).startDate.text).to.equal('01-12-2019');
          expect(IndexPage.requestList(lastIndex).endDate.text).to.equal('01-22-2019');
          expect(IndexPage.requestList(lastIndex).status.text).to.equal('Pending');
        });
      });
    });
  });
});