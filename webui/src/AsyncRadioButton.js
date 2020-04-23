import React, { Component } from 'react';
import {Radio} from 'semantic-ui-react';

class AsyncRadioButton extends Component {
  state = {loading: false};

  click() {
    this.setState({loading: true});
    this.props.onClick()
      .then(() => this.setState({loading: false}));
  }

  render() {
    return <Radio
      toggle
      onClick={() => this.click()}
      indeterminate={this.state.loading}
      label={this.state.loading ? 'Working ...' : this.props.label}
      checked={this.props.checked}
    />;
  }
}

export default AsyncRadioButton;
