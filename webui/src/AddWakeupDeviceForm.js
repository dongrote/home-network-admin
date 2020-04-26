import React, {Component} from 'react';
import {Button, Input, Dropdown, Grid, Form} from 'semantic-ui-react';

class AddWakeupDeviceForm extends Component {
  state = {
    creating: false,
    name: null,
    icon: null,
    hostname: null,
    maySubmit: false,
  };

  onNameInput(value) {
    this.setState({
      name: input,
      maySubmit: this.state.hostname.length > 0 && input.length > 0,
    });
  }

  onHardwareAddressInput() {
    this.setState({
      hostname: input.toLowerCase(),
      maySubmit: this.state.name.length > 0 && input.length > 0,
    });
  }

  onSubmit() {

  }

  render() {
    return this.state.creating
      ? (
        <Grid columns='equal'>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Name</label>
                <input placeholder='Name' />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Column>
            <Form>
              <Form.Field>
                <label>Hardware Address</label>
                <input placeholder='00:11:22:33:44:55' />
              </Form.Field>
            </Form>
          </Grid.Column>
          <Grid.Row columns={2}>
            <Grid.Column>
              <Button fluid primary disabled={!this.state.maySubmit} type='submit'>Add</Button>
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
