import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

export default props => (
  <Button
    icon
    negative
    size='huge'
    onClick={() => fetch(`/api/services/block?service=${encodeURIComponent(props.service)}`)
      .then(() => props.onClick())}
  >
    <Icon name={props.icon} />
    Block {props.canonicalService}
  </Button>
);
