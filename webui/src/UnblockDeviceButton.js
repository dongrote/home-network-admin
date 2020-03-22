import React from 'react';
import AsyncButton from './AsyncButton';
import {Icon} from 'semantic-ui-react';

export default props => (
  <AsyncButton
    icon
    positive
    size='huge'
    onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: 'DELETE'})
      .then(() => props.onClick())}
  >
    <Icon name={props.icon} />
    Unblock {props.canonicalDevice}
  </AsyncButton>
);
