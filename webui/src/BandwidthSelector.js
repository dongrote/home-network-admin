import React, { Component } from 'react';
import { Dropdown, Button, Grid, Icon } from 'semantic-ui-react';

const bandwidthOptions = [{
  key: '14.4kbit',
  value: '14.4kbit',
  text: '14 Kbps (Dial Up)',
}, {
  key: '28.8kbit',
  value: '28.8kbit',
  text: '28 Kbps (Dial Up)',
}, {
  key: '33.6kbit',
  value: '33.6kbit',
  text: '33 Kbps (Dial Up)',
}, {
  key: '57.6kbit',
  value: '57.6kbit',
  text: '56 Kbps (Dial Up)',
}, {
  key: '64kbit',
  value: '64kbit',
  text: '64 Kbps (ISDN)',
}, {
  key: '115.2kbit',
  value: '115.2kbit',
  text: '115 Kbps (ISDN)',
}, {
  key: '128kbit',
  value: '128kbit',
  text: '128 Kbps (ISDN)',
}, {
  key: '256kbit',
  value: '256kbit',
  text: '256 Kbps',
}, {
  key: '512kbit',
  value: '512kbit',
  text: '512 Kbps',
}, {
  key: '1mbit',
  value: '1mbit',
  text: '1 Mbps',
}, {
  key: '1.5mbit',
  value: '1.5mbit',
  text: '1.5 Mbps',
}, {
  key: '2mbit',
  value: '2mbit',
  text: '2 Mbps',
}, {
  key: '3mbit',
  value: '3mbit',
  text: '3 Mbps',
}, {
  key: '4mbit',
  value: '4mbit',
  text: '4 Mbps',
}, {
  key: '5mbit',
  value: '5mbit',
  text: '5 Mbps',
}, {
  key: '8mbit',
  value: '8mbit',
  text: '8 Mbps',
}, {
  key: '10mbit',
  value: '10mbit',
  text: '10 Mbps',
}, {
  key: '16mbit',
  value: '16mbit',
  text: '16 Mbps',
}, {
  key: '20mbit',
  value: '20mbit',
  text: '20 Mbps',
}, {
  key: '25mbit',
  value: '25mbit',
  text: '25 Mbps',
}, {
  key: '32mbit',
  value: '32mbit',
  text: '32 Mbps',
}, {
  key: '64mbit',
  value: '64mbit',
  text: '64 Mbps',
}, {
  key: '100mbit',
  value: '100mbit',
  text: '100 Mbps',
}, {
  key: '128mbit',
  value: '128mbit',
  text: '128 Mbps',
}];

class BandwidthSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandwidthIndex: bandwidthOptions.findIndex(opt => opt.value === props.bandwidth),
      loading: false,
      error: false,
    };
  }

  onBandwidthChange(value) {
    this.setState({bandwidthIndex: value});
  }

  componentDidUpdate(prevProps) {
    if (this.props.bandwidth !== prevProps.bandwidth) {
      this.setState({bandwidthIndex: bandwidthOptions.findIndex(opt => opt.value === this.props.bandwidth)});
    }
  }

  async setBandwidth() {
    this.setState({loading: true});
    var res = await fetch(`/api/throttle/bandwidth?bandwidth=${encodeURIComponent(bandwidthOptions[this.state.bandwidthIndex].value)}`);
    this.setState({loading: false});
    if (!res.ok) {
      if (res.status === 401) {
        this.props.onUnauthorized();
      } else {
        this.setState({error: true});
        setTimeout(() => this.setState({error: false}), 3000);
      }
    }
  }

  render() {
    return (
      <Grid columns={2}>
        <Grid.Row>
          <Grid.Column>
            <Dropdown
              fluid
              placeholder='Select a Bandwidth'
              selection
              value={bandwidthOptions[this.state.bandwidthIndex].value}
              options={bandwidthOptions}
              onChange={(e, data) => this.onBandwidthChange(bandwidthOptions.findIndex(opt => opt.value === data.value))}
            />
          </Grid.Column>
          <Grid.Column textAlign='right'>
            <Button
              basic={!this.state.error}
              primary={!this.state.error}
              negative={this.state.error}
              disabled={this.state.error}
              loading={this.state.loading}
              onClick={() => this.setBandwidth()}
            >
              {this.state.error ? <Icon name='warning sign' /> : 'Apply'}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BandwidthSelector;
