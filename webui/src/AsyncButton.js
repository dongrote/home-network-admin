import React, { Component } from 'react';
import {Button, Icon} from 'semantic-ui-react';

class AsyncButton extends Component {
  constructor(props) {
    super(props);
    this.state = {loading: false, disabled: false, error: props.error || false};
  }

  click() {
    this.setState({loading: true, disabled: true});
    this.props.onClick()
      .then(() => this.setState({loading: false, disabled: false}))
      .catch(() => this.setState({error: true, disabled: true}));
  }

  render() {
    return this.state.error
      ? (<Button icon negative size={this.props.size} disabled><Icon name='warning sign'/>Error</Button>)
      : (
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
