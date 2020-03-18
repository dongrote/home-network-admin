import React from 'react';
import {Container, Header, Grid} from 'semantic-ui-react';
import WakeUpButton from './WakeUpButton';
import BlockableServiceButton from './BlockableServiceButton';
import BlockableDeviceButton from './BlockableDeviceButton';
import MFATokenInput from './MFATokenInput';

export default () => document.cookie.split(';').some(item => item.startsWith('jwt='))
  ? (
  <Container fluid>
    <Grid centered>
      <Grid.Row>
        <Header as='h1'>Siri Shorcuts</Header>
      </Grid.Row>
      <Grid.Row>
        <WakeUpButton mac='70:8b:cd:57:1b:af' hostname='Centricube' />
      </Grid.Row>
      <Grid.Row>
        <BlockableDeviceButton icon='laptop' device='damari-chromebook' canonicalDevice="Damari's Chromebook" />
      </Grid.Row>
      <Grid.Row>
        <BlockableServiceButton icon='youtube' canonicalService='YouTube' service='youtube' />
      </Grid.Row>
      <Grid.Row>
        <BlockableServiceButton icon='twitch' canonicalService='Twitch' service='twitch' />
      </Grid.Row>
    </Grid>
  </Container>
  )
  : (
    <Container>
      <Grid centered>
        <Grid.Row>
          <MFATokenInput onSubmit={() => window.location.reload()}/>
        </Grid.Row>
      </Grid>
    </Container>
  );
