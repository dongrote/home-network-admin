import React from 'react';
import AsyncRadioButton from './AsyncRadioButton';

const sleepTimeInSeconds = 30;
const promiseSleep = s => new Promise(resolve => setTimeout(() => resolve(), s * 1000));

const wakeUpTarget = mac => fetch(`/api/wol/?mac=${encodeURIComponent(mac)}`)
  .then(res => res.status === 401 ? res : promiseSleep(sleepTimeInSeconds).then(() => res));

export default props => (
  <AsyncRadioButton
    disabled={props.online}
    onClick={props.online ? undefined : () => wakeUpTarget(props.mac)
      .then(res => res.status === 401 ? props.onUnauthorized() : null)}
    checked={props.online}
    label={props.online ? 'On' : 'Off'}
  />
);
