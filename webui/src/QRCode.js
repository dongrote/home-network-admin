import React from 'react';
import { Image } from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';

export default props => (
  <LabeledButtonGroup
    color='grey'
    label='QR Code'
  >
    <Image bordered centered src={props.src} />
  </LabeledButtonGroup>
);
