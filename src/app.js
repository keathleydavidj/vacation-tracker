import React from 'react';
import { Router } from '@reach/router';

import CalendarRoute from './components/CalendarRoute';
import DetailRoute from './components/DetailRoute';
import IndexRoute from './components/IndexRoute';
import Root from './components/Root';

const App = () => (
  <Root>
    <Router>
      <IndexRoute path="/" />
      <CalendarRoute path="/calendar" />
      <DetailRoute path="/requests/:requestId" />
    </Router>
  </Root>
);

export default App;