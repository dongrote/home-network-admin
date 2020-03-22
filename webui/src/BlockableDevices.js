import React, { Component } from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableDeviceButton from './BlockableDeviceButton';

class BlockableDevices extends Component {
  state = {devices: [], loading: true};

  async updateAvailableDevices() {
    var res = await fetch('/api/iptables/available');
    if (res.status === 401) {
      return this.props.onUnauthorized();
    }
    var data = await res.json();
    this.setState({devices: data.devices, loading: false});
    setTimeout(() => this.updateAvailableDevices(), 30000);
  }

  async componentDidMount() {
    await this.updateAvailableDevices();
  }

  render() {
    return (
      <LabeledButtonGroup color='purple' label='Devices' loading={this.state.loading}>
        {this.state.devices.map((dev, i) => <BlockableDeviceButton key={i} icon={dev.icon} device={dev.name} canonicalDevice={dev.canonicalName} onUnauthorized={() => this.props.onUnauthorized()} />)}
      </LabeledButtonGroup>
    );
  }
}

export default BlockableDevices;
