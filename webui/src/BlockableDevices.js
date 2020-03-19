import React, { Component } from 'react';
import { Segment, Header } from 'semantic-ui-react';
import BlockableDeviceButton from './BlockableDeviceButton';

class BlockableDevices extends Component {
  state = {devices: []};

  async updateAvailableDevices() {
    var res = await fetch('/api/iptables/available');
    var data = await res.json();
    this.setState({devices: data.devices});
  }

  async componentDidMount() {
    await this.updateAvailableDevices();
  }

  render() {
    return (
      <div>
        <Segment vertical>
          <Header as='h2' textAlign='left'>Devices</Header>
        </Segment>
        {this.state.devices.map((dev, i) => (<Segment vertical textAlign='center'>
          <BlockableDeviceButton key={i} icon={dev.icon} device={dev.name} canonicalDevice={dev.canonicalName} />
        </Segment>))}
      </div>
    );
  }
}

export default BlockableDevices;
