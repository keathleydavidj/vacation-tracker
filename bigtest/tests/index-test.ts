import { when } from '@bigtest/convergence';
import * as expect from 'expect';

import { setupApp } from '../helpers/setup-app';
import { AppModule } from '../../src/app/app.module';
import CreatePage from '../interactors/create-page';
import DetailPage from '../interactors/detail-page';
import IndexPage from '../interactors/index-page';

describe('IndexRoute', () => {
  const app = new IndexPage();
  const create = new CreatePage();
  const detail = new DetailPage();

  setupApp(AppModule);

  beforeEach(function() {
    return this.visit('/requests');
  });

  it('has a heading', when(() => {
    expect(app.hasHeading).toBe(true);
    expect(app.headingText).toBe('Requests');
  }));

  describe('create new request button', () => {
    xit('exists on the page', () => {
      expect(app.isCreateButtonVisible).toBe(true);
    });

    // describe('when clicked', () => {
    //   beforeEach(() => {
    //     return app.clickCreateButton();
    //   });

    //   xit('navigates to the create form', () => {
    //     expect(create.isPresent).toBe(true);
    //   });
    // });
  });

  describe('list of requests', () => {
    it('displays each item', when(() => {
      expect(app.requestList().length).toBe(4);
    }));

    describe('for each request', () => {
      it('displays requestee field', when(() => {
        expect(app.requestList(0).ownerName).toBe('Larry');
      }));

      it('displays status field', when(() => {
        expect(app.requestList(0).status.label).toBe('Status');
        expect(app.requestList(0).status.text).toBe('Approved');
      }));

      it('displays start date field', when(() => {
        expect(app.requestList(0).startDate.label).toBe('Start date');
        expect(app.requestList(0).startDate.text).toBe('01-01-2019');
      }));

      it('displays end date field', when(() => {
        expect(app.requestList(0).endDate.label).toBe('End date');
        expect(app.requestList(0).endDate.text).toBe('12-31-2019');
      }));

      // describe('selecting for edit', () => {
      //   beforeEach(() => {
      //     return app.requestList(0).clickEdit();
      //   });

      //   xit('navigates to the record editing page', () => {
      //     expect(detail.isPresent).toBe(true);
      //   });
      // });

      describe('clicking delete icon', () => {
        let called = false;

        beforeEach(function() {
          this.server.delete('/requests/:id', () => {
            called = true;
            return {};
          });

          return app.requestList(0).clickDelete();
        });

        it('removes that record from the list', when(() => {
          expect(app.requestList(0).ownerName).not.toBe('Larry');
        }));

        it('sends off the api request successfully', when(() => {
          expect(called).toBe(true);
        }));
      });
    });
  });
});
