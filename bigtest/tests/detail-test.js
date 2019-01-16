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
      endDate: '01-31-2019'
    });
    return this.visit(`/requests/${request.id}`);
  });

  it('has a heading', () => {
    expect(DetailPage.hasHeading).to.equal(true);
    expect(DetailPage.headingText).to.contain('Editing Request');
  });

  it('has fields prepopulated with request values', () => {
    expect(DetailPage.form.ownerName).to.equal('David');
    expect(DetailPage.form.status).to.equal('Pending');
    expect(DetailPage.form.startDate.value).to.equal('01-01-2019');
    expect(DetailPage.form.endDate.value).to.equal('01-31-2019');
  });

  it('has a readonly owner name field', () => {
    expect(DetailPage.form.nameIsReadOnly).to.be.true;
  });

  describe('editing', () => {
    describe('the status field', () => {
      beforeEach(() => {
        return DetailPage.form.changeStatus('Denied');
      });

      it('updates the status', () => {
        expect(DetailPage.form.status).to.equal('Denied');
      });
    });

    describe('the start date field', () => {
      beforeEach(() => {
        return DetailPage.form.changeStartDate('7');
      });

      it('updates the start date', () => {
        expect(DetailPage.form.startDate.value).to.equal('01-07-2019');
      });
    });

    describe('the end date field', () => {
      beforeEach(() => {
        return DetailPage.form.changeEndDate('9');
      });

      it('updates the end date', () => {
        expect(DetailPage.form.endDate.value).to.equal('01-09-2019');
      });
    });

    describe('then canceling edits', () => {
      beforeEach(() => {
        return DetailPage.form.clickCancel();
      });

      it('navigates to the list view page', () => {
        expect(IndexPage.isPresent).to.be.true;
      });

      describe('confirms', () => {
        beforeEach(function() {
          this.visit(`/requests/${request.id}`);
        });

        it('original values have been restored to each field', () => {
          expect(DetailPage.form.status).to.equal('Pending');
          expect(DetailPage.form.startDate.value).to.equal('01-01-2019');
          expect(DetailPage.form.endDate.value).to.equal('01-31-2019');
        });
      });
    });
  });

  describe('saving edited fields', () => {
    let payload;
    beforeEach(async function() {
      this.server.put('/requests/:id', ({ requests }, netReq) => { // eslint-disable-line no-unused-vars
        payload = JSON.parse(netReq.requestBody);
        return payload;
      });

      await DetailPage.form.changeStatus('Approved');
      await DetailPage.form.changeStartDate('11-20-2019');
      await DetailPage.form.changeEndDate('12-05-2019');
      await DetailPage.form.clickSave();
    });

    it('sends the correct payload in the request', () => {
      expect(payload.status).to.equal('Approved');
      expect(payload.startDate).to.equal('11-20-2019');
      expect(payload.endDate).to.equal('12-05-2019');
    });
  });
});
