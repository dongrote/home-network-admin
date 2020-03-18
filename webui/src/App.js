import React from 'react';
import {Container, Header, Grid, Segment} from 'semantic-ui-react';
import WakeUpButton from './WakeUpButton';
import BlockableServiceButton from './BlockableServiceButton';
import BlockableDevices from './BlockableDevices';
import MFATokenInput from './MFATokenInput';

export default () => document.cookie.split(';').some(item => item.startsWith('jwt='))
  ? (
  <Container>
    <Segment.Group>
      <Segment color='yellow'>
        <Header as='h2' textAlign='left'>Power</Header>
        <Segment vertical textAlign='center'>
          <WakeUpButton mac='70:8b:cd:57:1b:af' hostname='Centricube' />
        </Segment>
      </Segment>
      <Segment color='purple'>
        <BlockableDevices />
      </Segment>
      <Segment color='olive'>
        <Header as='h2' textAlign='left'>Services</Header>
        <Segment vertical textAlign='center'>
          <BlockableServiceButton icon='youtube' canonicalService='YouTube' service='youtube' />
        </Segment>
        <Segment vertical textAlign='center'>
          <BlockableServiceButton icon='twitch' canonicalService='Twitch' service='twitch' />
        </Segment>
      </Segment>
    </Segment.Group>
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
