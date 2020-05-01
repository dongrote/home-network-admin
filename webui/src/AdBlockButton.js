import React, {Component} from 'react';
import {Button} from 'semantic-ui-react';

class AdBlockButton extends Component {
  state = {icon: 'shield', loading: false};

  async onClick() {
    this.setState({loading: true});
    var res = await fetch('/api/pihole/disable');
    const newState = {loading: false};
    if (!res.ok) {
      newState.icon = 'warning sign';
    }
    this.setState(newState);
  }

  render() {
    return <Button
      primary
      icon={this.state.icon}
      labelPosition='left'
      disabled={this.props.disabled}
      fluid={this.props.fluid}
      content={this.props.disabled ? 'Ad Blocker Disabled' : 'Disable Ad Blocker'}
      loading={this.state.loading}
      onClick={() => this.onClick()}
    />;
  }
}

export default AdBlockButton;
