import React, {Component} from 'react';
import SystemInformationRow from './SystemInformationRow';
import TemperatureStatistic from './TemperatureStatistic';
import {Sparklines, SparklinesLine} from 'react-sparklines';

class SystemTemperature extends Component {
  state = {showFahrenheit: true};

  toggleUnit() {
    this.setState({showFahrenheit: !this.state.showFahrenheit, history: []});
  }

  render() {
    return (
      <SystemInformationRow label='Temperature'>
        <TemperatureStatistic onClick={() => this.toggleUnit()}
          tempValue={this.state.showFahrenheit ? this.props.fahrenheit : this.props.celsius}
          tempUnit={this.state.showFahrenheit ? 'Fahrenheit' : 'Celsius'}
        />
        <Sparklines data={this.props.history}>
          <SparklinesLine color='orange' />
        </Sparklines>
      </SystemInformationRow>
    );
  }
}

export default SystemTemperature;
