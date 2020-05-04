import React from 'react';
import {Statistic, Icon} from 'semantic-ui-react';

export default props => (
  <Statistic size='mini' onClick={() => props.onClick()}>
    <Statistic.Label>{props.tempUnit}</Statistic.Label>
    <Statistic.Value>
      <Icon name='thermometer'/>
      {props.tempValue}º
    </Statistic.Value>
  </Statistic>
);
