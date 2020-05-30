import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

const colors = {
  online: 'green',
  offline: 'red',
  checking: 'black',
};

const icon = {
  online: 'power',
  offline: 'power',
  checking: 'spinner',
};

export default props => (
  <Button basic fluid onClick={() => props.onClick ? props.onClick() : null}>
    <Icon name={icon[props.onlineStatus]} loading={props.onlineStatus === 'checking'} color={colors[props.onlineStatus]} />
    {props.canonicalName}
  </Button>
);
