import React from 'react';
import {Label, Icon} from 'semantic-ui-react';

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
  <Label>
    <Icon name='power' color={colors[props.onlineStatus]} />
    {props.canonicalName}
    <Label.Detail>{content[props.onlineStatus]}</Label.Detail>
  </Label>
);
