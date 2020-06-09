import React from 'react';
import { List, Label } from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BandwidthSelector from './BandwidthSelector';

export default props => (
  <LabeledButtonGroup color='teal' label='Throttle Control'>
    <BandwidthSelector bandwidth={props.bandwidth} onUnauthorized={props.onUnauthorized}/>
    {props.hosts.length && (
      <List>
        <List.Item>
          <List.Header>Throttled Hosts</List.Header>
        </List.Item>
      {props.hosts.map((h, i) => (
        <List.Item key={i}>{h}</List.Item>
      ))}
      </List>
    )}
    {props.hosts.length === 0 && <Label content='no throttled hosts'/>}
  </LabeledButtonGroup>
);
