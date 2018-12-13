import React, { Component } from 'react';

import RequestList from '../RequestList';

const API = 'https://api.frontside.io/v1/requests';

class IndexRoute extends Component {
  _isMounted = false;

  constructor(props) {
    super(props);

    this.state = {
      requests: []
    };
  }

  componentDidMount() {
    this._isMounted = true;

    fetch(API)
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState({ requests: data.requests });
        }  
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  render() {
    let { requests } = this.state;
    return (
      <div data-test-index-route>
        <h6 data-test-index-header>
          Requests
        </h6>
        <br />
        <RequestList requests={requests} />
      </div>
    );
  }
}

export default IndexRoute;