import React, { Component } from 'react';

import { history } from '../history';
import { loginWithGithub } from '../backend/auth';
import { providers } from '../constants/types';
import Welcome from '../components/welcome/Welcome';

export class Login extends Component {
    constructor(props) {
        super(props);
        this.login = this.login.bind(this);
    }
    login() {
        loginWithGithub().then(() => {
            history.push('/');
        });
    }
    render() {
        return (
            <div className="login">
                <div className="welcome-container">
                    <Welcome />
                </div>
                <div className="providers">
                    {providers.map(provider => (
                        <button key={provider} onClick={this.login}>
                            <i className={`fa fa-${provider.toLowerCase()}`} /> log in with{' '}
                            {provider}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export default Login;
