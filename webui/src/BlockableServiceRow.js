import React from 'react';
import {Grid, Button, Icon} from 'semantic-ui-react';
import BlockableServiceButton from './BlockableServiceButton';

export default props => (
  <Grid>
    <Grid.Row columns={2} verticalAlign='middle'>
      <Grid.Column>
        <Button fluid size='large' color={props.color}>
          <Icon name={props.icon} />
          {props.canonicalService}
        </Button>
      </Grid.Column>
      <Grid.Column>
        <BlockableServiceButton
          service={props.service}
          blocked={props.blocked}
          onUnauthorized={props.onUnauthorized}
        />
      </Grid.Column>
    </Grid.Row>
  </Grid>  
);
