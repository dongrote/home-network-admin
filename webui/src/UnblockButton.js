import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

export default props => (
  <Button
    icon
    positive
    size='huge'
    onClick={() => fetch(`/api/pihole/${props.service}/unblock`, {method: 'PATCH'})
      .then(() => props.onClick())}
  >
    <Icon name={props.icon} />
    Unblock {props.canonicalService}
  </Button>
);
