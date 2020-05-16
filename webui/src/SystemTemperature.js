import React, {Component} from 'react';
import SystemInformationRow from './SystemInformationRow';
import TemperatureStatistic from './TemperatureStatistic';
import {Sparklines, SparklinesLine} from 'react-sparklines';

class SystemTemperature extends Component {
  state = {
    showFahrenheit: true,
    celsius: null,
    fahrenheit: null,
    history: [],
  };

  toggleUnit() {
    this.setState({showFahrenheit: !this.state.showFahrenheit, history: []});
  }

  async fetchCurrent() {
    var res = await fetch('/api/system/state');
    var json = await res.json();
    return json.state.temp;
  }

  async fetchHistory() {
    var res = await fetch('/api/system/history?name=temp');
    var json = await res.json();
    return json;
  }

  async updateState() {
    var history = await this.fetchHistory();
    var current = await this.fetchCurrent();
    this.setState({
      history,
      celsius: current.celsius,
      fahrenheit: current.fahrenheit,
    });
    setTimeout(() => this.updateState(), 1000);
  }
  componentDidMount() {
    setImmediate(() => this.updateState());
  }
  render() {
    return (
      <SystemInformationRow label='Temperature'>
        <TemperatureStatistic onClick={() => this.toggleUnit()}
          tempValue={this.state.showFahrenheit ? this.state.fahrenheit : this.state.celsius}
          tempUnit={this.state.showFahrenheit ? 'Fahrenheit' : 'Celsius'}
        />
        <Sparklines data={this.state.history} width={100} height={40} margin={5}>
          <SparklinesLine color='blue'/>
        </Sparklines>
      </SystemInformationRow>
    );
  }
}

export default SystemTemperature;
