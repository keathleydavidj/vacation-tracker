import React, { Component } from 'react';
import PropTypes from 'prop-types';

import EditForm from '../EditForm';

const initialState = {
  owner: '',
  startDate: undefined,
  endDate: undefined,
  status: 'Pending'
};

class CreateRoute extends Component {
  static propTypes = {
    navigate: PropTypes.func,
  };

  createRecord = (payload) => {
    fetch(`https://api.frontside.io/v1/requests`, {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then(res => res.json())
      .then(() => this.props.navigate('/'))
      .catch(error => console.error('Error: ', error)); // eslint-disable-line no-console
  }

  render() {
    return (
      <div data-test-create-route>
        <h6>
          Creating new vacation request
        </h6>
        <EditForm
          onSubmit={this.createRecord}
          initialState={initialState}
        />
      </div>
    );
  }
}

export default CreateRoute;