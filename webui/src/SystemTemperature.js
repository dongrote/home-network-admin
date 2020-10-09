import React, {Component} from 'react';
import {Chart} from 'react-google-charts';
import { Grid } from 'semantic-ui-react';

class SystemTemperature extends Component {
  state = {showFahrenheit: false};

  toggleUnit() {
    this.setState({showFahrenheit: !this.state.showFahrenheit, history: []});
  }

  render() {
    return (
      <Grid.Row verticalAlign='middle'>
        <Grid.Column>
        <Chart
          chartType='AreaChart'
          loader={<div>Loading Data</div>}
          data={[['Time', 'Temperature']].concat(this.props.history.map((t, i) => [i, t]))}
          options={{
            title: 'Temperature (C)',
            legend: {position: 'none'},
            hAxis: {textPosition: 'none'},
            vAxis: {viewWindow: {max: 100, min: 20}},
            colors: ['orange'],
            trendlines: {
              0: {
                type: 'polynomial',
                degree: 3,
                visibleInLegend: false,
              },
            },
          }}
        />
        </Grid.Column>
      </Grid.Row>
    );
  }
}

export default SystemTemperature;
