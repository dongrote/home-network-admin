import React, {Component} from 'react';
import {Button, Input, Icon, Grid, Form} from 'semantic-ui-react';
import HostnameInput from './HostnameInput';

class AddNetworkServiceForm extends Component {
  state = {
    creating: false,
    name: '',
    icon: '',
    domain: '',
    color: '',
    validDomain: false,
    validateIcon: null,
    maySubmit: false,
  };

  validDomain() {
    return this.state.validDomain;
  }

  validName() {
    return this.state.name.length > 0;
  }

  validIcon() {
    return this.state.icon.length > 0;
  }

  validColor() {
    return this.state.color.length > 0;
  }

  onNameInput(value) {
    this.setState({
      name: value,
      maySubmit: value.length > 0 && this.validDomain() && this.validIcon() && this.validColor(),
    });
  }

  onIconInput(value) {
    this.setState({
      icon: value.toLowerCase(),
      maySubmit: value.length > 0 && this.validColor() && this.validDomain() && this.validName(),
    });
  }

  onColorInput(value) {
    this.setState({
      color: value.toLowerCase(),
      maySubmit: value.length > 0 && this.validIcon() && this.validDomain() && this.validName(),
    });
  }

  onDomainInput(domain, valid) {
    this.setState({
      domain,
      validDomain: valid,
      maySubmit: this.validName() && this.validColor() && this.validIcon() && valid
    });
  }

  async onSubmit() {
    var res = await fetch('/api/services', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify({
        name: this.state.name,
        icon: this.state.icon,
        color: this.state.color,
        domain: this.state.domain,
      })
    });
    if (res.status === 401) {
      return this.props.onUnauthorized();
    }
    this.setState({
      maySubmit: false, name: '', icon: '', color: '', domain: '', creating: false
    });
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
                  <input
                    placeholder='Service Name'
                    value={this.state.name}
                    onInput={e => this.onNameInput(e.target.value)}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Domain</label>
                  <HostnameInput
                    placeholder='service.com'
                    onValidateHostname={(domain, valid) => this.onDomainInput(domain, valid)}
                  />
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='equal'>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Icon</label>
                  <Input iconPosition='right'>
                    <input placeholder='computer' value={this.state.icon} onInput={e => this.onIconInput(e.target.value)} />
                    <Icon name={this.state.icon.length > 0 ? this.state.icon : 'question circle outline'} />
                  </Input>
                </Form.Field>
              </Form>
            </Grid.Column>
            <Grid.Column>
              <Form>
                <Form.Field>
                  <label>Color</label>
                  <Input iconPosition='right'>
                    <input placeholder='black' value={this.state.color} onInput={e => this.onColorInput(e.target.value)} />
                    <Icon name='square' color={this.state.color} />
                  </Input>
                </Form.Field>
              </Form>
            </Grid.Column>
          </Grid.Row>
          <Grid.Row columns='equal'>
            <Grid.Column>
              <Button fluid primary disabled={!this.state.maySubmit} onClick={() => this.onSubmit()}>Add</Button>
            </Grid.Column>
            <Grid.Column>
              <Button fluid onClick={() => this.setState({creating: false})}>Cancel</Button>
            </Grid.Column>
          </Grid.Row>
        </Grid>
      )
      : (<Button onClick={() => this.setState({creating: true})}>Add new service</Button>);
  }
}

export default AddNetworkServiceForm;
