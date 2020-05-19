import React from 'react';
import SystemInformationRow from './SystemInformationRow';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {Statistic} from 'semantic-ui-react';

export default props => (
  <SystemInformationRow label='Load'>
    <Statistic size='mini'>
      <Statistic.Value>{props.load}</Statistic.Value>
      <Statistic.Label>Load</Statistic.Label>
    </Statistic>
    <Sparklines data={props.history}>
      <SparklinesLine color='blue' />
    </Sparklines>
  </SystemInformationRow>
);
