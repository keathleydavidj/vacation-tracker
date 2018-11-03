import React, { Fragment } from 'react';
import { Link, Router } from '@reach/router';
import {
  AppBar,
  Button,
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
  Toolbar,
  Typography,
} from '@material-ui/core';

const theme = createMuiTheme({
  palette: {
    primary: {
      light: '#757ce8',
      main: '#3f50b5',
      dark: '#002884',
      contrastText: '#fff',
    },
    secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    },
  },
});

const App = () => {
  return ( 
    <MuiThemeProvider theme={theme}>
      <CssBaseline />
      <AppBar position="static" color="primary">
        <Toolbar>
          <Button component={Link} to="/">
            Requests
          </Button>
          <Button component={Link} to="/calendar">
            Calendar
          </Button>
        </Toolbar>
      </AppBar>
      <main>
        <Router>
          <IndexRoute path="/" />
          <CalendarRoute path="/calendar" />
          <DetailRoute path="/requests/:requestId" />
        </Router>
      </main>
    </MuiThemeProvider>
  )
};

const IndexRoute = () => (
  <Fragment>
    <Typography variant="h6" color="inherit" noWrap>
      Requests
    </Typography>
  </Fragment>
);

const DetailRoute = ({ requestId }) => (
  <Fragment>
    <Typography variant="h6" color="inherit" noWrap>
      Editing Request ID: {`${requestId}`}
    </Typography>
  </Fragment>
);

const CalendarRoute = () => (
  <Fragment>
    <Typography variant="h6" color="inherit" noWrap>
      Calendar
    </Typography>
  </Fragment>
);

export default App;