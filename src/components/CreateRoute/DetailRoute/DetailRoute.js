import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../EditForm';

class DetailRoute extends Component {
  static propTypes = {
    navigate: PropTypes.func,
    requestId: PropTypes.string
  }; 
  
  _isMounted = false;

  state = {
    key: 0,
    request: {
      owner: '',
      startDate: undefined,
      endDate: undefined,
      status: ''
    }
  };

  componentDidMount() {
    this._isMounted = true;
    fetch(`https://api.frontside.io/v1/requests/${this.props.requestId}`)
      .then(response => response.json())
      .then(data => {
        if (this._isMounted) {
          this.setState(state => ({ request: data.request, key: state.key + 1 }));
        }
      });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  updateRecord = (payload) => {
    fetch(`https://api.frontside.io/v1/requests/${this.props.requestId}`, {
      method: 'PUT',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => {
        this.props.navigate('/');
      })
      .catch(error => console.error('Error: ', error)); // eslint-disable-line no-console
  }

  render() {
    let { requestId } = this.props;
    let { request, key } = this.state;
    return (
      <div data-test-detail-route>
        <h6>
          Editing Request ID: {`${requestId}`}
        </h6>
        <EditForm
          key={key}
          onSubmit={this.updateRecord}
          initialState={request}
        />
      </div>
    );
  }
}

export default DetailRoute;