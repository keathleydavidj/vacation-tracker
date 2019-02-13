import AppInteractor from '../interactors/app';
import { when } from '@bigtest/convergence';
import { setupApp } from '../helpers/setup-app';
import { AppModule } from '../../src/app/app.module';
import * as expect from 'expect';

describe('AppComponent', () => {
  const app = new AppInteractor();

  setupApp(AppModule);

  it('has a heading', when(() => {
    expect(app.hasHeading).toBe(true);
  }));

  describe('nav bar', () => {
    describe('clicking on calendar', () => {
      beforeEach(function() {
        return app.navBar.clickCalendar();
      });

      it('navigates to calendar route', function() {
        expect(this.currentURL).toBe('/calendar');
      });
    });

    describe('clicking on requests', () => {
      beforeEach(function() {
        return app.navBar.clickRequests();
      });

      it('navigates to index route', function() {
        expect(this.currentURL).toBe('/requests');
      });
    });
  });
});
