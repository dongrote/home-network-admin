import React from 'react';
import { Grid } from 'semantic-ui-react';
import { Chart } from 'react-google-charts';

export default props => (
  <Grid.Row verticalAlign='middle'>
    <Grid.Column>
      <Chart
        chartType='AreaChart'
        loader={<div>Loading Data</div>}
        data={[['Time', 'Load Average']].concat(props.history.map((l, i) => [i, l]))}
        options={{
          title: `Current Load Average ${props.load}`,
          legend: {position: 'none'},
          hAxis: {textPosition: 'none'},
          vAxis: {viewWindow: {max: 15, min: 0}},
          colors: ['purple'],
          trendlines: {
            0: {
              type: 'polynomial',
              degree: 3,
              visibleInLegend: false
            }
          }
        }}
      />
    </Grid.Column>
  </Grid.Row>
);
