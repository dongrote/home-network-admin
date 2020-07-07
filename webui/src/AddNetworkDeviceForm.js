import React, {Component} from 'react';
import {Button, Grid, Form} from 'semantic-ui-react';
import HostnameInput from './HostnameInput';

class AddNetworkDeviceForm extends Component {
  state = {
    creating: false,
    name: '',
    hostname: '',
    validHostname: false,
    maySubmit: false,
  };

  onNameInput(input) {
    this.setState({
      name: input,
      maySubmit: this.state.validHostname && input.length > 0,
    });
  }

  onHostnameInput(hostname, valid) {
    this.setState({
      hostname,
      validHostname: valid,
      maySubmit: this.state.name.length > 0 && valid,
    });
  }

  async onSubmit() {
    var res = await fetch('/api/devices', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({name: this.state.name, hostname: this.state.hostname}),
    });
    if (res.status === 401) {
      return this.props.onUnauthorized();
    }
    this.setState({creating: false});
  }

  render() {
    return this.state.creating
      ? (
        <Grid textAlign='left'>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Name</label>
                  <input placeholder='Name' onInput={e => this.onNameInput(e.target.value)} value={this.state.name} />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Hostname</label>
                  <HostnameInput onValidateHostname={(hostname, valid) => this.onHostnameInput(hostname, valid)}/>
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
      : (<Button fluid onClick={() => this.setState({creating: true})}>Add new device</Button>);
  }
}

export default AddNetworkDeviceForm;
