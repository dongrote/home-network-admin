import React from 'react';
import {Grid, Icon, Label} from 'semantic-ui-react';
import BlockableDeviceButton from './BlockableDeviceButton';
import OnlineLabel from './OnlineLabel';

export default props => (
  <Grid>
    <Grid.Row columns={2} verticalAlign='middle'>
      <Grid.Column>
        <OnlineLabel canonicalName={props.canonicalDevice} hostname={props.device} />
      </Grid.Column>
      <Grid.Column>
        <BlockableDeviceButton
          icon={props.icon}
          device={props.device}
          canonicalDevice={props.canonicalDevice}
          online={props.online}
          blocked={props.blocked}
          onUnauthorized={props.onUnauthorized}
          disabled={!props.online}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>
);
