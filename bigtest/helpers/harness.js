import React, { Component } from 'react';
import { 
  createHistory,
  createMemorySource,
  LocationProvider
} from '@reach/router';

import App from '../../src/app';

export default class TestHarness extends Component {
  constructor() {
    let source = createMemorySource('/');
    let history = createHistory(source);

    super();

    this.history = history;
  }

  visit(path) {
    this.history.push(path);
  }

  render() {
    return (
      <LocationProvider history={this.history}>
        <App />
      </LocationProvider>
    );
  }
}
