import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

export default props => (
  <Button
    icon
    positive
    size='huge'
    onClick={() => fetch(`/api/iptables/block/${props.device}`, {method: 'DELETE'})
      .then(() => props.onClick())}
  >
    <Icon name={props.icon} />
    Unblock {props.canonicalDevice}
  </Button>
);
