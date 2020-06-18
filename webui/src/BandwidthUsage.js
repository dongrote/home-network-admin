import React, { Component } from 'react';
import { Icon, Statistic } from 'semantic-ui-react';

class BandwidthUsage extends Component {
  state = {usage: null, unit: null};
  mounted = false;

  async updateUsage() {
    var res = await fetch(`/api/throttle/usage?hostname=${encodeURIComponent(this.props.hostname)}&sampleTime=5`);
    if (res.ok) {
      var json = await res.json();
      let usage = json.bps;
      let unit = 'bps';
      if (json.Kbps) {
        usage = json.Kbps;
        unit = 'kbps';
      }
      if (json.Mbps) {
        usage = json.Mbps;
        unit = 'mbps';
      }
      this.setState({usage, unit});
      if (this.mounted) {
        setTimeout(() => this.updateUsage(), 1000);
      }
    }
  }

  componentDidMount() {
    this.mounted = true;
    this.updateUsage();
  }

  componentWillUnmount() {
    this.mounted = false;
  }

  render() {
    return (
      <Statistic size='tiny'>
        <Statistic.Value>{this.state.usage === null ? <Icon name='spinner' loading /> : this.state.usage}</Statistic.Value>
        <Statistic.Label>{this.state.unit || 'bps'}</Statistic.Label>
      </Statistic>
    );
  }
}

export default BandwidthUsage;
