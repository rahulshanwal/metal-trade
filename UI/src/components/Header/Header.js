import React from 'react';
import AppBar from 'material-ui/AppBar';
import UserName from '../UI/Username/Username'

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const Header = () => (
  <AppBar
    style={{marginTop: 30}}
    title="TRADES" 
    showMenuIconButton={false}>
    <UserName />
  </AppBar>
);

export default Header;