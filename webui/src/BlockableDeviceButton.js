import React, {Component} from 'react';
import BlockDeviceButton from './BlockDeviceButton';
import UnblockDeviceButton from './UnblockDeviceButton';

class BlockableDeviceButton extends Component {
  state = {blocked: false};

  async updateBlocked() {
    console.log(`fetch(/api/iptables/blocked/${this.props.device})`);
    let res = await fetch(`/api/iptables/blocked/${this.props.device}`);
    let json = await res.json();
    this.setState({blocked: json.blocked});
  }

  async componentDidMount() {
    await this.updateBlocked()
  }

  async clicked() {
    await this.updateBlocked();
  }

  render() {
    return this.state.blocked
      ? <UnblockDeviceButton
          icon={this.props.icon}
          device={this.props.device}
          canonicalDevice={this.props.canonicalDevice}
          onClick={() => this.clicked()}
        />
      : <BlockDeviceButton
          icon={this.props.icon}
          device={this.props.device}
          canonicalDevice={this.props.canonicalDevice}
          onClick={() => this.clicked()}
        />;
  }
}

export default BlockableDeviceButton;
