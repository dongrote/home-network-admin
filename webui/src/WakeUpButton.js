import React from 'react';
import AsyncButton from './AsyncButton';
import {Icon} from 'semantic-ui-react';

export default props => (
  <AsyncButton icon size='huge' color='yellow' onClick={() => fetch(`/api/wol/?mac=${encodeURIComponent(props.mac)}`)}>
    <Icon name='sun' />
    Wake Up {props.hostname}
  </AsyncButton>
);
