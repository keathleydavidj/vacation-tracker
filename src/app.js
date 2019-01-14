import React from 'react';
import { Router } from '@reach/router';

import CalendarRoute from './components/CalendarRoute';
import CreateRoute from './components/CreateRoute';
import DetailRoute from './components/DetailRoute';
import IndexRoute from './components/IndexRoute';
import Root from './components/Root';
import 'bulma/css/bulma.css';

const App = () => (
  <Root>
    <Router>
      <IndexRoute path="/" />
      <CalendarRoute path="/calendar" />
      <CreateRoute path="/requests/new" />
      <DetailRoute path="/requests/:requestId" />
    </Router>
  </Root>
);

export default App;