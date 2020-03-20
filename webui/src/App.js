import React from 'react';
import {Container, Grid, Segment} from 'semantic-ui-react';
import WakeUpButton from './WakeUpButton';
import BlockableDevices from './BlockableDevices';
import MFATokenInput from './MFATokenInput';
import BlockableServices from './BlockableServices';
import LabeledButtonGroup from './LabeledButtonGroup';

export default () => document.cookie.split(';').some(item => item.startsWith('jwt='))
  ? (
  <Container text>
    <Segment.Group>
      <BlockableDevices onUnauthorized={() => window.location.reload()} />
      <BlockableServices
        services={[
          {icon: 'youtube', canonicalService: 'YouTube', service: 'youtube'},
          {icon: 'twitch', canonicalService: 'Twitch', service: 'twitch'}
        ]}
        onUnauthorized={() => window.location.reload()}/>
      <LabeledButtonGroup color='yellow' label='Power'>
        <WakeUpButton mac='70:8b:cd:57:1b:af' hostname='Centricube' />
      </LabeledButtonGroup>
    </Segment.Group>
  </Container>
  )
  : (
    <Container text>
      <Grid centered verticalAlign='middle'>
        <Grid.Row>
          <MFATokenInput onSubmit={() => window.location.reload()}/>
        </Grid.Row>
      </Grid>
    </Container>
  );
