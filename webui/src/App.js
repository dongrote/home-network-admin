import React, {Component} from 'react';
import io from 'socket.io-client';
import jwt from 'jsonwebtoken';
import {Container, Grid, Segment} from 'semantic-ui-react';
import BlockableDevices from './BlockableDevices';
import WakeOnLanDevices from './WakeOnLanDevices';
import MFATokenInput from './MFATokenInput';
import BlockableServices from './BlockableServices';

const socket = io();

class App extends Component {
  state = {
    loggedIn: false,
    devices: [],
    services: [],
    wol: [],
  };
  token = null;

  async fetchDevices() {
    var res = await fetch('/api/devices/state');
    var json = await res.json();
    this.setState({devices: json.state});
  }

  async fetchServices() {
    var res = await fetch('/api/services/state');
    var json = await res.json();
    this.setState({services: json.state});
  }

  async fetchWakeOnLan() {
    var res = await fetch('/api/wol/state');
    var json = await res.json();
    this.setState({wol: json.state});
  }

  decodeJwtCookie() {
    document.cookie.split(';').forEach(c => {
      console.log(c);
      if (c.startsWith('jwt=')) {
        this.token = jwt.decode(c.slice(4));
      }
    });
  }

  updateLoggedIn() {
    this.decodeJwtCookie();
    console.log('jwt', this.token);
    this.setState({loggedIn: this.token && this.token.role === 'admin'});
  }

  async updateState() {
    this.updateLoggedIn();
    await [this.fetchDevices(), this.fetchServices(), this.fetchWakeOnLan()];
  }

  componentDidMount() {
    socket
      .on('ping', () => this.updateLoggedIn())
      .on('devices', devices => this.setState({devices}))
      .on('services', services => this.setState({services}))
      .on('wol', wol => this.setState({wol}));
    this.updateState();
  }

  onUnauthorized() {
    window.location.reload();
  }

  render() {
    return this.state.loggedIn
      ? (
        <Container text>
          <Segment.Group>
            <WakeOnLanDevices
              devices={this.state.wol}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <BlockableDevices
              devices={this.state.devices}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <BlockableServices
              services={this.state.services}
              onUnauthorized={() => this.onUnauthorized()}
            />
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
