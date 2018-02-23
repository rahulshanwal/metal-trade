import React, { Component } from 'react';
import MuiThemeProvider from 'material-ui/styles/MuiThemeProvider';
import { Route, Switch, withRouter, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import Home from './containers/Home/Home';
import Auth from './containers/Auth/Auth';
import * as AuthActions from './Store/action/authActions';
import Logout from './containers/Auth/Logout/Logout';


class App extends Component {
  componentDidMount () {
    this.props.onTryAutoSignup();
  }

  render() {
    return (
      <MuiThemeProvider>
        <Switch>
          <Route path="/trades" component={Home} />
          <Route path="/" exact component={Auth} />
          <Route path="/logout" component={Logout} />
          <Redirect to="/" />
        </Switch>
      </MuiThemeProvider>
    );
  }
}

const mapDispatchToProps = dispatch => {
  return {
    onTryAutoSignup: () => dispatch( AuthActions.authCheckState() )
  };
};

export default withRouter(connect( null, mapDispatchToProps )( App ));