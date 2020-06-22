import React, {Component} from 'react';
import io from 'socket.io-client';
import {Container, Grid, Segment, Button} from 'semantic-ui-react';
import BlockableDevices from './BlockableDevices';
import WakeOnLanDevices from './WakeOnLanDevices';
import MFATokenInput from './MFATokenInput';
import BlockableServices from './BlockableServices';
import ThrottledDevices from './ThrottledDevices';
import AdBlockButton from './AdBlockButton';
import SystemInformation from './SystemInformation';
import QRCode from './QRCode';
import jwt from 'jsonwebtoken';

const socket = io();
const displayServices = false;
const disableAdBlockWorks = false;

class App extends Component {
  state = {
    admin: false,
    devices: [],
    services: [],
    wol: [],
    verifying: false,
    role: 'guest',
    adblockEnabled: true,
    adblockDisabledUntil: null,
    systemTempCelsius: null,
    systemTempFahrenheit: null,
    systemTempHistory: [],
    systemLoad: null,
    systemLoadHistory: [],
    throttleBandwidth: '28kbps',
    throttledHosts: [],
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

  async fetchAdblock() {
    var res = await fetch('/api/pihole/enabled');
    var json = await res.json();
    this.setState({adblockEnabled: json.enabled});
  }

  async fetchSystem() {
    var res = await fetch('/api/system/state');
    var json = await res.json();
    const systemTempCelsius = json.state.temp.celsius;
    const systemTempFahrenheit = json.state.temp.fahrenheit;
    const systemLoad = json.state.loadavg[0];
    res = await fetch('/api/system/history?name=load');
    json = await res.json();
    const systemLoadHistory = json;
    res = await fetch('/api/system/history?name=temp');
    json = await res.json();
    const systemTempHistory = json;
    this.setState({
      systemTempCelsius,
      systemTempFahrenheit,
      systemTempHistory,
      systemLoad,
      systemLoadHistory,
    });
  }

  async fetchThrottle() {
    var res = await fetch('/api/throttle');
    var json = await res.json();
    this.setState({
      throttleBandwidth: json.bandwidth,
      throttledHosts: json.hosts,
    });
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
    await [
      this.fetchDevices(),
      displayServices ? this.fetchServices() : Promise.resolve(),
      this.fetchWakeOnLan(),
      disableAdBlockWorks ? this.fetchAdblock() : Promise.resolve(),
    ];
  }

  componentDidMount() {
    socket
      .on('ping', () => this.updateRole())
      .on('temp', msg => this.setState({
        systemTempCelsius: msg.temp.celsius,
        systemTempFahrenheit: msg.temp.fahrenheit,
        systemTempHistory: msg.history,
      }))
      .on('load', msg => this.setState({
        systemLoad: msg.load,
        systemLoadHistory: msg.history,
      }))
      .on('connect', () => this.updateState())
      .on('devices', devices => this.setState({devices}))
      .on('services', services => this.setState({services}))
      .on('wol', wol => this.setState({wol}))
      .on('throttle', throttle => this.setState({
        throttleBandwidth: throttle.bandwidth,
        throttledHosts: throttle.hosts,
      }))
      .on('adblock', adblock => this.setState({
        adblockEnabled: adblock.enabled,
        adblockDisabledUntil: adblock.until ? new Date(adblock.until) : null,
      }));
    this.updateState();
    this.fetchSystem();
    this.fetchThrottle();
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
            {disableAdBlockWorks &&
              <Segment textAlign='center'>
                <AdBlockButton
                  fluid
                  disabled={!this.state.adblockEnabled}
                  enableAt={this.state.adblockDisabledUntil}
                />
            </Segment>
            }
            <BlockableDevices
              role={this.state.role}
              devices={this.state.devices}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <WakeOnLanDevices
              role={this.state.role}
              devices={this.state.wol}
              onUnauthorized={() => this.onUnauthorized()}
            />
            <ThrottledDevices
              bandwidth={this.state.throttleBandwidth}
              hosts={this.state.throttledHosts}
              onUnauthorized={() => this.onUnauthorized()}
            />
            {displayServices &&
              <BlockableServices
                role={this.state.role}
                services={this.state.services}
                onUnauthorized={() => this.onUnauthorized()}
              />}
            {this.state.role === 'admin' && <QRCode src='/api/auth/qrcode' />}
            <SystemInformation
              fahrenheit={this.state.systemTempFahrenheit}
              celsius={this.state.systemTempCelsius}
              load={this.state.systemLoad}
              tempHistory={this.state.systemTempHistory}
              loadHistory={this.state.systemLoadHistory}
            />
          </Segment.Group>
        </Container>
        );
  }
}

export default App;
