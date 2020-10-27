import React, { Component } from 'react';
import { Button, Grid, Icon } from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';
import BandwidthSelector from './BandwidthSelector';
import AddThrottledHostForm from './AddThrottledHostForm';
import BandwidthUsage from './BandwidthUsage';
import OnlineLabel from './OnlineLabel';

class ThrottledDevices extends Component {

  async onRemoveHost(h) {
    var res = await fetch(`/api/throttle/remove?hostname=${encodeURIComponent(h)}`);
    if (res.status === 401) {
      this.props.onUnauthorized();
    }
  }

  async updateOnlineStatus(hostname) {
    await fetch(`/api/devices/online?hostname=${encodeURIComponent(hostname)}`);
  }

  render() {
    return (
      <LabeledButtonGroup color='teal' label='Throttle Control'>
        <BandwidthSelector bandwidth={this.props.bandwidth} onUnauthorized={this.props.onUnauthorized}/>
        {this.props.hosts.map((h, i) => (
          <Grid columns={2} key={i}>
            <Grid.Row>
              <Grid.Column>
                <Grid columns={1}>
                  <Grid.Row>
                    <Grid.Column>
                      <OnlineLabel
                        onClick={() => this.updateOnlineStatus(h)}
                        canonicalName={h}
                        onlineStatus='online'
                      />
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
              <Grid.Column>
                <Grid columns={2}>
                  <Grid.Row>
                    <Grid.Column>
                      <BandwidthUsage hostname={h} />
                    </Grid.Column>
                    <Grid.Column>
                      <Button
                        negative
                        icon
                        onClick={() => this.onRemoveHost(h)}
                      >
                        <Icon name='trash alternate'/>
                      </Button>
                    </Grid.Column>
                  </Grid.Row>
                </Grid>
              </Grid.Column>
            </Grid.Row>
          </Grid>
        ))}
        <Grid columns={1}>
          <Grid.Row>
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
