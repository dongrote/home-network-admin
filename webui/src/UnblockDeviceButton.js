import React from 'react';
import AsyncButton from './AsyncButton';

export default props => (
  <AsyncButton
    icon
    positive
    disabled={!props.online}
    onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: 'DELETE'})
      .then(res => res.status === 401 ? props.onUnauthorized() : null)}
  >
    Unblock
  </AsyncButton>
);
