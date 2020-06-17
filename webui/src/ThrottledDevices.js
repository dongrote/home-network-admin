import React, { Component } from 'react';
import { Button, Grid } from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BandwidthSelector from './BandwidthSelector';
import AsyncButton from './AsyncButton';
import AddThrottledHostForm from './AddThrottledHostForm';

const onRemoveHost = (h, onUnauthorized) => fetch(`/api/throttle/remove?hostname=${encodeURIComponent(h)}`)
  .then(res => res.status === 401 ? onUnauthorized() : null);

class ThrottledDevices extends Component {
  state = {showAddNewHost: false};

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
                <Button fluid basic>{h}</Button>
              </Grid.Column>
              <Grid.Column>
                <AsyncButton
                  negative
                  fluid
                  content='Remove'
                  onClick={() => this.onRemoveHost(h)}
                />
              </Grid.Column>
            </Grid.Row>
          ))}
          <Grid.Row columns={1}>
            <Grid.Column>
              {this.state.showAddNewHost
                ? <AddThrottledHostForm onUnauthorized={this.props.onUnauthorized} />
                : <Button fluid content='Add New Host' onClick={() => this.setState({showAddNewHost: true})}/>}
            </Grid.Column>
          </Grid.Row>
        </Grid>
      </LabeledButtonGroup>
    );
  }
}

export default ThrottledDevices;
