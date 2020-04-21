import React from 'react';
import AsyncButton from './AsyncButton';

export default props => (
  <AsyncButton
    positive
    onClick={() => fetch(`/api/services/unblock?service=${encodeURIComponent(props.service)}`)
      .then(res => res.status === 401 ? props.onUnauthorized() : null)}
  >
    Unblock
  </AsyncButton>
);
