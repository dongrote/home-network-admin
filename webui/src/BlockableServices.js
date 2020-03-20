import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableServiceButton from './BlockableServiceButton';

const BlockableServices = props => (
  <LabeledButtonGroup color='olive' label='Services'>
    {props.services.map((service, i) => 
      <BlockableServiceButton
        key={i}
        icon={service.icon}
        canonicalService={service.canonicalService}
        service={service.service}
        onUnauthorized={() => props.onUnauthorized()}
      />
    )}
  </LabeledButtonGroup>
);

export default BlockableServices;
