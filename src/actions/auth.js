import * as types from '../constants/types';
import { firebase, providerLogins, logUserOut } from '../backend';
import { history } from '../history';
import { createError } from './error';

export function loginFailure() {
    return {
        type: types.auth.AUTH_LOGIN_FAILURE,
        error: false
    };
}

export function loginSuccess(user) {
    return {
        type: types.auth.AUTH_LOGIN_SUCCESS,
        error: false,
        payload: user
    };
}

export function login(provider) {
    return dispatch => {
        return providerLogins[provider]().catch(err => dispatch(loginFailure(err)));
    };
}

function logoutFailure() {
    return {
        type: types.auth.AUTH_LOGOUT_FAILURE,
        error: false
    };
}

export function logoutSuccess(user) {
    return {
        type: types.auth.AUTH_LOGOUT_SUCCESS,
        error: false,
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
            .catch(err => dispatch(logoutFailure(err)));
    };
}

export function getAuthState() {
    return new Promise(resolve => firebase.auth().onAuthStateChanged(user => resolve(user)));
}
