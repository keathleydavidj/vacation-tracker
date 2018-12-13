import React from 'react';
import PropTypes from 'prop-types';

import RequestListItem from '../RequestListItem';

const RequestList = ({ requests }) => {
  return (
    <div className="requestList" data-test-request-list>
      {requests.map(req => (
        <RequestListItem
          request={req}
          key={req.id}
        />
      ))}
    </div>
  );
};

RequestList.propTypes = {
  requests: PropTypes.arrayOf(PropTypes.object)
};

export default RequestList;