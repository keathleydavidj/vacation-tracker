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

  removeRequestById = (id) => {
    let { requests } = this.state;

    fetch(`https://api.frontside.io/v1/requests/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(_ => { // eslint-disable-line no-unused-vars
        if (this._isMounted) {
          this.setState({ requests: requests.filter(req => req.id !== id) });
        }
      })
      .catch(response => console.log('Error: ', JSON.stringify(response))); // eslint-disable-line no-console
  }

  render() {
    let { requests } = this.state;
    return (
      <div data-test-index-route>
        <h6 data-test-index-header>
          Requests
        </h6>
        <br />
        <RequestList
          requests={requests}
          removeRequestById={this.removeRequestById}
        />
      </div>
    );
  }
}

export default IndexRoute;