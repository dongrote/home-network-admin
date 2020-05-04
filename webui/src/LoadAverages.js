import React from 'react';
import SystemInformationRow from './SystemInformationRow';
import { Statistic } from 'semantic-ui-react';

export default props => (
  <SystemInformationRow label='Load'>
    <Statistic size='mini' value={props.loadavg1} />
    <Statistic size='mini' value={props.loadavg5} />
    <Statistic size='mini' value={props.loadavg15} />
  </SystemInformationRow>
);
