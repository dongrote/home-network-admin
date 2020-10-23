import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

export default props => (
  <Grid.Row verticalAlign='middle'>
    <Grid.Column>
      <Chart
        chartType='AreaChart'
        loader={<div>Loading Data</div>}
        data={[['Time', 'Load Average', 'Minimum']].concat(props.history.map((l, i) => [i, l, props.globalMinimum]))}
        options={{
          title: `Current Load Average ${props.load} (Min: ${props.globalMinimum}; Max: ${props.globalMaximum})`,
          legend: {position: 'none'},
          hAxis: {textPosition: 'none'},
          vAxis: {viewWindow: {max: props.globalMaximum, min: 0}},
          series: [
            {color: 'purple'},
            {color: 'purple', areaOpacity:  0.0, lineWidth: 1, lineDashStyle: [4, 2]}
          ],
        }}
      />
    </Grid.Column>
  </Grid.Row>
);
