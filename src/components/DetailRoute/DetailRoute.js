import React, { Fragment } from 'react';
import { Typography, TextField } from '@material-ui/core';

const DetailRoute = ({ requestId }) => (
  <Fragment>
    <Typography variant="h6" color="inherit" noWrap>
      Editing Request ID: {`${requestId}`}
    </Typography>
    <form>
      <TextField
        id="owner-name"
        label="Requestee"
        margin="normal"
      />
      <TextField
        id="start-date"
        label="Start Date"
        margin="normal"
      />
      <TextField
        id="end-date"
        label="End Date"
        margin="normal"
      />
      <TextField
        id="status"
        label="Status"
        margin="normal"
      />
    </form>
  </Fragment>
);

export default DetailRoute;