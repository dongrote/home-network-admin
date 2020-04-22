import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableDeviceRow from './BlockableDeviceRow';

export default props => (
  <LabeledButtonGroup color='purple' label='Devices'>
    {props.devices.map((dev, i) => <BlockableDeviceRow
      key={i}
      adminUser={props.adminUser}
      icon={dev.icon}
      device={dev.name}
      canonicalDevice={dev.canonicalName}
      blocked={dev.blocked}
      onUnauthorized={props.onUnauthorized}
    />)}
  </LabeledButtonGroup>
);
