import React, { Component } from 'react';
import { Segment, Header, Grid, Button } from 'semantic-ui-react';

class LabeledButtonGroup extends Component {
  state = {show: true};

  onShowToggle() {
    this.setState({show: !this.state.show});
  }

  render() {
    const children = Array.isArray(this.props.children) ? this.props.children : [this.props.children];
    return (
      <Segment color={this.props.color} loading={this.props.loading}>
        <Segment vertical>
          <Grid columns={1}>
            <Grid.Row>
              <Grid.Column>
                <Header as='h2' textAlign='left'>{this.props.label}</Header>
              </Grid.Column>
              {false && <Grid.Column textAlign='right'>
                <Button
                  basic
                  content={this.state.show ? 'Hide' : 'Show'}
                  onClick={() => this.onShowToggle()}
                />
              </Grid.Column>}
            </Grid.Row>
          </Grid>
        </Segment>
        {this.state.show && children.map((child, i) => (
          <Segment key={i} vertical textAlign='center'>
            {child}
          </Segment>
        ))}
      </Segment>
    );
  }
}

export default LabeledButtonGroup;
