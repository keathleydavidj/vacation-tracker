import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from '@reach/router';

export default class RequestListItem extends Component {
  static propTypes = {
    request: PropTypes.object
  };

  constructor(props) {
    super(props);

    this.deleteRequest = this.deleteRequest.bind(this);
  }

  deleteRequest() {
    let { id } = this.props.request;
    fetch(`https://api.frontside.io/v1/requests/${id}`, {
      method: 'DELETE'
    })
      .then(res => res.json())
      .then(response => console.log('Success: ', JSON.stringify(response))) // eslint-disable-line no-console
      .catch(response => console.log('Error: ', JSON.stringify(response))); // eslint-disable-line no-console
  }

  render() {
    let { request } = this.props;
    return (
      <div className="level is-mobile" data-test-request-list-item>
        <div className="level-item has-text-centered">
          <div>
            <p className="heading is-6">Requestee</p>
            <p className="title is-5" data-test-owner-name>{request.owner}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div data-test-start-date>
            <p className="heading is-6" data-test-label>Start date</p>
            <p className="title is-5" data-test-value>{moment(request.startDate).format('MM-DD-YYYY')}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div data-test-end-date>
            <p className="heading is-6" data-test-label>End date</p>
            <p className="title is-5" data-test-value>{moment(request.endDate).format('MM-DD-YYYY')}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <div data-test-status>
            <p className="heading is-6" data-test-label>Status</p>
            <p className="title is-5" data-test-value>{request.status}</p>
          </div>
        </div>
        <div className="level-item has-text-centered">
          <Link to={`/requests/${request.id}`} data-test-edit-icon>
            <span className="icon" >
              <i className="fas fa-edit"></i>
            </span>
          </Link>
        </div>
        <div className="level-item has-text-centered">
          <a onClick={this.deleteRequest} data-test-delete-icon>
            <span className="icon" >
              <i className="fas fa-trash"></i>
            </span>
          </a>
        </div>
      </div>
    );
  }
}