import React, {Component} from 'react';
import {Grid} from 'semantic-ui-react';
import BlockableDeviceButton from './BlockableDeviceButton';
import OnlineLabel from './OnlineLabel';

class BlockableDeviceRow extends Component {
  state = {onlineStatus: 'checking'};

  async updateOnlineStatus() {
    this.setState({onlineStatus: 'checking'});
    var res = await fetch(`/api/devices/online?hostname=${encodeURIComponent(this.props.device)}`);
    var json = await res.json();
    this.setState({
      onlineStatus: json.online ? 'online' : 'offline',
    });
  }

  componentDidMount() {
    this.updateOnlineStatus();
  }

  render() {
    return (
      <Grid>
        <Grid.Row columns={2} verticalAlign='middle'>
          <Grid.Column>
            <OnlineLabel
              onClick={() => this.updateOnlineStatus()}
              canonicalName={this.props.canonicalDevice}
              onlineStatus={this.state.onlineStatus} />
          </Grid.Column>
          <Grid.Column>
            <BlockableDeviceButton
              device={this.props.device}
              blocked={this.props.blocked}
              onUnauthorized={this.props.onUnauthorized}
            />
          </Grid.Column>
        </Grid.Row>
      </Grid>
    );
  }
}

export default BlockableDeviceRow;
