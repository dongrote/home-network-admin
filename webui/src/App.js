import React, {Component} from 'react';
import io from 'socket.io-client';
import {Container, Grid, Segment, Button, Image} from 'semantic-ui-react';
import BlockableDevices from './BlockableDevices';
import WakeOnLanDevices from './WakeOnLanDevices';
import MFATokenInput from './MFATokenInput';
import BlockableServices from './BlockableServices';
import jwt from 'jsonwebtoken';

const socket = io();

class App extends Component {
  state = {
    admin: false,
    devices: [],
    services: [],
    wol: [],
    verifying: false,
    role: 'guest',
  };

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

  updateRole() {
    var signedTokenCookie = document.cookie.split(';').find(s => s.startsWith('jwt='));
    var role = 'guest';
    if (signedTokenCookie) {
      var signedToken = signedTokenCookie.slice(4);
      role = jwt.decode(signedToken).role;
    }
    this.setState({role});
  }

  async updateState() {
    this.updateRole();
    await [this.fetchDevices(), this.fetchServices(), this.fetchWakeOnLan()];
  }

  componentDidMount() {
    socket
      .on('ping', () => this.updateRole())
      .on('connect', () => this.updateState())
      .on('devices', devices => this.setState({devices}))
      .on('services', services => this.setState({services}))
      .on('wol', wol => this.setState({wol}));
    this.updateState();
  }

  onUnauthorized() {
    this.updateRole();
    this.setState({verifying: true});
  }

  render() {
    return this.state.verifying
      ? (
        <Container text>
          <Grid centered verticalAlign='middle'>
            <Grid.Row>
              <MFATokenInput
                onCancel={() => this.setState({verifying: false})}
                onSubmit={() => window.location.reload()}
              />
            </Grid.Row>
          </Grid>
        </Container>
      )
      : (
        <Container text>
          <Segment.Group>
            <Segment textAlign='center'>
              {this.state.role === 'admin'
                ? <Button fluid positive content='Authenticated' icon='lock' labelPosition='left' />
                : <Button fluid negative content='Authenticate' icon='unlock' labelPosition='left' onClick={() => this.setState({verifying: true})} />}
            </Segment>
            <WakeOnLanDevices
              role={this.state.role}
              devices={this.state.wol}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <BlockableDevices
              role={this.state.role}
              devices={this.state.devices}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <BlockableServices
              role={this.state.role}
              services={this.state.services}
              onUnauthorized={() => this.onUnauthorized()}
            />
            {this.state.role === 'admin'
              ? <Image bordered centered src='/api/auth/qrcode' />
              : null}
          </Segment.Group>
        </Container>
        );
  }
}

export default App;
