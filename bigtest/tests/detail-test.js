import { expect } from 'chai';
import { beforeEach, describe, it } from '@bigtest/mocha';
import { describeApp } from '../helpers/setup-app';

import DetailPage from '../interactors/detail-page';
import IndexPage from '../interactors/index-page';

describeApp('Detail Route', () => {
  let request;
  beforeEach(function() {
    request = this.server.create('request', {
      owner: 'David',
      status: 'Pending',
      startDate: '01-01-2019',
      endDate: '02-01-2019'
    });
    return this.visit(`/requests/${request.id}`);
  });

  it('has a heading', () => {
    expect(DetailPage.hasHeading).to.equal(true);
    expect(DetailPage.headingText).to.contain('Editing Request');
  });

  it('has fields prepopulated with request values', () => {
    expect(DetailPage.ownerName).to.equal('David');
    expect(DetailPage.status).to.equal('Pending');
    expect(DetailPage.startDate).to.equal('01-01-2019');
    expect(DetailPage.endDate).to.equal('02-01-2019');
  });

  it('has a readonly owner name field', () => {
    expect(DetailPage.nameIsReadOnly).to.be.true;
  });

  describe('editing input fields', () => {
    describe('status field', () => {
      beforeEach(() => {
        return DetailPage.changeStatus('Denied');
      });

      it('updates the field', () => {
        expect(DetailPage.status).to.equal('Denied');
      });
    });
    describe('start date field', () => {
      beforeEach(() => {
        return DetailPage.changeStartDate('06-07-2019');
      });

      it('updates the field', () => {
        expect(DetailPage.startDate).to.equal('06-07-2019');
      });
    });
    describe('end date field', () => {
      beforeEach(() => {
        return DetailPage.changeEndDate('06-09-2019');
      });

      it('updates the field', () => {
        expect(DetailPage.endDate).to.equal('06-09-2019');
      });
    });
  });

  describe('saving edited fields', () => {
    let payload;
    beforeEach(function() {
      this.server.put('/requests/:id', ({ requests }, netReq) => { // eslint-disable-line no-unused-vars
        payload = JSON.parse(netReq.requestBody);
        return payload;
      });

      return DetailPage
        .changeStatus('Approved')
        .changeStartDate('11-20-2019')
        .changeEndDate('12-05-2019')
        .clickSave();
    });

    it('sends the correct payload in the request', () => {
      expect(payload.status).to.equal('Approved');
      expect(payload.startDate).to.equal('11-20-2019');
      expect(payload.endDate).to.equal('12-05-2019');
    });

    describe('Canceling edits', () => {
      beforeEach(() => {
        return DetailPage.clickCancel();
      });

      it('navigates to the list view page', () => {
        expect(IndexPage.isPresent).to.be.true;
      });

      describe('confirming edits were removed after cancelation', () => {
        beforeEach(function() {
          this.visit(`/requests/${request.id}`);
        });

        it('reset the fields back to their original value', () => {
          expect(DetailPage.status).to.equal('Pending');
          expect(DetailPage.startDate).to.equal('01-01-2019');
          expect(DetailPage.endDate).to.equal('02-01-2019');
        });
      });
    });
  });
});
