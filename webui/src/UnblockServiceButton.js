import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

export default props => (
  <Button
    icon
    positive
    size='huge'
    onClick={() => fetch(`/api/services/unblock?service=${encodeURIComponent(props.service)}`)
      .then(() => props.onClick())}
  >
    <Icon name={props.icon} />
    Unblock {props.canonicalService}
  </Button>
);
