import React from 'react';
import AsyncRadioButton from './AsyncRadioButton';

export default props => <AsyncRadioButton
  onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: props.blocked ? 'DELETE' : 'POST'})
    .then(res => res.status === 401 ? props.onUnauthorized() : null)}
  checked={!props.blocked}
  label={props.blocked ? 'Off' : 'On'}
/>;
