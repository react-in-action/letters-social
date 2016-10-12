import React, { Component } from 'react';
import { signup, login, loginWithGithub, loginWithGoogle, loginWithTwitter, loginWithFacebook } from '../backend';

export class Login extends Component {
  constructor(props) {
    super(props);

    this.handleEmailChange = this.handleEmailChange.bind(this);
    this.handlePasswordChange = this.handlePasswordChange.bind(this);

    this.handleSignup = this.handleSignup.bind(this);
    this.handleLogin = this.handleLogin.bind(this);

    this.handleGoogleLogin = this.handleGoogleLogin.bind(this);
    this.handleTwitterLogin = this.handleTwitterLogin.bind(this);
    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
    this.handleGithubLogin = this.handleGithubLogin.bind(this);

    this.state = {
      email: '',
      username: '',
      hasErrors: false,
      error: null,
    };
  }
  handleEmailChange(e) {
    this.setState({
      email: e.target.value.trim(),
    });
  }

  handlePasswordChange(e) {
    this.setState({
      password: e.target.value.trim(),
    });
  }

  handleLogin(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      login(email, password)
      .then(() => console.log('logged in!'))
      .catch((error) => {
        this.setState({
          hasErrors: true,
          error,
        });
      });
    }
  }

  handleSignup(event) {
    event.preventDefault();
    const { email, password } = this.state;
    if (email && password) {
      signup(email, password)
      .then(() => console.log('logged in!'))
      .catch(error => this.handleAuthError(error));
    }
  }

  loginWithProvider(provider) {
    provider().catch(err => this.handleAuthError(err));
  }

  handleFacebookLogin(e) {
    e.preventDefault();
    loginWithFacebook().catch(err => this.handleAuthError(err));
  }

  handleGoogleLogin(e) {
    e.preventDefault();
    loginWithGoogle().catch(err => this.handleAuthError(err));
  }

  handleGithubLogin(e) {
    e.preventDefault();
    loginWithGithub().catch(err => this.handleAuthError(err));
  }

  handleTwitterLogin(e) {
    e.preventDefault();
    loginWithTwitter().catch(err => this.handleAuthError(err));
  }

  handleAuthError(error) {
    this.setState({
      hasErrors: true,
      error,
    });
  }

  render() {
    return (
      <div className="container">
        <div className="row middle-xs text-center">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3">
            <h1>Welcome to Letters Social!
              <br />
            </h1>
            <br />
            <p>
              This is a sample app built with <a href="https://facebook.github.io/react/" rel="noopener noreferrer" target="_blank">React</a> for <em>React in Action</em> by me (Mark Thomas). Feel free to sign in with one of the tools below or use an email and password. The app will never post, email, or do anything without your permission, it is just for learning purposes
            </p>
            <br />
          </div>
        </div>
        <div className="row">
          <div className="col-xs-12 col-sm-6 col-sm-offset-3">
            <form>
              <div className="form-group text-left">
                <label htmlFor="email">Email address</label>
                <input
                  className="form-control"
                  value={this.state.email}
                  name="email"
                  onChange={this.handleEmailChange}
                  type="text"
                />
              </div>
              <div className="form-group text-left">
                <label htmlFor="password">Password</label>
                <input
                  className="form-control"
                  value={this.state.password}
                  onChange={this.handlePasswordChange}
                  type="password"
                  name="password"
                />
              </div>

              {
                this.state.hasErrors &&
                  <div role="alert" className="alert alert-danger">
                    <i className="fa fa-times" /> {this.state.error.message}
                  </div>
              }

              <div className="row center-xs">
                <div className="col-xs-12 col-sm-6">
                  <button onClick={this.handleLogin} className="btn btn-success btn-block">
                    Login
                  </button>
                </div>
                <div className="col-xs-12 col-sm-6">
                  <button onClick={this.handleSignup} className="btn btn-default btn-block">
                    signup
                  </button>
                </div>
              </div>

              <br />

              <div className="row center-xs">
                <div className="col-xs-12">
                  <button onClick={this.handleGithubLogin} className="btn btn-default btn-block">
                    <i className="fa fa-github" /> log in with Github
                  </button>
                </div>
              </div>

              <br />

              <div className="row center-xs">
                <div className="col-xs-12 col-md-4">
                  <button style={{ backgroundColor: '#CE0B24', color: '#fff' }} onClick={this.handleGoogleLogin} className="btn btn-default">
                    <i className="fa fa-google" /> log in with Google
                  </button>
                </div>
                <div className="col-xs-12 col-md-4">
                  <button style={{ backgroundColor: '#2AA3EF', color: '#fff' }} onClick={this.handleTwitterLogin} className="btn btn-default">
                    <i className="fa fa-twitter" /> log in with Twitter
                  </button>
                </div>
                <div className="col-xs-12 col-md-4">
                  <button style={{ backgroundColor: '#3c5A96', color: '#fff' }} onClick={this.handleGithubLogin} className="btn btn-default">
                    <i className="fa fa-facebook" /> log in with Facebook
                  </button>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    );
  }
}
