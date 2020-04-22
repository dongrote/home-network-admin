import React from 'react';
import BlockDeviceButton from './BlockDeviceButton';
import UnblockDeviceButton from './UnblockDeviceButton';

export default props => props.blocked
  ? <UnblockDeviceButton
      adminUser={props.adminUser}
      device={props.device}
      onUnauthorized={props.onUnauthorized}
    />
  : <BlockDeviceButton
      adminUser={props.adminUser}
      device={props.device}
      onUnauthorized={props.onUnauthorized}
    />;
