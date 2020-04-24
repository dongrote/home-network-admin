import React from 'react';
import {Grid, Header} from 'semantic-ui-react';
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
    {props.services.length === 0 && (
      <Grid>
        <Grid.Row columns={1}>
          <Grid.Column>
            <Header>No Services</Header>
            Populate <tt>/var/run/home-network-admin/network-services.yaml</tt>.
          </Grid.Column>
        </Grid.Row>
      </Grid>
    )}
  </LabeledButtonGroup>
);
