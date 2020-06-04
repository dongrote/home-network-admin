import React, { Component } from 'react';
import { Radio, Icon } from 'semantic-ui-react';

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
      disabled={this.props.disabled}
      onClick={this.props.onClick ? () => this.click() : undefined}
      indeterminate={this.state.loading}
      label={this.state.loading ? {children: <Icon name='spinner' loading />} : this.props.label}
      checked={this.props.checked}
    />;
  }
}

export default AsyncRadioButton;
