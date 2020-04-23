import React, {Component} from 'react';
import io from 'socket.io-client';
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

  async updateState() {
    await [this.fetchDevices(), this.fetchServices(), this.fetchWakeOnLan()];
  }

  componentDidMount() {
    socket
      .on('connect', () => this.updateState())
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
        );
  }
}

export default App;
