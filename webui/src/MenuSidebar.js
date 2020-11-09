import React from 'react';
import {Menu, Sidebar, Icon} from 'semantic-ui-react';

export default props => (
  <Sidebar
    as={Menu}
    animation='uncover'
    direction='right'
    width='thin'
    visible={props.visible}
    vertical
  >
    <Menu.Item as='a' active color={props.authenticated ? 'green' : 'red'} onClick={() => props.onClick('auth')}>
      <Icon name={props.authenticated ? 'lock' : 'unlock'}/>
      {`Authenticate${props.authenticated ? 'd' : ''}`}
    </Menu.Item>
    <Menu.Item as='a' onClick={() => props.onClick('devices')}>
      <Icon name='computer'/>
      Devices
    </Menu.Item>
    <Menu.Item as='a' onClick={() => props.onClick('power')}>
      <Icon name='power'/>
      Power
    </Menu.Item>
    <Menu.Item as='a' onClick={() => props.onClick('throttle')}>
      <Icon name='dashboard'/>
      Throttle
    </Menu.Item>
    <Menu.Item as='a' onClick={() => props.onClick('system')}>
      <Icon name='thermometer half'/>
      System
    </Menu.Item>
    <Menu.Item as='a' onClick={() => props.onClick('new-system')}>
      <Icon name='thermometer full'/>
      New System
    </Menu.Item>
    {props.authenticated && <Menu.Item as='a' onClick={() => props.onClick('qrcode')}>
      <Icon name='qrcode'/>
      QR Code
    </Menu.Item>}
    {props.authenticated && <Menu.Item as='a' onClick={() => props.onClick('token')}>
      <Icon name='key'/>
      API Token
    </Menu.Item>}
    <Menu.Item as='a' onClick={() => window.location.reload()}>
      <Icon name='redo'/>
      Refresh
    </Menu.Item>
  </Sidebar>
);