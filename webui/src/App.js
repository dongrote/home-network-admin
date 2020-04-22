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
    admin: false,
    devices: [],
    services: [],
    wol: [],
    verifying: false,
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
      if (c.startsWith('jwt=')) {
        this.token = jwt.decode(c.slice(4));
        console.log(this.token);
      }
    });
  }

  updateAdmin() {
    this.decodeJwtCookie();
    this.setState({admin: this.token && this.token.role === 'admin'});
  }

  async updateState() {
    this.updateAdmin();
    await [this.fetchDevices(), this.fetchServices(), this.fetchWakeOnLan()];
  }

  componentDidMount() {
    socket
      .on('ping', () => this.updateAdmin())
      .on('devices', devices => this.setState({devices}))
      .on('services', services => this.setState({services}))
      .on('wol', wol => this.setState({wol}));
    this.updateState();
  }

  onUnauthorized() {
    this.setState({verifying: true});
  }

  render() {
    return this.state.verifying
      ? (
        <Container text>
          <Grid centered verticalAlign='middle'>
            <Grid.Row>
              <MFATokenInput onSubmit={() => window.location.reload()}/>
            </Grid.Row>
          </Grid>
        </Container>
      )
      : (
        <Container text>
          <Segment.Group>
            <WakeOnLanDevices
              adminUser={this.state.admin}
              devices={this.state.wol}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <BlockableDevices
              adminUser={this.state.admin}
              devices={this.state.devices}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <BlockableServices
              adminUser={this.state.admin}
              services={this.state.services}
              onUnauthorized={() => this.onUnauthorized()}
            />
          </Segment.Group>
        </Container>
        );
  }
}

export default App;
