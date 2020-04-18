import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableDeviceButton from './BlockableDeviceButton';

export default props => (
  <LabeledButtonGroup color='purple' label='Devices'>
    {props.devices.map((dev, i) => <BlockableDeviceButton
      key={i}
      icon={dev.icon}
      device={dev.name}
      canonicalDevice={dev.canonicalName}
      blocked={dev.blocked}
      onUnauthorized={props.onUnauthorized}
      onClick={props.onMutate}
    />)}
  </LabeledButtonGroup>
);
