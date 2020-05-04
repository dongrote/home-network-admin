import React from 'react';
import {Statistic, Icon} from 'semantic-ui-react';

export default props => (
  <Statistic size='tiny'>
    <Statistic.Label>{props.tempUnit}</Statistic.Label>
    <Statistic.Value>
      <Icon name='thermometer'/>
      {props.tempValue}º
    </Statistic.Value>
  </Statistic>
);
