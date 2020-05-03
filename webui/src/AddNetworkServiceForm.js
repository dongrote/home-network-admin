import React, {Component} from 'react';
import {Button, Input, Icon, Grid, Form} from 'semantic-ui-react';

class AddNetworkServiceForm extends Component {
  state = {
    creating: false,
    name: '',
    icon: '',
    domain: '',
    color: '',
    validateIcon: null,
    maySubmit: false,
  };
  domainTimeout = null;

  validDomain() {
    return this.state.validateIcon === 'check circle outline';
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

  async validateDomain() {
    if (this.state.domain.length === 0) return;
    var res = await fetch(`/api/services/validate?domain=${encodeURIComponent(this.state.domain)}`);
    if (res.ok) {
      var json = await res.json();
      this.setState({
        validateIcon: json.valid ? 'check circle outline' : 'times circle outline',
        validateIconColor: json.valid ? 'green' : 'red',
        maySubmit: this.validName() && json.valid && this.validColor() && this.validIcon(),
      });
    }
  }

  onDomainInput(value) {
    if (this.domainTimeout) {
      clearTimeout(this.domainTimeout);
      this.domainTimeout = null;
    }
    this.setState({
      domain: value,
      validateIcon: null,
      maySubmit: false,
    });
    this.domainTimeout = setTimeout(() => this.validateDomain(), 1000);
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
                  <Input iconPosition='right'>
                    <input
                      placeholder='service.com'
                      value={this.state.domain}
                      onInput={e => this.onDomainInput(e.target.value)}
                    />
                    {this.state.validateIcon && <Icon color={this.state.validateIconColor} name={this.state.validateIcon}/>}
                  </Input>
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
