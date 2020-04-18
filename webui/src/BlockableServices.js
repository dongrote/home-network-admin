import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableServiceButton from './BlockableServiceButton';

export default props => (
  <LabeledButtonGroup color='olive' label='Services'>
    {props.services.map((service, i) => 
      <BlockableServiceButton
        key={i}
        icon={service.icon}
        canonicalService={service.canonicalName}
        service={service.name}
        blocked={service.blocked}
        onUnauthorized={props.onUnauthorized}
        onClick={props.onMutate}
      />
    )}
  </LabeledButtonGroup>
);
