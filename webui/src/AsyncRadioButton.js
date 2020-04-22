import React, { Component } from 'react';
import {Radio, Loader} from 'semantic-ui-react';

class AsyncRadioButton extends Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: false,
      disabled: props.disabled || false,
    };
  }

  click() {
    this.setState({loading: true, disabled: true});
    this.props.onClick()
      .then(() => this.setState({loading: false, disabled: false}));
  }

  render() {
    return <Radio
      toggle
      onClick={() => this.click()}
      label={this.state.loading ? 'Working ...' : this.props.label}
      defaultChecked={this.props.defaultChecked}
    />;
  }
}

export default AsyncRadioButton;
