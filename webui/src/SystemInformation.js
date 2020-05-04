import React from 'react';
import {Grid} from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import SystemTemperature from './SystemTemperature';
import LoadAverages from './LoadAverages';

export default props => (
  <LabeledButtonGroup label='System Information' color='green'>
    <Grid columns='equal'>
      <SystemTemperature
        fahrenheit={props.fahrenheit}
        celsius={props.celsius}
      />
      <LoadAverages
        loadavg1={props.loadavg1}
        loadavg5={props.loadavg5}
        loadavg15={props.loadavg15}
      />
    </Grid>
  </LabeledButtonGroup>
);
