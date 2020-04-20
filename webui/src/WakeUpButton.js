import React from 'react';
import AsyncButton from './AsyncButton';
import {Icon} from 'semantic-ui-react';

export default props => (
  <AsyncButton
    icon
    size='huge'
    color='yellow'
    disabled={props.online}
    onClick={() => fetch(`/api/wol/?mac=${encodeURIComponent(props.mac)}`)
      .then(res => res.status === 401 ? props.onUnauthorized() : null)}
  >
    <Icon name='sun' />
    Wake Up {props.name}
  </AsyncButton>
);
