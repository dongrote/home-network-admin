import React from 'react';
import SystemInformationRow from './SystemInformationRow';
import { Statistic } from 'semantic-ui-react';

export default props => (
  <SystemInformationRow label='Load Averages'>
    <Statistic size='tiny' value={props.loadavg1} />
    <Statistic size='tiny' value={props.loadavg5} />
    <Statistic size='tiny' value={props.loadavg15} />
  </SystemInformationRow>
);
