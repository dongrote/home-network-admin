import React, {Component} from 'react';
import io from 'socket.io-client';
import {Container, Grid, Segment} from 'semantic-ui-react';
import WakeUpButton from './WakeUpButton';
import BlockableDevices from './BlockableDevices';
import MFATokenInput from './MFATokenInput';
import BlockableServices from './BlockableServices';
import LabeledButtonGroup from './LabeledButtonGroup';

const socket = io();

class App extends Component {
  state = {
    loggedIn: false,
    devices: [],
    services: [],
    wol: [],
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

  updateLoggedIn() {
    this.setState({loggedIn: document.cookie.split(';').some(item => item.startsWith('jwt='))});
  }

  async updateState() {
    await this.fetchDevices();
    await this.fetchServices();
    await this.fetchWakeOnLan();
    this.updateLoggedIn();
  }

  componentDidMount() {
    socket
      .on('ping', () => this.updateLoggedIn())
      .on('devices', devices => this.setState({devices}))
      .on('services', services => this.setState({services}));
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
            <BlockableDevices
              devices={this.state.devices}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <BlockableServices
              services={this.state.services}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <LabeledButtonGroup color='yellow' label='Power'>
              {this.state.wol.filter(d => !d.online).map((d, i) => <WakeUpButton
                key={i}
                mac={d.hwaddress}
                name={d.name}
                onUnauthorized={() => this.onUnauthorized()}
              />)}
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
