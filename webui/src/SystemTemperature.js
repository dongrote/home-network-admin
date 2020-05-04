import React, {Component} from 'react';
import SystemInformationRow from './SystemInformationRow';
import TemperatureStatistic from './TemperatureStatistic';

class SystemTemperature extends Component {
  state = {showFahrenheit: true};
  toggleUnit() {
    this.setState({showFahrenheit: !this.state.showFahrenheit});
  }
  render() {
    return (
      <SystemInformationRow label='Temperature'>
        <TemperatureStatistic onClick={() => this.toggleUnit()}
          tempValue={this.state.showFahrenheit ? this.props.fahrenheit : this.props.celsius}
          tempUnit={this.state.showFahrenheit ? 'Fahrenheit' : 'Celsius'}
        />
      </SystemInformationRow>
    );
  }
}

export default SystemTemperature;
