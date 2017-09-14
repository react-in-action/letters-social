import Cookies from 'js-cookie';

import * as types from '../constants/types';
import { history } from '../history';
import { createError } from './error';
import { loading, loaded } from './loading';
import { getFirebaseUser, loginWithGithub, logUserOut, getFirebaseToken } from '../backend/auth';

export function loginSuccess(user, token) {
    return {
        type: types.auth.AUTH_LOGIN_SUCCESS,
        error: null,
        user,
        token
    };
}

export function logoutSuccess(user, token) {
    return {
        type: types.auth.AUTH_LOGOUT_SUCCESS,
        error: null,
        user,
        token
    };
}

export function logout() {
    return dispatch => {
        return logUserOut()
            .then(() => {
                Cookies.remove('letters-token');
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
