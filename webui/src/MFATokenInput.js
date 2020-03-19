import React, {Component} from 'react';
import {Form, Button} from 'semantic-ui-react';

class MFATokenInput extends Component {
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

  render() {
    return (
      <Form>
        <Form.Field>
          <label>Token</label>
          <input type='tel' placeholder='- - -  - - -' value={this.state.token} onKeyDown={event => this.updateTokenInput(event.keyCode)} onPaste={event => this.onTokenPaste(event)} />
        </Form.Field>
        <Button type='submit' disabled={this.state.token.length !== 6} onClick={() => this.onSubmitClick()} >Submit</Button>
      </Form>
    );
  }
}

export default MFATokenInput;
