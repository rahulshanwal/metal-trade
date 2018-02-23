import React from 'react';
import classes from './Username.css';
import Aux from '../../../hoc/Auxiliary/Auxiliary';
import FloatingActionButton from 'material-ui/FloatingActionButton';
import ContentAdd from 'material-ui/svg-icons/social/person';
import {Link} from 'react-router-dom';
import FlatButton from 'material-ui/FlatButton';

const style = {
  height: 56,
  marginLeft: 10,
  marginRight: 20,
  marginTop: 3
};
const logoutButtonStyle = {
  color: 'white',
  margin: 'auto'
};
const UserName = (props) => {
    return (
    <Aux>
        <div className={classes.username}>{props.children}</div>
        <FlatButton label="Logout" style={logoutButtonStyle}>
          <Link to='/logout' className={classes.Logout}></Link>
        </FlatButton>
        <FloatingActionButton style={style}>
          <ContentAdd />
        </FloatingActionButton>
    </Aux>);
}

export default UserName;