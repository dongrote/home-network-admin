import React from 'react';
import BlockDeviceButton from './BlockDeviceButton';
import UnblockDeviceButton from './UnblockDeviceButton';

export default props => props.blocked
  ? <UnblockDeviceButton
      device={props.device}
      onUnauthorized={props.onUnauthorized}
    />
  : <BlockDeviceButton
      device={props.device}
      onUnauthorized={props.onUnauthorized}
    />;
