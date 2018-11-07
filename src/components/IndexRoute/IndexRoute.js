import React, { Component } from 'react';
import { Typography } from '@material-ui/core';

const API = 'https://api.frontside.io/v1/requests';

class IndexRoute extends Component {
  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  componentDidMount() {
    fetch(API)
      .then(response => response.json())
      .then(data => this.setState({ requests: data.requests }));
  }

  render() {
    const { requests } = this.state;
    return (
      <div id="index-route">
        <Typography variant="h6" color="inherit" noWrap>
          Requests
        </Typography>
        <br />
        <Typography variant="subtitle2" color="secondary" noWrap>
          {`requests.length = ${requests.length}`}  
        </Typography>
      </div>
    );
  }
};

export default IndexRoute;