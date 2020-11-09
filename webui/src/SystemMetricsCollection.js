import React, { Component } from 'react';
import { uid } from 'uid';
import socket from './websocket';
import SystemMetricsOverview from './SystemMetricsOverview';

class SystemMetricsCollection extends Component {
  state = {hostnames: []}

  handleUpdate(msg) {
    const uniqueHostnames = new Set(this.state.hostnames);
    uniqueHostnames.add(msg.hostname);
    if (uniqueHostnames.size !== this.state.hostnames.length) {
      this.setState({hostnames: Array.from(uniqueHostnames.values())});
    }
  }

  componentDidMount() {
    this.instance = uid();
    const updateHandler = msg => this.handleUpdate(msg);
    updateHandler.instance = this.instance;
    socket.on('system-metrics', updateHandler);
  }
  componentWillUnmount() {
    socket
      .listeners('system-metrics')
      .filter(l => l.instance === this.instance)
      .forEach(l => socket.off('system-metrics', l));
  }
  render() {
    return (
      <div>
        {this.state.hostnames.map((h, i) => <SystemMetricsOverview key={i} hostname={h}/>)}
      </div>
    );
  }
}

export default SystemMetricsCollection;