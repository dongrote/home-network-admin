import React, { Component } from 'react';
import { Container, Button, Message, Icon } from 'semantic-ui-react';
import LabeledButtonGroup from './LabeledButtonGroup';

class GenerateApiToken extends Component {
  state = {token: null, loading: false, error: null};

  async onClick() {
    this.setState({loading: true});
    var res = await fetch('/api/auth/apitoken', {method: 'POST'});
    if (res.ok) {
      var json = await res.json();
      this.setState({token: json.token});
    }
    this.setState({loading: false, error: !res.ok});
  }

  render() {
    return (
      <LabeledButtonGroup
        color='red'
        label='API Token'
      >
        {this.state.token ? (
          <Container textAlign='left'>
            <Message success icon>
              <Icon name='key' />
              <Message.Content>
                <Message.Header>API Token</Message.Header>
                <p>Pass this as the value of a cookie named '<tt>jwt</tt>' in HTTP requests:</p>
                <textarea wrap='hard' cols={40} rows={20} readOnly>{this.state.token}</textarea>
              </Message.Content>
            </Message>
          </Container>
        ) : <Button
          basic
          fluid
          primary
          loading={this.state.loading}
          negative={this.state.error === true}
          positive={this.state.error === false}
          disabled={this.state.error === true}
          content={this.state.error ? 'Error' : 'Generate API Token'}
          onClick={() => this.onClick()}
        />}
      </LabeledButtonGroup>
    );
  }
}

export default GenerateApiToken;
