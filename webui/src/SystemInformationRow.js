import React from 'react';
import {Grid, Button} from 'semantic-ui-react';

export default props => (
  <Grid.Row verticalAlign='middle'>
    <Grid.Column>
      <Button fluid disabled size='huge' basic color='black'>
        {props.label}
      </Button>
    </Grid.Column>
    <Grid.Column>
      <Grid columns='equal'>
        {Array.isArray(props.children)
          ? props.children.map((c, k) => (<Grid.Column key={k}>{c}</Grid.Column>))
          : (<Grid.Column>{props.children}</Grid.Column>)}
      </Grid>
    </Grid.Column>
  </Grid.Row>
);
