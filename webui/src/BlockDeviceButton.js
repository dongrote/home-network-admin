import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

export default props => (
  <Button
    icon
    negative
    size='huge'
    onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: 'POST'})
      .then(() => props.onClick())}
  >
    <Icon name={props.icon} />
    Block {props.canonicalDevice}
  </Button>
);
