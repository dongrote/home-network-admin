import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
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
    {props.devices.length === 0 && (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header>No Devices</Header>
            Populate <tt>/var/run/home-network-admin/wol-devices.yaml</tt>.
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )}
  </LabeledButtonGroup>
);
