import React from 'react';
import PropTypes from 'prop-types';

import RequestListItem from '../RequestListItem';

const RequestList = ({ removeRequestById, requests }) => {
  return (
    <div className="requestList" data-test-request-list>
      {requests.map(req => (
        <RequestListItem
          request={req}
          removeRequestById={removeRequestById}
          key={req.id}
        />
      ))}
    </div>
  );
};

RequestList.propTypes = {
  removeRequestById: PropTypes.func,
  requests: PropTypes.arrayOf(PropTypes.object)
};

export default RequestList;