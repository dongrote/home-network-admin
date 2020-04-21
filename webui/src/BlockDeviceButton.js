import React from 'react';
import AsyncButton from './AsyncButton';

export default props => (
  <AsyncButton
    negative
    onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: 'POST'})
      .then(res => res.status === 401 ? props.onUnauthorized() : null)}
  >
    Block
  </AsyncButton>
);
