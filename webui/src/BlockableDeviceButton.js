import React from 'react';
import BlockDeviceButton from './BlockDeviceButton';
import UnblockDeviceButton from './UnblockDeviceButton';

export default props => props.blocked
  ? <UnblockDeviceButton
      icon={props.icon}
      device={props.device}
      canonicalDevice={props.canonicalDevice}
      onUnauthorized={props.onUnauthorized}
      online={props.online}
    />
  : <BlockDeviceButton
      icon={props.icon}
      device={props.device}
      canonicalDevice={props.canonicalDevice}
      onUnauthorized={props.onUnauthorized}
      online={props.online}
    />;
