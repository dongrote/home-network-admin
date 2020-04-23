import React from 'react';
import {Grid, Label, Icon} from 'semantic-ui-react';
import BlockableServiceButton from './BlockableServiceButton';

export default props => (
  <Grid>
    <Grid.Row columns={2}>
      <Grid.Column>
        <Label color={props.color}>
          <Icon name={props.icon} />
          {props.canonicalService}
        </Label>
      </Grid.Column>
      <Grid.Column textAlign='left'>
        <BlockableServiceButton
          adminUser={props.adminUser}
          service={props.service}
          blocked={props.blocked}
          onUnauthorized={props.onUnauthorized}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>  
);
