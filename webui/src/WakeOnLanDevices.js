import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import WakeOnLanDeviceRow from './WakeOnLanDeviceRow';

export default props => (
  <LabeledButtonGroup color='yellow' label='Power'>
    {props.devices.map((dev, i) => <WakeOnLanDeviceRow
      key={i}
      adminUser={props.adminUser}
      hwaddress={dev.hwaddress}
      device={dev.hostname}
      canonicalDevice={dev.name}
      onUnauthorized={props.onUnauthorized}
    />)}
  </LabeledButtonGroup>
);
