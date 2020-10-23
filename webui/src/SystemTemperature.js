import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import { Grid } from 'semantic-ui-react';

const ctof = c => Math.round((c * (9/5)) + 32);
const minimumTemperaturePad = 5;

class SystemTemperature extends Component {
  state = {showFahrenheit: false};

  toggleUnit() {
    this.setState({showFahrenheit: !this.state.showFahrenheit, history: []});
  }

  unitString() {
    return `º${this.state.showFahrenheit ? 'F' : 'C'}`;
  }

  currentTemperature() {
    return this.state.showFahrenheit ? `${this.props.fahrenheit}ºF` : `${this.props.celsius}ºC`;
  }

  globalMinimumTemperature() {
    return `${this.adjustTemperatureValue(this.props.globalMinimum)}${this.unitString()}`;
  }

  globalMaximumTemperature() {
    return `${this.adjustTemperatureValue(this.props.globalMaximum)}${this.unitString()}`;
  }

  adjustTemperatureValue(v) {
    return this.state.showFahrenheit ? ctof(v) : v;
  }

  render() {
    return (
      <Grid.Row verticalAlign='middle' onClick={() => this.setState({showFahrenheit: !this.state.showFahrenheit})}>
        <Grid.Column>
        <Chart
          chartType='AreaChart'
          loader={<div>Loading Data</div>}
          data={[['Time', 'Minimum', 'Temperature', 'Maximum']].concat(this.props.history.map((t, i) => [
            i,
            this.adjustTemperatureValue(this.props.globalMinimum),
            this.adjustTemperatureValue(t),
            this.adjustTemperatureValue(this.props.globalMaximum)
          ]))}
          options={{
            title: `Current Temperature ${this.currentTemperature()} (Min: ${this.globalMinimumTemperature()}; Max: ${this.globalMaximumTemperature()})`,
            legend: {position: 'none'},
            hAxis: {textPosition: 'none'},
            vAxis: {viewWindow: {
              max: this.adjustTemperatureValue(this.props.criticalCelsius),
              min: this.adjustTemperatureValue(this.props.globalMinimum - minimumTemperaturePad),
            }},
            series: [
              {color: 'blue', areaOpacity: 0.0, lineWidth: 1, lineDashStyle: [4, 2]},
              {color: 'orange'},
              {color: 'red', areaOpacity: 0.0, lineWidth: 1, lineDashStyle: [4, 2]}
            ]
          }}
        />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default SystemTemperature;
