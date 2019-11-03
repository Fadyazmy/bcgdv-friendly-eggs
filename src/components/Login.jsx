import React, { Component } from 'react';
import {
    auth, 
    createUserProfileDocument, 
    signInWithGoogle, 
    signInWithEmailAndPassword,
    sendPasswordResetEmail
} from '../firebase'
import { withRouter } from "react-router-dom";
import styled from 'styled-components';

import { 
    Form
} from 'react-bootstrap'
import { toast } from 'react-toastify';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faGoogle } from '@fortawesome/free-brands-svg-icons';


const LoginSpan = styled.span`
.login-form {
    width: 385px;
    margin: 30px auto;
}
.login-form form {        
    margin-bottom: 15px;
    background: #f7f7f7;
    box-shadow: 0px 2px 2px rgba(0, 0, 0, 0.3);
    padding: 30px;
}
.login-form h2 {
    margin: 0 0 15px;
}
.form-control, .login-btn {
    min-height: 38px;
    border-radius: 2px;
}
.input-group-addon .fa {
    font-size: 18px;
}
.login-btn {
    font-size: 15px;
    font-weight: bold;
}
.social-btn .btn {
    border: none;
    margin: 10px 3px 0;
    opacity: 1;
}
.social-btn .btn:hover {
    opacity: 0.9;
}
.social-btn .btn-primary {
    background: #507cc0;
}
.social-btn .btn-info {
    background: #64ccf1;
}
.social-btn .btn-danger {
    background: #df4930;
}
.or-seperator {
    margin-top: 20px;
    text-align: center;
    border-top: 1px solid #ccc;
}
.or-seperator i {
    padding: 0 10px;
    background: #f7f7f7;
    position: relative;
    top: -11px;
    z-index: 1;
}   
`

class Login extends Component {

    state = {
        email: '', 
        password: '', 
        error: null,
        reset_option: false,
        signup_option: false,
        displayName: ''
    }

  handleChange = event => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };

  handleForgotPassword = event => {
      event.preventDefault()
      const { email } = this.state;

      var actionCodeSettings = {
        url: 'https://friendlyeggsfeedback.firebaseapp.com/',
        handleCodeInApp: true
      }

      sendPasswordResetEmail({email, actionCodeSettings}).then((user) => {
        toast("Password reset email sent", {type: "success"})
        //  this.props.history.push('/');
       }).catch((error) => {
          console.log("sendPasswordResetEmail error: ", error)
         this.setState({ error: error });
       });
  }

  handleSignIn = async event => {
    event.preventDefault();
    const { email, password, displayName, signup_option } = this.state;


    if(signup_option){
        try {
            const { user } = await auth.createUserWithEmailAndPassword(
              email, 
              password
              );
              // user.updateProfile({displayName})
              createUserProfileDocument (user, {displayName}).then((args) =>{
      
                user.sendEmailVerification();
      
                // ONBOARDING
                this.props.history.push('/');
              }).then(() => {
                  toast("Please verify your email.", { type: "warning" })
              });
            } catch (error) {
                if(error === "auth/email-already-in-use"){
                    toast("This email is already in use", {type: "error"})
                    // console.error("auth/email-already-in-use: ", error)
                } 
          }
    } else {
        try { 
            signInWithEmailAndPassword({email, password}).then((ss) => { 

            }).catch((error) => {
                toast("Wrong email or password. Please try again.", {type: 'error'})
                this.setState({ error: error });
             });

        } catch (error) {
            console.log('ERROR: ', error)
            if (error.code === 'auth/wrong-password'){
                toast("Sorry! Invalid password", {type: "error"})
            }
        }
    }
  }

    render(){
        const { 
            email, 
            password, 
            reset_option, 
            signup_option, 
            displayName
        } = this.state;

        return(
            <LoginSpan >
                { 
                    [!reset_option &&
                <div key='login-form' className="login-form">
                <Form onSubmit={this.handleSignIn}>
                    <h2 className="text-center">{signup_option?'Sign up': 'Sign in'}</h2>   
                    <div className="form-group">
                    <div className="input-group">
                        <span className="input-group-addon"><i className="fa fa-user"></i></span>
                        {
                            signup_option && 
                            <input 
                            className="form-control" 
                            required="required"
                            type="text"
                            name="displayName"
                            placeholder="Full Name"
                            value={displayName}
                            onChange={this.handleChange}
                            />
                        }
                    </div>
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input 
                            className="form-control" 
                            required="required"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={this.handleChange}
                            />				
                        </div>
                    </div>
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-lock"></i></span>
                            <input 
                            className="form-control" 
                            required="required"
                            type="password"
                            name="password"
                            placeholder="Password"
                            value={password}
                            onChange={this.handleChange}
                            />				
                        </div>
                    </div>        
                    <div className="form-group">
                        <button type="submit" className="btn btn-primary login-btn btn-block">{signup_option?'Sign up': 'Sign in'}</button>
                    </div>
                    <div className="clearfix">
                        {/** eslint-disable-next-line **/}
                        <a href="#" onClick={() => this.setState({reset_option: true})} className="pull-right">Forgot Password?</a>
                    </div>
                    <div className="or-seperator"><i>or</i></div>
                    <p className="text-center">Login with your social media account</p>
                    <div className="text-center social-btn">
                        
                        <a href="#" onClick={signInWithGoogle} style={{color: 'white'}} className="btn btn-danger"><i className="fa fa-google"></i> <FontAwesomeIcon icon={ faGoogle } style={{color: 'white'}} /> Google</a>
                        
                    </div>
                </Form>
                {!signup_option && <p className="text-center text-muted small">Don't have an account? <a href="#" onClick={() => this.setState({signup_option: true, reset_option: false})}>Sign up here!</a></p>}
                {signup_option && <p className="text-center text-muted small">Have an account? <a href="#" onClick={() => this.setState({signup_option: false, reset_option: false})}>Sign in here!</a></p>}

            </div>,
            
            reset_option && <div key='reset-form' className="login-form">
                <Form onSubmit={this.handleForgotPassword}>
                    <h2 className="text-center">Reset password</h2>   
                    <div className="form-group">
                        <div className="input-group">
                            <span className="input-group-addon"><i className="fa fa-user"></i></span>
                            <input 
                            className="form-control" 
                            required="required"
                            type="text"
                            name="email"
                            placeholder="Email"
                            value={email}
                            onChange={this.handleChange}
                            />				
                        </div>
                    </div>    
                    <div className="form-group">
                        <button 
                            type="submit" 
                            className="btn btn-primary login-btn btn-block"
                            >Forget password</button>
                    </div>
                    <div className="clearfix">
                        <a href="#" onClick={() => this.setState({reset_option: false})} className="pull-right">Back</a>
                    </div>
                </Form>
                <p className="text-center text-muted small">Don't have an account? <a href="#">Sign up here!</a></p>
            </div>]
        }
            </ LoginSpan>
        ) 
    }
}

export default withRouter(Login);
