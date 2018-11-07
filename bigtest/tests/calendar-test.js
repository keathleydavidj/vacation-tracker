import { expect } from 'chai';
import { beforeEach, it } from '@bigtest/mocha';
import { describeApp } from '../helpers/setup-app';

import CalendarPage from '../interactors/calendar-page.js';

describeApp('Calendar', () => {
  beforeEach(function() {
    this.visit('/calendar');
  });

  it('has a heading', () => {
    expect(CalendarPage.hasHeading).to.equal(true);
    expect(CalendarPage.headingText).to.equal('Calendar');
  });
});
