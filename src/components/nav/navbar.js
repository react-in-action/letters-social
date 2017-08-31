import React from 'react';
import { connect } from 'react-redux';
import { logout } from '../../actions/auth';
import Link from '../router/Link';
import Logo from './Logo';

const Navigation = ({ user, handleLogout }) => (
    <nav className="navbar navbar-default navbar-fixed-top">
        <div className="container">
            <div className="row middle-xs center-xs around-xs">
                <div className="col-sm-4 col-sm-offset-4 col-xs-8">
                    <Logo logoOnly={false} />
                </div>
                <div className="col-sm-4 col-xs-4">
                    {user.authenticated ? (
                        <span className="user-nav-widget">
                            <span>{user.name}</span>
                            <img
                                width={40}
                                className="img-circle"
                                src={user.avatar}
                                alt={user.name}
                            />
                            <i onClick={handleLogout} className="fa fa-sign-out" />
                        </span>
                    ) : (
                        <div>
                            <Link to="/login">
                                <button type="button" className="btn btn-default">
                                    Log in or sign up
                                </button>
                            </Link>
                        </div>
                    )}
                </div>
            </div>
        </div>
    </nav>
);

export default connect(
    state => ({ user: state.user }),
    dispatch => ({
        handleLogout() {
            dispatch(logout());
        }
    })
)(Navigation);
