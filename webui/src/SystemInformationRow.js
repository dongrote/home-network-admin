import React from 'react';
import {Grid} from 'semantic-ui-react';

export default props => (
  <Grid.Row verticalAlign='middle'>
    <Grid.Column>
      <Grid columns='equal' textAlign='center'>
        {Array.isArray(props.children)
          ? props.children.map((c, k) => (<Grid.Column key={k} only={k > 2 ? 'tablet computer' : undefined}>{c}</Grid.Column>))
          : (<Grid.Column>{props.children}</Grid.Column>)}
      </Grid>
    </Grid.Column>
  </Grid.Row>
);
