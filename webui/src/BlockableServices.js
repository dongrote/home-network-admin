import React from 'react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BlockableServiceRow from './BlockableServiceRow';
import AddNetworkServiceForm from './AddNetworkServiceForm';

export default props => (
  <LabeledButtonGroup color='olive' label='Services'>
    {props.services.map((service, i) => 
      <BlockableServiceRow
        key={i}
        color={service.color}
        icon={service.icon}
        canonicalService={service.canonicalName}
        service={service.name}
        blocked={service.blocked}
        onUnauthorized={props.onUnauthorized}
        onClick={props.onMutate}
      />
    )}
    <AddNetworkServiceForm />
  </LabeledButtonGroup>
);
