import React, { Component } from 'react';

import { logout, firebase } from '../../backend';
import Link from '../router/Link';
import Logo from './Logo';

class Navigation extends Component {
    constructor(props) {
        super(props);
        this.handleLogout = this.handleLogout.bind(this);
        this.state = {
            user: null
        };
    }
    componentDidMount() {
        firebase.auth().onAuthStateChanged(user => this.setState({ user }));
    }

    handleLogout() {
        logout().then(() => this.setState({ user: null }));
    }

    render() {
        return (
            <nav className="navbar navbar-default navbar-fixed-top">
                <div className="container">
                    <div className="row middle-xs center-xs around-xs">
                        <div className="col-sm-4 col-sm-offset-4 col-xs-8">
                            <Logo logoOnly={false} />
                        </div>
                        <div className="col-sm-4 col-xs-4">
                            {this.state.user
                                ? <div>
                                      <div className="btn-group" role="group">
                                          <button
                                              onClick={this.handleLogout}
                                              className="btn btn-default"
                                          >
                                              <i className="fa fa-sign-out" />
                                          </button>
                                      </div>
                                  </div>
                                : <div>
                                      <Link to="/login">
                                          <button
                                              type="button"
                                              className="btn btn-default"
                                          >
                                              Log in or sign up
                                          </button>
                                      </Link>
                                  </div>}
                        </div>
                    </div>
                </div>
            </nav>
        );
    }
}

export default Navigation;
