import React, {Component} from 'react';
import {Label, Icon} from 'semantic-ui-react';

class OnlineLabel extends Component {
  state = {online: false, status: 'Offline'};

  async updateStatus() {
    this.setState({status: 'Checking ...'});
    var res = await fetch(`/api/devices/online?hostname=${encodeURIComponent(this.props.hostname)}`);
    var json = await res.json();
    this.setState({
      online: json.online,
      status: json.online ? 'Online' : 'Offline',
    });
  }

  componentDidMount() {
    this.updateStatus();
  }

  render() {
    return (
      <Label>
        <Icon name='power' color={this.state.online ? 'green' : 'black'} />
        {this.props.canonicalName}
        <Label.Detail>{this.state.status}</Label.Detail>
      </Label>
    );
  }
}

export default OnlineLabel;
