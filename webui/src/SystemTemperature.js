import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import { Grid } from 'semantic-ui-react';

const ctof = c => Math.round((c * (9/5)) + 32);

class SystemTemperature extends Component {
  state = {showFahrenheit: false};

  toggleUnit() {
    this.setState({showFahrenheit: !this.state.showFahrenheit, history: []});
  }

  currentTemperature() {
    return this.state.showFahrenheit ? `${this.props.fahrenheit}ºF` : `${this.props.celsius}ºC`;
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
          data={[['Time', 'Temperature']].concat(this.props.history.map((t, i) => [i, this.adjustTemperatureValue(t)]))}
          options={{
            title: `Current Temperature ${this.currentTemperature()}`,
            legend: {position: 'none'},
            hAxis: {textPosition: 'none'},
            vAxis: {viewWindow: {
              max: this.adjustTemperatureValue(85),
              min: this.adjustTemperatureValue(20),
            }},
            colors: ['orange'],
          }}
        />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default SystemTemperature;
