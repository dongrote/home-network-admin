import React, { Component } from 'react';
import { Button, Grid, Form, Icon } from 'semantic-ui-react';

const rangeToBandwidth = [
  '28kbit',
  '64kbit',
  '128kbit',
  '256kbit',
  '512kbit',
  '1mbit',
  '2mbit',
  '4mbit',
  '5mbit',
  '8mbit',
  '10mbit',
  '16mbit',
  '20mbit',
  '25mbit',
  '32mbit',
  '64mbit',
  '100mbit',
  '128mbit',
];

class BandwidthSelector extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bandwidthIndex: rangeToBandwidth.indexOf(props.bandwidth),
      loading: false,
      error: false,
    };
  }

  onBandwidthChange(value) {
    this.setState({bandwidthIndex: value});
  }

  componentDidUpdate(prevProps) {
    if (this.props.bandwidth !== prevProps.bandwidth) {
      this.setState({bandwidthIndex: rangeToBandwidth.indexOf(this.props.bandwidth)});
    }
  }

  async setBandwidth() {
    this.setState({loading: true});
    var res = await fetch(`/api/throttle/bandwidth?bandwidth=${encodeURIComponent(rangeToBandwidth[this.state.bandwidthIndex])}`);
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
          <Grid.Column textAlign='left'>
            <Form>
              <Form.Field>
                <label>Bandwidth Limit {rangeToBandwidth[this.state.bandwidthIndex]}</label>
                <input
                  type='range'
                  value={this.state.bandwidthIndex}
                  min={0}
                  max={rangeToBandwidth.length - 1}
                  onChange={e => this.onBandwidthChange(e.target.value)}
                />
              </Form.Field>
            </Form>
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
              {this.state.error ? <Icon name='warning sign' /> : 'Submit'}
            </Button>
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BandwidthSelector;
