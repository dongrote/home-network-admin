import React from 'react';
import {Button, Icon} from 'semantic-ui-react';

export default props => (
  <Button icon size='huge' color='yellow' onClick={() => fetch(`/api/wol/?mac=${encodeURIComponent(props.mac)}`)}>
    <Icon name='sun' />
    Wake Up {props.hostname}
  </Button>
);
