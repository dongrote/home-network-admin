import React, {Component} from 'react';
import {Input, Icon} from 'semantic-ui-react';

class HostnameInput extends Component {
  state = {hostname: '', validateIcon: null, validateIconColor: null};
  hostnameValidateTimeout = null;

  async validateHostname() {
    if (this.state.hostname.length === 0) {
      this.setState({validateIcon: null});
      this.props.onValidateHostname(this.state.hostname, false);
      return;
    };
    var res = await fetch(`/api/services/validate?domain=${encodeURIComponent(this.state.hostname)}`);
    if (res.ok) {
      var json = await res.json();
      this.setState({
        validateIcon: json.valid ? 'check circle outline' : 'times circle outline',
        validateIconColor: json.valid ? 'green' : 'red',
      });
      this.props.onValidateHostname(this.state.hostname, json.valid);
    }
  }

  onInput(value) {
    if (this.hostnameValidateTimeout) {
      clearTimeout(this.hostnameValidateTimeout);
      this.hostnameValidateTimeout = null;
    }
    this.setState({hostname: value.toLowerCase()});
    this.hostnameValidateTimeout = setTimeout(() => this.validateHostname(), 1000);
  }

  render() {
    return (
      <Input iconPosition='right'>
        <input
          placeholder='hostname.com'
          value={this.state.hostname}
          onInput={e => this.onInput(e.target.value)}
        />
        {this.state.validateIcon && <Icon color={this.state.validateIconColor} name={this.state.validateIcon}/>}
      </Input>
    );
  }
}

export default HostnameInput;
