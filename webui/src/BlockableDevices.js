import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableDeviceRow from './BlockableDeviceRow';
import { Grid, Header } from 'semantic-ui-react';

export default props => (
  <LabeledButtonGroup color='purple' label='Devices'>
    {props.devices.map((dev, i) => <BlockableDeviceRow
      key={i}
      icon={dev.icon}
      device={dev.name}
      canonicalDevice={dev.canonicalName}
      blocked={dev.blocked}
      onUnauthorized={props.onUnauthorized}
    />)}
    {props.devices.length === 0 && (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header>No Devices</Header>
            Populate <tt>/var/run/home-network-admin/network-devices.yaml</tt>.
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )}
  </LabeledButtonGroup>
);
