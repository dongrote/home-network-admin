import React, {Component} from 'react';
import BlockServiceButton from './BlockServiceButton';
import UnblockServiceButton from './UnblockServiceButton';

class BlockableServiceButton extends Component {
  state = {blocked: false};

  async updateBlocked() {
    let res = await fetch(`/api/pihole/${this.props.service}/status`);
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
      ? <UnblockServiceButton
          icon={this.props.icon}
          service={this.props.service}
          canonicalService={this.props.canonicalService}
          onClick={() => this.clicked()}
        />
      : <BlockServiceButton
          icon={this.props.icon}
          service={this.props.service}
          canonicalService={this.props.canonicalService}
          onClick={() => this.clicked()}
        />;
  }
}

export default BlockableServiceButton;
