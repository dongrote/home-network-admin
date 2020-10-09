import React from 'react';
import SystemInformationRow from './SystemInformationRow';
import { Icon, Progress, Statistic } from 'semantic-ui-react';

const preciseRound = x => Math.round(x * 100) / 100;
const sizeToHumanReadable = size => {
  if (size < (1<<10)) return `${size} B`;
  if (size < (1<<20)) return `${preciseRound(size / (1<<10))} KB`;
  if (size < (1<<30)) return `${preciseRound(size / (1<<30))} MB`;
  return `${preciseRound(size / (1<<40))} GB`;
};

export default props => (
  <SystemInformationRow label={props.mount}>
    <Statistic>
      <Statistic.Value>
        <Icon name='disk'/>
        {sizeToHumanReadable(props.size)}
      </Statistic.Value>
      <Statistic.Label>{props.mount}</Statistic.Label>
    </Statistic>
    <Progress total={props.size} value={props.used} />
  </SystemInformationRow>
);