import React, { Component } from 'react';
import {Button} from 'semantic-ui-react';

class AsyncButton extends Component {
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
    return (
      <Button
        fluid={this.props.fluid}
        icon={this.props.icon}
        primary={this.props.primary}
        submit={this.props.submit}
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
