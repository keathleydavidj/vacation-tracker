import { expect } from 'chai';
import { beforeEach, it } from '@bigtest/mocha';
import { describeApp } from '../helpers/setup-app';

import DetailPage from '../interactors/detail-page';

describeApp('Detail Route', () => {
  beforeEach(function() {
    let request = this.server.create('request');
    this.visit(`/requests/${request.id}`);
  });

  it('has a heading', () => {
    expect(DetailPage.hasHeading).to.equal(true);
    expect(DetailPage.headingText).to.contain('Editing Request');
  });
});
