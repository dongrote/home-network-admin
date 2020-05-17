import React, { Component } from 'react';
import SystemInformationRow from './SystemInformationRow';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';
import {Statistic} from 'semantic-ui-react';

class LoadAverage extends Component {
  state = {history: [], load: 0};

  async fetchCurrent() {
    var res = await fetch('/api/system/state');
    var json = await res.json();
    return json.state.loadavg[0];
  }

  async fetchHistory() {
    var res = await fetch('/api/system/history?name=load');
    var json = await res.json();
    return json;
  }

  async updateState() {
    var history = await this.fetchHistory();
    var current = await this.fetchCurrent();
    this.setState({
      history,
      load: current,
    });
    setTimeout(() => this.updateState(), 1000);
  }

  componentDidMount() {
    setImmediate(() => this.updateState());
  }

  render() {
    return (
      <SystemInformationRow label='Load'>
        <Statistic size='mini' value={this.state.load} />
        <Sparklines data={this.state.history} min={0}>
          <SparklinesLine color='blue' />
          <SparklinesReferenceLine type='custom' value={1.0} />
        </Sparklines>
      </SystemInformationRow>
    );
  }
}

export default LoadAverage;
