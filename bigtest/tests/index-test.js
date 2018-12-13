import { expect } from 'chai';
import { beforeEach, describe, it } from '@bigtest/mocha';
import { describeApp } from '../helpers/setup-app';

import DetailPage from '../interactors/detail-page';
import IndexPage from '../interactors/index-page';

describeApp('Index Route', () => {
  it('has a heading', () => {
    expect(IndexPage.hasHeading).to.equal(true);
    expect(IndexPage.headingText).to.equal('Requests');
  });
  
  describe('list of requests', () => {
    it('displays the list', () => {
      expect(IndexPage.requestList().length).to.equal(4);
    });

    describe('each request', () => {
      it('displays requestee field', () => {
        expect(IndexPage.requestList(0).ownerName).to.equal('Larry');
      });

      it('displays status field', () => {
        expect(IndexPage.requestList(0).status.label).to.equal('Status');
        expect(IndexPage.requestList(0).status.text).to.equal('Approved');
      });

      it('displays start date field', () => {
        expect(IndexPage.requestList(0).startDate.label).to.equal('Start date');
        expect(IndexPage.requestList(0).startDate.text).to.equal('01-01-2019');
      });

      it('displays end date field', () => {
        expect(IndexPage.requestList(0).endDate.label).to.equal('End date');
        expect(IndexPage.requestList(0).endDate.text).to.equal('12-31-2019');
      });
    });

    describe('Selecting a request for editing', () => {
      beforeEach(() => {
        return IndexPage.requestList(0).clickEdit();
      });

      it('navigates to the record editing page', () => {
        expect(DetailPage.isPresent).to.be.true;
      });
    });
  });
});
