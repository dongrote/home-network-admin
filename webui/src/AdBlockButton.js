import React, {Component} from 'react';
import {Button, Icon} from 'semantic-ui-react';

const timeRemainingString = target => {
  const now = new Date();
  const secondsRemaining = Math.floor((target - now) / 1000);
  if (secondsRemaining <= 0) {
    return '0:00';
  }
  const minutes = Math.floor(secondsRemaining / 60),
    seconds = secondsRemaining % 60,
    secondsString = seconds > 9 ? `${seconds}` : `0${secondsRemaining}`;
  return `${minutes}:${secondsString}`;
};

class AdBlockButton extends Component {
  state = {icon: 'shield', loading: false, countdownString: ''};
  timeStepTimeout = null;

  async onClick() {
    this.setState({loading: true});
    var res = await fetch('/api/pihole/disable');
    const newState = {loading: false};
    if (!res.ok) {
      newState.icon = 'warning sign';
    }
    this.setState(newState);
  }

  timeStep() {
    const countdownString = timeRemainingString(this.props.enableAt);
    this.setState({countdownString});
    setTimeout(() => this.timeStep(), 1000);
  }

  componentDidMount() {
    this.timeStep();
  }

  render() {
    return (
      <Button
        primary
        icon
        labelPosition='left'
        disabled={this.props.disabled}
        fluid={this.props.fluid}
        loading={this.state.loading}
        onClick={() => this.onClick()}
      >
        <Icon name={this.state.icon}/>
        {this.props.disabled ? `Ad Blocker Disabled (${this.state.countdownString})` : 'Disable Ad Blocker'}
      </Button>
    );
  }
}

export default AdBlockButton;
