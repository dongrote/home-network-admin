import React from 'react';
import AsyncRadioButton from './AsyncRadioButton';

export default props => <AsyncRadioButton
  onClick={() => fetch(`/api/services/${props.blocked ? 'un' : ''}block?service=${encodeURIComponent(props.service)}`)
    .then(res => res.status === 401 ? props.onUnauthorized() : null)}
  checked={!props.blocked}
  label={props.blocked ? 'Off' : 'On'}
/>;
