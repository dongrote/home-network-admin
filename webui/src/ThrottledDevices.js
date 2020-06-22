import React, { Component } from 'react';
import { Button, Grid, Label, Icon } from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BandwidthSelector from './BandwidthSelector';
import AsyncButton from './AsyncButton';
import AddThrottledHostForm from './AddThrottledHostForm';
import BandwidthUsage from './BandwidthUsage';

class ThrottledDevices extends Component {

  async onRemoveHost(h) {
    var res = await fetch(`/api/throttle/remove?hostname=${encodeURIComponent(h)}`);
    if (res.status === 401) {
      this.props.onUnauthorized();
    }
  }

  render() {
    return (
      <LabeledButtonGroup color='teal' label='Throttle Control'>
        <BandwidthSelector bandwidth={this.props.bandwidth} onUnauthorized={this.props.onUnauthorized}/>
        <Grid>
          {this.props.hosts.map((h, i) => (
            <Grid.Row key={i} columns={2}>
              <Grid.Column>
                <Button as='div' labelPosition='left'>
                  <Label basic as='a'>{h}</Label>
                  <AsyncButton icon onClick={() => this.onRemoveHost(h)}>
                    <Icon name='trash alternate' />
                  </AsyncButton>
                </Button>
              </Grid.Column>
              <Grid.Column>
                <BandwidthUsage hostname={h} />
              </Grid.Column>
            </Grid.Row>
          ))}
          <Grid.Row columns={1}>
            <Grid.Column>
              <AddThrottledHostForm onUnauthorized={this.props.onUnauthorized} />
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </LabeledButtonGroup>
    );
  }
}

export default ThrottledDevices;
