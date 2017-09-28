import React from 'react';
import PropTypes from 'prop-types';

import Link from '../router/Link';
import Logo from './logo';
import { logUserOut } from '../../backend/auth';

/**
 * App navigation
 * @method Navigation
 * @param  {Object}   props
 * @param  {Object}   props.user         user object
 * @param  {Function} props.handleLogout logout action
 */
export const Navigation = ({ user }) => (
    <nav className="navbar">
        <Logo />
        {user.authenticated ? (
            <span className="user-nav-widget">
                <span>{user.name}</span>
                <img width={40} className="img-circle" src={user.profilePicture} alt={user.name} />
                <span onClick={() => logUserOut()}>
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

Navigation.propTypes = {
    user: PropTypes.shape({
        name: PropTypes.string,
        authenticated: PropTypes.bool,
        profilePicture: PropTypes.string
    }).isRequired
};

export default Navigation;
