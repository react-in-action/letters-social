import * as types from '../constants/types';
import { firebase, providerLogins, logUserOut } from '../backend';
import { history } from '../history';
import { createError } from './error';
import { loading, loaded } from './loading';

export function loginFailure() {
    return {
        type: types.auth.AUTH_LOGIN_FAILURE,
        error: false
    };
}

export function loginSuccess(user) {
    return {
        type: types.auth.AUTH_LOGIN_SUCCESS,
        error: null,
        payload: user
    };
}

export function logoutSuccess(user) {
    return {
        type: types.auth.AUTH_LOGOUT_SUCCESS,
        error: null,
        user
    };
}

export function logout() {
    return dispatch => {
        return logUserOut()
            .then(() => {
                history.push('/login');
                dispatch(logoutSuccess());
                // Wipes the user context from our error-reporting
                window.Raven.setUserContext();
            })
            .catch(err => dispatch(createError(err)));
    };
}

export function checkIfUserExists() {
    return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => resolve(user));
    });
}

export function login(provider) {
    return dispatch => {
        return providerLogins[provider]().then(async () => {
            dispatch(loading());
            const user = await checkIfUserExists();
            const res = await fetch(`${process.env.ENDPOINT}/users/${user.uid}`);
            if (res.status === 404) {
                const newUser = await fetch(`${process.env.ENDPOINT}/users`, {
                    method: 'POST',
                    body: JSON.stringify(user),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }).then(res => res.json());
                dispatch(loginSuccess(newUser));
                dispatch(loaded());
                history.push('/');
                return newUser;
            }
            const existingUser = await res.json();
            dispatch(loginSuccess(existingUser));
            dispatch(loaded());
            history.push('/login');
            return existingUser;
        });
    };
}
