import React from 'react';
import AsyncButton from './AsyncButton';
import {Icon} from 'semantic-ui-react';

export default props => (
  <AsyncButton
    icon
    negative
    size='huge'
    onClick={() => fetch(`/api/services/block?service=${encodeURIComponent(props.service)}`)
      .then(() => props.onClick())}
  >
    <Icon name={props.icon} />
    Block {props.canonicalService}
  </AsyncButton>
);
