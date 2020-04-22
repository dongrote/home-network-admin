import React, {Component, createRef } from 'react';
import {Card, Grid, Form, Input, Button, Segment} from 'semantic-ui-react';
import AsyncButton from './AsyncButton';

class MFATokenInput extends Component {
  inputRef = createRef();
  state = {token: ''};

  updateTokenInput(keyCode) {
    let token;
    if (keyCode === 8) {
      /* backspace */
      token = this.state.token.slice(0, this.state.token.length - 1);
    } else if (keyCode >= 96 && keyCode <= 105) {
      /* number pad */
      token = `${this.state.token}${keyCode - 96}`;
    } else if (keyCode >= 48 && keyCode <= 57) {
      /* number row */
      token = `${this.state.token}${keyCode - 48}`;
    } else {
      return;
    }
    if (token.length > 6) token = token.slice(0, 6);
    this.setState({token});
  }

  onTokenPaste(event) {
    const paste = (event.clipboardData || window.clipboardData).getData('text');
    let pasteToken = '';
    paste.split('').forEach(c => {
      if (c >= '0' || c <= '9') {
        pasteToken += c;
      }
    });
    this.setState({token: `${this.state.token}${pasteToken}`.slice(0, 6)});
  }

  onSubmitClick() {
    fetch(`/api/auth?token=${this.state.token}`)
      .then(() => this.props.onSubmit())
      .catch(() => this.props.onSubmit());
  }

  componentDidMount() {
    this.inputRef.current.focus();
  }

  render() {
    return (
      <Grid style={{ height: '100vh' }} verticalAlign='middle'>
        <Grid.Column style={{ maxWidth: 450 }}>
        <Card raised>
          <Card.Content>
            <Card.Header>Security Token</Card.Header>
            <Card.Description>
              <Form size='large'>
                <Segment.Group>
                  <Segment>
                    <Input
                      fluid
                      ref={this.inputRef}
                      type='tel'
                      placeholder='- - -  - - -'
                      value={this.state.token}
                      onKeyDown={event => this.updateTokenInput(event.keyCode)}
                      onPaste={event => this.onTokenPaste(event)}
                      icon={{name: 'key', circular: true}}
                    />
                  </Segment>
                  <Segment>
                    <AsyncButton
                      fluid
                      submit
                      primary
                      size='large'
                      onClick={() => this.onSubmitClick()}
                    >
                      Verify
                    </AsyncButton>
                  </Segment>
                  <Segment>
                    <Button fluid size='large' onClick={() => this.props.onCancel()}>
                      Cancel
                    </Button>
                  </Segment>
                </Segment.Group>
              </Form>
            </Card.Description>
          </Card.Content>
        </Card>
        </Grid.Column>
      </Grid>
    );
  }
}

export default MFATokenInput;
