import fetch from 'isomorphic-fetch';

import * as types from '../constants/types';
import { history } from '../history';
import { createError } from './error';
import { loading, loaded } from './loading';
import { getFirebaseUser, loginWithGithub, logUserOut, getFirebaseToken } from '../backend/auth';

/**
 * Handles the user logging in
 * @method loginSuccess
 * @module letters/actions
 * @param  {object}     user  user object from Firebase
 * @param  {string}     token firebase token, used for SSR
 * @return {object}
 */
export function loginSuccess(user, token) {
    return {
        type: types.auth.AUTH_LOGIN_SUCCESS,
        user,
        token
    };
}

/**
 * Handles logout
 * @method logoutSuccess
 * @module letters/actions
 * @return {object}
 */
export function logoutSuccess() {
    return {
        type: types.auth.AUTH_LOGOUT_SUCCESS
    };
}

/**
 * Logs a user out
 * @method logout
 * @module letters/actions
 * @return {object}
 */
export function logout() {
    return dispatch => {
        return logUserOut()
            .then(() => {
                history.push('/login');
                dispatch(logoutSuccess());
                window.Raven.setUserContext();
                // Remove the initial state that was embedded with the intial HTML sent by the server
                const embeddedState = document.getElementById('initialState');
                if (embeddedState) {
                    embeddedState.remove();
                }
            })
            .catch(err => dispatch(createError(err)));
    };
}

/**
 * Logs a user in
 * @method login
 * @module letters/actions
 * @return {object}
 */
export function login() {
    return dispatch => {
        return loginWithGithub().then(async () => {
            dispatch(loading());
            const user = await getFirebaseUser();
            const token = await getFirebaseToken();
            const res = await fetch(`${process.env.ENDPOINT}/users/${user.uid}`);
            if (res.status === 404) {
                const userPayload = {
                    name: user.displayName,
                    profilePicture: user.photoURL,
                    id: user.uid
                };
                const newUser = await fetch(`${process.env.ENDPOINT}/users`, {
                    method: 'POST',
                    body: JSON.stringify(userPayload),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json());
                dispatch(loginSuccess(newUser, token));
                dispatch(loaded());
                history.push('/');
                return newUser;
            }
            const existingUser = await res.json();
            dispatch(loginSuccess(existingUser, token));
            dispatch(loaded());
            history.push('/');
            return existingUser;
        });
    };
}
