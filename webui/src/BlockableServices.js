import React, { Component } from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableServiceButton from './BlockableServiceButton';

class BlockableServices extends Component {
  state = {services: [], loading: true};

  async updateAvailableServices() {
    var res = await fetch('/api/services/available');
    if (res.status === 401) {
      return this.props.onUnauthorized();
    }
    var json = await res.json();
    this.setState({services: json.services, loading: false});
    setTimeout(() => this.updateAvailableServices(), 30000);
  }

  async componentDidMount() {
    await this.updateAvailableServices();
  }

  render() {
    return (
      <LabeledButtonGroup color='olive' label='Services' loading={this.state.loading}>
        {this.state.services.map((service, i) => 
          <BlockableServiceButton
            key={i}
            icon={service.icon}
            canonicalService={service.canonicalName}
            service={service.name}
            onUnauthorized={() => this.props.onUnauthorized()}
          />
        )}
      </LabeledButtonGroup>
    );
  }
}

export default BlockableServices;
