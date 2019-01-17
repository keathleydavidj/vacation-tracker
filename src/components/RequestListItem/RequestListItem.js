import React from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import { Link } from '@reach/router';

import { addOffset } from '../../utils';

const RequestListItem = ({ removeRequestById, request }) => {
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
          <p className="title is-5" data-test-value>{moment(addOffset(request.startDate)).format('MM-DD-YYYY')}</p>
        </div>
      </div>
      <div className="level-item has-text-centered">
        <div data-test-end-date>
          <p className="heading is-6" data-test-label>End date</p>
          <p className="title is-5" data-test-value>{moment(addOffset(request.endDate)).format('MM-DD-YYYY')}</p>
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
        <button className="button is-danger" onClick={() => removeRequestById(request.id)} data-test-delete-icon>
          <span className="icon" >
            <i className="fas fa-trash"></i>
          </span>
        </button>
      </div>
    </div>
  );
};

RequestListItem.propTypes = {
  removeRequestById: PropTypes.func,
  request: PropTypes.object
};

export default RequestListItem;