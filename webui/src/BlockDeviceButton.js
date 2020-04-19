import React from 'react';
import AsyncButton from './AsyncButton';
import {Icon} from 'semantic-ui-react';

export default props => (
  <AsyncButton
    icon
    negative
    size='huge'
    onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: 'POST'})
      .then(res => res.status === 401 ? props.onUnauthorized() : null)}
  >
    <Icon name={props.icon} />
    Block {props.canonicalDevice}
  </AsyncButton>
);
