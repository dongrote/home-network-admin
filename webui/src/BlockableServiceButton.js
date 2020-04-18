import React from 'react';
import BlockServiceButton from './BlockServiceButton';
import UnblockServiceButton from './UnblockServiceButton';

export default props => props.blocked
  ? <UnblockServiceButton
      icon={props.icon}
      service={props.service}
      canonicalService={props.canonicalService}
      onClick={() => props.onClick()}
    />
  : <BlockServiceButton
      icon={props.icon}
      service={props.service}
      canonicalService={props.canonicalService}
      onClick={() => props.onClick()}
    />;
