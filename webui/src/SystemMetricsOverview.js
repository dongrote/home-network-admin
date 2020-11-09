import React, { Component } from 'react';
import { Grid, Header } from 'semantic-ui-react';
import socket from './websocket';
import { uid } from 'uid';

class SystemMetricsOverview extends Component {
  state = {cpuCount: 0};
  handleMessage(msg) {
    if (msg.hostname !== this.props.hostname) return;
    this.setState({cpuCount: msg.procs.length});
  }
  componentDidMount() {
    this.instance = uid();
    const messageHandler = msg => this.handleMessage(msg);
    messageHandler.instance = this.instance;
    socket.on('system-metrics', messageHandler);
  }
  componentWillUnmount() {
    socket
      .listeners('system-metrics')
      .filter(l => l.instance === this.instance)
      .forEach(l => socket.off('system-metrics', l));
  }
  render() {
    return (
      <Grid columns={1}>
        <Grid.Row>
          <Grid.Column>
            <Header content={this.props.hostname} />
          </Grid.Column>
        </Grid.Row>
        <Grid.Row>
          <Grid.Column>
            CPU Count: {this.state.cpuCount}
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default SystemMetricsOverview;