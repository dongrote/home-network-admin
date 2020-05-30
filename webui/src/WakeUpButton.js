import React from 'react';
import AsyncRadioButton from './AsyncRadioButton';

export default props => (
  <AsyncRadioButton
    icon
    fluid
    color='yellow'
    disabled={props.online}
    onClick={() => fetch(`/api/wol/?mac=${encodeURIComponent(props.mac)}`)
      .then(res => res.status === 401 ? props.onUnauthorized() : null)}
    checked={props.online}
    label={props.online ? 'On' : 'Off'}
  />
);
