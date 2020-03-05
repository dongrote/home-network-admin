import React, {Component} from 'react';
import BlockButton from './BlockButton';
import UnblockButton from './UnblockButton';

class BlockableServiceButton extends Component {
  state = {blocked: false};

  async updateBlocked() {
    let res = await fetch(`/api/pihole/${this.props.service}/status`);
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
      ? <UnblockButton
          icon={this.props.icon}
          service={this.props.service}
          canonicalService={this.props.canonicalService}
          onClick={() => this.clicked()}
        />
      : <BlockButton
          icon={this.props.icon}
          service={this.props.service}
          canonicalService={this.props.canonicalService}
          onClick={() => this.clicked()}
        />;
  }
}

export default BlockableServiceButton;
