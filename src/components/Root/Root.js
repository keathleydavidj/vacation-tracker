import React from 'react';
import { Link } from '@reach/router';
import {
  AppBar,
  Button,
  CssBaseline,
  createMuiTheme,
  MuiThemeProvider,
  Toolbar
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
  typography: {
    useNextVariants: true
  }
});

const Root = ({ children }) => (
  <MuiThemeProvider theme={theme}>
    <CssBaseline />
    <NavBar />

    <main>
      {children}
    </main>
  </MuiThemeProvider>
);

const NavBar = () => (
  <AppBar position="static" color="primary">
    <Toolbar>
      <Button component={Link} to="/">
        Requests
      </Button>
      <Button component={Link} to="/calendar">
        Calendar
      </Button>
      <hr />
    </Toolbar>
  </AppBar>
);


export default Root;