import React, {Component} from 'react';
import BlockDeviceButton from './BlockDeviceButton';
import UnblockDeviceButton from './UnblockDeviceButton';

class BlockableDeviceButton extends Component {
  state = {blocked: false};

  async updateBlocked() {
    let res = await fetch(`/api/iptables/blocked/${this.props.device}`);
    if (res.status === 401) {
      return this.props.onUnauthorized();
    }
    let json = await res.json();
    this.setState({blocked: json.blocked});
    setTimeout(() => this.updateBlocked(), 30000);
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
