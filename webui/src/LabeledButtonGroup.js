import React from 'react';
import { Segment, Header } from 'semantic-ui-react';

const LabeledButtonGroup = props => {
  props.children = Array.isArray(props.children) ? props.children : [props.children];
  return (
  <Segment color={props.color}>
    <Segment vertical>
      <Header as='h2' textAlign='left'>{props.label}</Header>
    </Segment>
    {props.children.map((child, i) => (
      <Segment key={i} vertical textAlign='center'>
        {child}
      </Segment>
    ))}
  </Segment>
);
    };

export default LabeledButtonGroup;
