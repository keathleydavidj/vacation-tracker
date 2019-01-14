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

  describe('create new request button', () => {
    it('exists on the page', () => {
      expect(IndexPage.isCreateButtonVisible).to.be.true;
    });

    describe('when clicked', () => {
      beforeEach(() => {
        return IndexPage.clickCreateButton();
      });

      it('navigates to the create form', () => {
        expect(DetailPage.isPresent).to.be.true;
      });
    });
  });
  
  describe('list of requests', () => {
    it('displays each item', () => {
      expect(IndexPage.requestList().length).to.equal(4);
    });

    describe('for each request', () => {
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

      describe('selecting for edit', () => {
        beforeEach(() => {
          return IndexPage.requestList(0).clickEdit();
        });

        it('navigates to the record editing page', () => {
          expect(DetailPage.isPresent).to.be.true;
        });
      });

      describe('clicking delete icon', () => {
        let called = false;

        beforeEach(function() {
          this.server.delete('/requests/:id', (db, netReq) => {  // eslint-disable-line no-unused-vars
            called = true;
            return {};
          });

          return IndexPage.requestList(0).clickDelete();
        });

        it('removes that record from the list', () => {
          expect(IndexPage.requestList(0).ownerName).to.not.equal('Larry');
        });

        it('sends off the api request successfully', () => {
          expect(called).to.be.true;
        });
      });
    });
  });
});
