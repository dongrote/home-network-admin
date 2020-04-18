import React from 'react';
import AsyncButton from './AsyncButton';
import {Icon} from 'semantic-ui-react';

export default props => (
  <AsyncButton
    icon
    negative
    size='huge'
    onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: 'POST'})}
  >
    <Icon name={props.icon} />
    Block {props.canonicalDevice}
  </AsyncButton>
);
