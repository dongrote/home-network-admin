import React from 'react';
import {Grid} from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import SystemTemperature from './SystemTemperature';
import SystemStorage from './SystemStorage';
import LoadAverage from './LoadAverage';

export default props => (
  <LabeledButtonGroup label='System Information' color='green'>
    <Grid columns='equal'>
      <SystemTemperature
        criticalCelsius={props.criticalCelsius}
        fahrenheit={props.fahrenheit}
        celsius={props.celsius}
        history={props.tempHistory.entries}
        globalMinimum={props.tempHistory.min}
        globalMaximum={props.tempHistory.max}
      />
      <LoadAverage
        load={props.load}
        history={props.loadHistory.entries}
        globalMinimum={props.loadHistory.min}
        globalMaximum={props.loadHistory.max}
      />
      {props.storage.map(s => <SystemStorage
        mount={s.mount}
        size={s.size}
        used={s.used}
        available={s.available}
      />)}
    </Grid>
  </LabeledButtonGroup>
);
