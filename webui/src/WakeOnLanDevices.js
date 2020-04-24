import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import WakeOnLanDeviceRow from './WakeOnLanDeviceRow';
import AddWakeupDeviceForm from './AddWakeupDeviceForm';

export default props => (
  <LabeledButtonGroup color='yellow' label='Power'>
    {props.devices.map((dev, i) => <WakeOnLanDeviceRow
      key={i}
      hwaddress={dev.hwaddress}
      device={dev.hostname}
      canonicalDevice={dev.name}
      onUnauthorized={props.onUnauthorized}
    />)}
    <AddWakeupDeviceForm />
  </LabeledButtonGroup>
);
