import React, { Component } from 'react';
import { loginWithGithub } from '../backend';

export class Login extends Component {
  constructor(props) {
    super(props);
    this.handleGithubLogin = this.handleGithubLogin.bind(this);
    this.state = {
      hasErrors: false,
      error: null,
    };
  }

  handleGithubLogin(e) {
    e.preventDefault();
    loginWithGithub().catch(err => this.handleAuthError(err));
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
              <div className="row center-xs">
                <div className="col-xs-12">
                  <button onClick={this.handleGithubLogin} className="btn btn-default btn-block">
                    <i className="fa fa-github" /> log in with Github
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
