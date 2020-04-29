import React, {Component} from 'react';
import {Button, Grid, Form} from 'semantic-ui-react';

class AddWakeupDeviceForm extends Component {
  state = {
    creating: false,
    name: '',
    hwaddr: '',
    hostname: '',
    maySubmit: false,
  };
  hostnameTimeout = null;

  async updateEthernetAddress() {
    if (this.state.hostname.length === 0) {
      this.setState({hwaddr: '', maySubmit: false});
      return;
    };
    var res = await fetch(`/api/devices/ethernet?hostname=${encodeURIComponent(this.state.hostname)}`);
    if (res.ok) {
      var json = await res.json();
      this.setState({
        hwaddr: json.ethernet,
        maySubmit: this.state.hostname.length > 0 && this.state.name.length > 0,
      });
    } else {
      this.setState({hwaddr: '', maySubmit: false});
    }
  }

  onHostnameInput(value) {
    clearTimeout(this.hostnameTimeout);
    this.hostnameTimeout = null;
    const adjustedHostname = value.replace(/ /g, '').toLowerCase();
    this.setState({
      hostname: adjustedHostname,
      maySubmit: this.state.hwaddr.length > 0 && adjustedHostname.length > 0 && this.state.name.length > 0,
    });
    this.hostnameTimeout = setTimeout(() => this.updateEthernetAddress(), 1000);
  }

  onNameInput(value) {
    this.setState({
      name: value,
      maySubmit: value.length > 0 && this.state.hwaddr.length > 0 && this.state.hostname.length > 0,
    });
  }

  async onSubmit() {
    var res = await fetch('/api/wol', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        hwaddr: this.state.hwaddr,
        hostname: this.state.hostname,
      }),
    });
    if (res.status === 401) {
      return this.props.onUnauthorized();
    }
    console.log('created wol device');
    this.setState({creating: false, hwaddr: '', name: '', hostname: '', maySubmit: false});
  }

  render() {
    return this.state.creating
      ? (
        <Grid>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder='Name' value={this.state.name} onInput={e => this.onNameInput(e.target.value)} />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Hostname</label>
                  <input placeholder='hostname.lan' value={this.state.hostname} onInput={e => this.onHostnameInput(e.target.value)} />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Hardware Address</label>
                  <input placeholder='00:11:22:33:44:55' value={this.state.hwaddr} />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button fluid primary disabled={!this.state.maySubmit} type='submit' onClick={() => this.onSubmit()}>Add</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid onClick={() => this.setState({creating: false})}>Cancel</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
      : (<Button onClick={() => this.setState({creating: true})}>Add new device</Button>);
  }
}

export default AddWakeupDeviceForm;
