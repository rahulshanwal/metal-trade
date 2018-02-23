import React from 'react';
import AppBar from 'material-ui/AppBar';
import RightElements from './RightElements';

const style = {
    color: 'white',
    height: '35px',
    paddingLeft: '5px'
}

const titleStyle = {
    fontSize: 16,
    lineHeight: '35px'
}

/**
 * A simple example of `AppBar` with an icon on the right.
 * By default, the left icon is a navigation-menu.
 */
const TradeHeader = (props) => (
  <AppBar
    title= {`Trade ID : ${props.tradeId}`} 
    showMenuIconButton={false}
    style= {style}
    titleStyle = {titleStyle}
    iconElementRight={<RightElements onDelete={props.onDelete} changeEditMode={props.changeEditMode}/>}>
  </AppBar>
);

export default TradeHeader;