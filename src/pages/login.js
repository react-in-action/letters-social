import React, { Component } from 'react';
import { connect } from 'react-redux';
import { login } from '../actions/auth';
import { providers } from '../constants/types';
import Welcome from '../components/welcome/Welcome';

export class Login extends Component {
    render() {
        const { handleLogin } = this.props;
        return (
            <div className="login">
                <div className="welcome-container">
                    <Welcome />
                </div>
                <div className="providers">
                    {providers.map(provider => (
                        <button
                            key={provider}
                            onClick={this.props.handleLogin.bind(this, provider)}
                        >
                            <i className={`fa fa-${provider.toLowerCase()}`} /> log in with{' '}
                            {provider}
                        </button>
                    ))}
                </div>
            </div>
        );
    }
}

export const mapStateToProps = state => state;
export const mapDispatchToProps = dispatch => ({
    handleLogin(provider) {
        dispatch(login(provider));
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
