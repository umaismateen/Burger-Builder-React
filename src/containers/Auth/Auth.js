import React, { Component } from 'react';
import {connect} from 'react-redux';
import {Redirect} from 'react-router-dom';

import Spinner from '../../components/UI/Spinner/Spinner';
import Input from '../../components/UI/Input/Input';
import Button from '../../components/UI/Button/Button';
import classes from './Auth.css';
import * as actions from '../../store/actions/index';

class Auth extends Component {
    state = {
        controls: {
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'E-mail'
                },
                value: '',
                validation: {
                    required: true,
                },
                valid: false,
                touched: false,
            },
            password: {
                elementType: 'input',
                elementConfig: {
                    type: 'password',
                    placeholder: 'Password (min-Length: 6)'
                },
                value: '',
                validation: {
                    required: true,
                    minLength: 6
                },
                valid: false,
                touched: false,
                isSignup: true,
            },
        }
    }
    componentDidMount(){
        if(!this.props.buildingBurger && this.props.authRedirectPath !=='/' ){
            this.props.onSetAuthRedirectPath();
        }
    }

    checkValidity(value, rules) {
        let isValid = true;
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }

        if (rules.minLength) {
            isValid = value.length >= rules.minLength && isValid;
        }

        if (rules.maxLength) {
            isValid = value.length <= rules.maxLength && isValid;
        }


        return isValid;
    }

    inputChangeHandler = (event, controlName) => {
        const updateControls = {
            ...this.state.controls,
            [controlName]: {
                ...this.state.controls[controlName],
                value: event.target.value,
                valid: this.checkValidity(event.target.value, this.state.controls[controlName].validation),
                touched: true,
            }
        };
        this.setState({ controls: updateControls });
    }

    submitHandler = (event) => {
        event.preventDefault();
        this.props.onAuth(this.state.controls.email.value, this.state.controls.password.value, this.state.isSignup);
    }

    switchAuthModeHandler = () => {
        this.setState(prevState=>{
            return { isSignup: !prevState.isSignup };
        })
    }

    render() {
        const formElementsArray = [];
        for (let key in this.state.controls) {
            formElementsArray.push({
                id: key,
                config: this.state.controls[key],
            });
        }

        let form = formElementsArray.map(formElement => (
            <Input
                key={formElement.id}
                changed={(event) => this.inputChangeHandler(event, formElement.id)}
                invalid={!formElement.config.valid}
                touched={formElement.config.touched}
                shouldValidate={formElement.config.validation}
                elementConfig={formElement.config.elementConfig}
                value={formElement.config.value}
                elementType={formElement.config.elementType}
            />
        ))

         let authRedirect = null;
         if( this.props.isAuthenticated){
          authRedirect = < Redirect to={this.props.authRedirectPath} />
         }

        if(this.props.loading){
            form= <Spinner/>
        }

        let errorMessage = null;
        if(this.props.error){
            errorMessage=(
                <p style={{color: "red"}} >{this.props.error.message}</p>
            )
        }

        return (
            <div className={classes.Auth} >
                {authRedirect}
                {errorMessage}
                <form onSubmit={this.submitHandler} >
                    {form}
                    <Button btnType="Success" >{this.state.isSignup ? 'Sign In' : 'Sign Up'}</Button>
                </form>
                <Button 
                clicked={this.switchAuthModeHandler}
                btnType="Danger" >
                    SWITCH TO {this.state.isSignup ? 'SIGN UP' :'SIGN IN'}</Button>
            </div>
        );
    }
}

const mapStateToProps= state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuthenticated: state.auth.token !==null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath,
    }
}

const mapDispatchToProps =dispatch => {
    return {
        onAuth: (email, password, isSignUp) => dispatch(actions.auth(email, password, isSignUp)),
        onSetAuthRedirectPath: ()=>dispatch(actions.setAuthRedirectPath('/')),
    }
}

export default connect(mapStateToProps,mapDispatchToProps)(Auth);