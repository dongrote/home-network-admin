import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

const colors = {
  online: 'green',
  offline: 'red',
  checking: 'black',
};

const content = {
  online: 'Online',
  offline: 'Offline',
  checking: 'Checking...',
};

export default props => (
  <Button fluid onClick={() => props.onClick ? props.onClick() : null}>
    <Icon name='power' color={colors[props.onlineStatus]} />
    {props.canonicalName} {content[props.onlineStatus]}
  </Button>
);
