import { expect } from 'chai';
import { it } from '@bigtest/mocha';
import { describeApp } from '../helpers/setup-app';

import IndexPage from '../interactors/index-page';

describeApp('Index Route', () => {
  it('has a heading', () => {
    expect(IndexPage.hasHeading).to.equal(true);
    expect(IndexPage.headingText).to.equal('Requests');
  });
});
