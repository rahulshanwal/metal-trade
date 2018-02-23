import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Redirect } from 'react-router-dom';

import Input from '../../components/UI/InputFields/InputFields';
import RaisedButton from 'material-ui/RaisedButton';
import Loader from '../../components/UI/Loader/Loader';
import classes from './Auth.css';
import * as AuthActions from '../../Store/action/authActions';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    hintText: 'Mail Address'
                },
                value: '',
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    hintText: 'Password'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false
            }
        },
        formIsValid: false,
        isSignup: false
    }

    checkValidity ( value, rules ) {
        let isValid = true;
        if ( !rules ) {
            return true;
        }

        if ( rules.required ) {
            isValid = value.trim() !== '' && isValid;
        }

        if ( rules.minLength ) {
            isValid = value.length >= rules.minLength && isValid
        }

        if ( rules.maxLength ) {
            isValid = value.length <= rules.maxLength && isValid
        }

        if ( rules.isEmail ) {
            const pattern = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
            isValid = pattern.test( value ) && isValid
        }

        if ( rules.isNumeric ) {
            const pattern = /^[0-9]*[.][0-9]+$/;
            isValid = pattern.test( value ) && isValid
        }

        return isValid;
    }

    inputChangedHandler = ( event, controlName ) => {
        const updatedControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity( event.target.value, this.state.controls[controlName].validation ),
                touched: true
            }
        };
        let formIsValid = true;
        for (let identifier in updatedControls) {
            formIsValid = updatedControls[identifier].valid && formIsValid;
            if(!updatedControls[identifier].valid && updatedControls[identifier].touched) {
                updatedControls[identifier].elementConfig.errorText = 'Invalid value';
            }else{
                updatedControls[identifier].elementConfig.errorText = null;
            }
        }
        this.setState( { controls: updatedControls, formIsValid: formIsValid } );
    }

    submitHandler = ( event ) => {
        event.preventDefault();
        this.props.onAuth( this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup );
    }

    switchAuthModeHandler = () => {
        this.setState(prevState => {
            return {isSignup: !prevState.isSignup};
        });
    }

    render () {
        const formElementsArray = [];
        for ( let key in this.state.controls ) {
            formElementsArray.push( {
                id: key,
                config: this.state.controls[key]
            } );
        }

        let form = formElementsArray.map( formElement => (
            <Input
                key={formElement.id}
                elementType={formElement.config.elementType}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                invalid={!formElement.config.valid}
                shouldValidate={formElement.config.validation}
                touched={formElement.config.touched}
                changed={( event ) => this.inputChangedHandler( event, formElement.id )} />
        ) );

        if (this.props.loading) {
            form = <Loader show={true}/>
        }

        let errorMessage = null;

        if (this.props.error) {
            errorMessage = (
                <p className={classes.ErrorMessage}>{this.props.error.message}</p>
            );
        }

        let authRedirect = null;
        if (this.props.isAuthenticated) {
            authRedirect = <Redirect to={this.props.authRedirectPath}/>
        }
        let switchLabel = `SWITCH TO ${this.state.isSignup ? 'SIGNIN' : 'REGISTER'}`;
        let submitLabel = this.state.isSignup ? 'REGISTER' : 'SIGN IN';
        const style = {
            margin: 5,
            width: 200
          };

        return (
            <div className={classes.Auth}>
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler}>
                    {form}
                    <RaisedButton type={'submit'} primary={true} label={submitLabel} 
                        style={style} disabled={!this.state.formIsValid}/>
                </form>
                <RaisedButton 
                    onClick={this.switchAuthModeHandler} style={style}
                    label={switchLabel} secondary={true}/>
            </div>
        );
    }
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !== null,
        authRedirectPath: state.auth.authRedirectPath
    };
};

const mapDispatchToProps = dispatch => {
    return {
        onAuth: ( email, password, isSignup ) => dispatch( AuthActions.auth( email, password, isSignup ) ),
        onSetAuthRedirectPath: () => dispatch(AuthActions.setAuthRedirectPath('/trades'))
    };
};

export default connect( mapStateToProps, mapDispatchToProps )( Auth );