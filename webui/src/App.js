import React, {Component} from 'react';
import io from 'socket.io-client';
import {Container, Grid, Segment} from 'semantic-ui-react';
import WakeUpButton from './WakeUpButton';
import BlockableDevices from './BlockableDevices';
import MFATokenInput from './MFATokenInput';
import BlockableServices from './BlockableServices';
import LabeledButtonGroup from './LabeledButtonGroup';

const socket = io();

socket
  .on('connect', () => console.log('socket.io connected'))
  .on('devices', devicesState => );

class App extends Component {
  state = {
    loggedIn: false,
    devices: [],
    services: [],
    wol: [],
  };

  async fetchDevices() {
    var res = await fetch('/api/devices');
    var json = await res.json();
    this.setState({devices: json.devices});
  }

  async fetchServices() {
    var res = await fetch('/api/services');
    var json = await res.json();
    this.setState({services: json.services});
  }

  componentDidMount() {
    this.setState({loggedIn: document.cookie.split(';').some(item => item.startsWith('jwt='))});
    socket
      .on('devices', devices => this.setState({devices}))
      .on('services', services => this.setState({services}));
  }

  render() {
    return this.state.loggedIn
      ? (
        <Container text>
          <Segment.Group>
            <BlockableDevices
              devices={this.state.devices}
              onUnauthorized={() => window.location.reload()}
            />
            <BlockableServices
              services={this.state.services}
              onUnauthorized={() => window.location.reload()}/>
            <LabeledButtonGroup color='yellow' label='Power'>
              <WakeUpButton mac='70:8b:cd:57:1b:af' hostname='Centricube' />
            </LabeledButtonGroup>
          </Segment.Group>
        </Container>
        )
      :(
        <Container text>
          <Grid centered verticalAlign='middle'>
            <Grid.Row>
              <MFATokenInput onSubmit={() => window.location.reload()}/>
            </Grid.Row>
          </Grid>
        </Container>
      );
  }
}

export default App;
