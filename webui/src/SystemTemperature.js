import React from 'react';
import SystemInformationRow from './SystemInformationRow';
import TemperatureStatistic from './TemperatureStatistic';

export default props => (
  <SystemInformationRow label='System Temperature'>
    <TemperatureStatistic
      tempValue={props.fahrenheit}
      tempUnit='Fahrenheit'
    />
    <TemperatureStatistic
      tempValue={props.celsius}
      tempUnit='Celsius'
    />
  </SystemInformationRow>
);
