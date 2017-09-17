import React from 'react';
import { connect } from 'react-redux';

import { logout } from '../../actions/auth';
import Link from '../router/Link';
import Logo from './logo';

/**
 * App navigation
 * @method Navigation
 * @param  {Object}   props
 * @param  {Object}   props.user         user object
 * @param  {Function} props.handleLogout logout action
 */
export const Navigation = ({ user, handleLogout }) => (
    <nav className="navbar">
        <Logo logoOnly={false} />
        {user.authenticated ? (
            <span className="user-nav-widget">
                <span>{user.name}</span>
                <img width={40} className="img-circle" src={user.profilePicture} alt={user.name} />
                <span onClick={handleLogout}>
                    <i className="fa fa-sign-out" />
                </span>
            </span>
        ) : (
            <Link to="/login">
                <button type="button">Log in or sign up</button>
            </Link>
        )}
    </nav>
);
export const mapStateToProps = state => ({ user: state.user });
export const mapDispatchToProps = dispatch => ({
    handleLogout() {
        dispatch(logout());
    }
});
export default connect(mapStateToProps, mapDispatchToProps)(Navigation);
