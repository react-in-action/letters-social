import React, { Component } from 'react';

import Welcome from '../components/welcome/Welcome';
import { history } from '../history';
import { firebase, loginWithGithub } from '../backend';

export default class Login extends Component {
    constructor(props) {
        super(props);
        this.handleGithubLogin = this.handleGithubLogin.bind(this);
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => {
            // if a user is logged in or just finished loggin in,
            // we can navigate to the main page
            if (user) {
                history.push('/');
            }
        });
    }
    handleGithubLogin(evt) {
        evt.preventDefault();
        loginWithGithub();
    }
    render() {
        return (
            <div className="container">
                <div className="row middle-xs">
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                        <Welcome />
                        <br />
                    </div>
                </div>
                <div className="row">
                    <div className="col-xs-12 col-sm-6 col-sm-offset-3">
                        <form>
                            <div className="row center-xs">
                                <div className="col-xs-12">
                                    <button
                                        onClick={this.handleGithubLogin}
                                        className="btn btn-default btn-block"
                                    >
                                        <i className="fa fa-github" />
                                        {' '}
                                        log in with Github
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
