import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class AsyncButton extends Component {
  state = {loading: false, disabled: false};

  click() {
    this.setState({loading: true, disabled: true});
    this.props.onClick()
      .then(() => this.setState({loading: false, disabled: false}));
  }

  render() {
    return (
      <Button
        icon={this.props.icon}
        color={this.props.color}
        negative={this.props.negative}
        positive={this.props.positive}
        size={this.props.size}
        loading={this.state.loading}
        disabled={this.state.disabled}
        onClick={() => this.click()}
      >
        {this.props.children}
      </Button>
    );
  }
}

export default AsyncButton;
