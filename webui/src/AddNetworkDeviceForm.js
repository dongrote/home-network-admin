import React, {Component} from 'react';
import {Button, Grid, Form} from 'semantic-ui-react';

class AddNetworkDeviceForm extends Component {
  state = {
    creating: false,
    name: '',
    hostname: '',
    maySubmit: false,
  };

  onNameInput(input) {
    this.setState({
      name: input,
      maySubmit: this.state.hostname.length > 0 && input.length > 0,
    });
  }

  onHostnameInput(input) {
    this.setState({
      hostname: input.toLowerCase(),
      maySubmit: this.state.name.length > 0 && input.length > 0,
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
        <Grid columns='equal' textAlign='left'>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' onInput={e => this.onNameInput(e.target.value)} value={this.state.name} />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Hostname</label>
                <input placeholder='hostname.lan' onInput={e => this.onHostnameInput(e.target.value)} value={this.state.hostname} />
              </Form.Field>
            </Form>
          </Grid.Column>
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

export default AddNetworkDeviceForm;
