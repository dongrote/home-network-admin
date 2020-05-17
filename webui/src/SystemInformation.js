import React from 'react';
import {Grid} from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import SystemTemperature from './SystemTemperature';
import LoadAverage from './LoadAverage';

export default props => (
  <LabeledButtonGroup label='System Information' color='green'>
    <Grid columns='equal'>
      <SystemTemperature
        fahrenheit={props.fahrenheit}
        celsius={props.celsius}
      />
      <LoadAverage />
    </Grid>
  </LabeledButtonGroup>
);
