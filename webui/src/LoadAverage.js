import React from 'react';
import SystemInformationRow from './SystemInformationRow';
import {Sparklines, SparklinesLine} from 'react-sparklines';
import {Statistic} from 'semantic-ui-react';

export default props => (
  <SystemInformationRow label='Load'>
    <Statistic size='mini' value={props.load} />
    <Sparklines data={props.history}>
      <SparklinesLine color='blue' />
    </Sparklines>
  </SystemInformationRow>
);
