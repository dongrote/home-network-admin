import React from 'react';
import BlockDeviceButton from './BlockDeviceButton';
import UnblockDeviceButton from './UnblockDeviceButton';

export default props => props.blocked
  ? <UnblockDeviceButton
      icon={props.icon}
      device={props.device}
      canonicalDevice={props.canonicalDevice}
    />
  : <BlockDeviceButton
      icon={props.icon}
      device={props.device}
      canonicalDevice={props.canonicalDevice}
    />;
