import React from 'react';
import SystemInformationRow from './SystemInformationRow';
import {Sparklines, SparklinesLine, SparklinesReferenceLine} from 'react-sparklines';
import {Statistic} from 'semantic-ui-react';

export default props => (
  <SystemInformationRow label='Load'>
    <Statistic size='mini' value={props.load} />
    <Sparklines data={props.history} min={0}>
      <SparklinesLine color='blue' />
      <SparklinesReferenceLine type='custom' value={1.0} />
    </Sparklines>
  </SystemInformationRow>
);
