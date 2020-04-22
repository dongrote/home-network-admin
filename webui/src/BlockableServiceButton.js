import React from 'react';
import BlockServiceButton from './BlockServiceButton';
import UnblockServiceButton from './UnblockServiceButton';

export default props => props.blocked
  ? <UnblockServiceButton
      adminUser={props.adminUser}
      icon={props.icon}
      service={props.service}
      canonicalService={props.canonicalService}
      onClick={() => props.onClick()}
      onUnauthorized={props.onUnauthorized}
    />
  : <BlockServiceButton
      adminUser={props.adminUser}
      icon={props.icon}
      service={props.service}
      canonicalService={props.canonicalService}
      onClick={() => props.onClick()}
      onUnauthorized={props.onUnauthorized}
    />;
