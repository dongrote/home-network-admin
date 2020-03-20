import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableDeviceButton from './BlockableDeviceButton';

class BlockableDevices extends Component {
  state = {devices: []};

  async updateAvailableDevices() {
    var res = await fetch('/api/iptables/available');
    if (res.status === 401) {
      return this.props.onUnauthorized();
    }
    var data = await res.json();
    this.setState({devices: data.devices});
    setTimeout(() => this.updateAvailableDevices(), 30000);
  }

  async componentDidMount() {
    await this.updateAvailableDevices();
  }

  render() {
    return (
      <LabeledButtonGroup color='purple' label='Devices'>
        {this.state.devices.map((dev, i) => <BlockableDeviceButton key={i} icon={dev.icon} device={dev.name} canonicalDevice={dev.canonicalName} onUnauthorized={() => this.props.onUnauthorized()} />)}
      </LabeledButtonGroup>
    );
  }
}

export default BlockableDevices;
