import React from 'react';
import {Container, Header, Grid} from 'semantic-ui-react';
import WakeUpButton from './WakeUpButton';
import BlockableServiceButton from './BlockableServiceButton';

export default () => (
  <Container fluid>
    <Grid centered>
      <Grid.Row>
        <Header as='h1'>Siri Shorcuts</Header>
      </Grid.Row>
      <Grid.Row>
        <WakeUpButton mac='70:8b:cd:57:1b:af' hostname='Centricube' />
      </Grid.Row>
      <Grid.Row>
        <BlockableServiceButton icon='youtube' canonicalService='YouTube' service='youtube' />
      </Grid.Row>
      <Grid.Row>
        <BlockableServiceButton icon='twitch' canonicalService='Twitch' service='twitch' />
      </Grid.Row>
    </Grid>
  </Container>
);
