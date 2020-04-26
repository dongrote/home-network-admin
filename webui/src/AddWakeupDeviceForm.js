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

  onNameInput(value) {
    this.setState({
      name: value,
      maySubmit: this.state.hwaddr.length > 0 && value.length > 0 && this.state.hostname.length > 0,
    });
  }

  onHardwareAddressInput(value) {
    const lowercase = value.toLowerCase();
    let stripped = '';
    for (var i = 0; i < lowercase.length; i++) {
      const c = lowercase[i];
      if ((c >= '0' && c <= '9') || (c >= 'a' && c <= 'f') || (c === ':')) {
        stripped += c;
      }
    }
    this.setState({
      hwaddr: stripped.slice(0, 17),
      maySubmit: this.state.name.length > 0 && this.state.hostname.length > 0 && stripped.length > 0,
    });
  }

  onHostnameInput(input) {
    this.setState({
      hostname: input.toLowerCase(),
      maySubmit: this.state.name.length > 0 && this.state.hwaddr.length > 0 && input.length > 0,
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
    this.setState({creating: false});
  }

  render() {
    return this.state.creating
      ? (
        <Grid columns='equal'>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' value={this.state.name} onInput={e => this.onNameInput(e.target.value)} />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Hardware Address</label>
                <input placeholder='00:11:22:33:44:55' value={this.state.hwaddr} onInput={e => this.onHardwareAddressInput(e.target.value)} />
              </Form.Field>
            </Form>
          </Grid.Column>
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
