import { setupAppForTesting } from '@bigtest/react';
import { beforeEach, describe } from '@bigtest/mocha';
import startMirage from '../network/start';

import TestHarness from './harness';

export function describeApp(name, setup, describeFn = describe) {
  describeFn(name, function() {
    beforeEach(async function() {
      this.app = await setupAppForTesting(TestHarness, {
        mountId: 'bigtesting-container',
        setup: () => {
          this.server = startMirage();
          this.server.logging = false;
        },
        teardown: () => {
          this.server.shutdown();
        }
      });

      document.getElementById('bigtesting-container').style.height = '100%';
      this.visit = this.app.history.navigate
    });

    let doSetup = typeof setup.suite === 'function' ? setup.suite : setup;
    doSetup.call(this);
  });
}

describeApp.skip = describe.skip;
describeApp.only = function(name, setup) {
  return describeApp(name, setup, describe.only);
};
