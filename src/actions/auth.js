import * as types from '../constants/types';
import { firebase, providerLogins, logUserOut } from '../backend';
import configureStore from '../store/configureStore';
import { history } from '../history';

function loginRequest() {
    return {
        type: types.auth.AUTH_LOGIN_REQUEST,
        error: false
    };
}

function loginFailure() {
    return {
        type: types.auth.AUTH_LOGIN_FAILURE,
        error: false
    };
}

function loginSuccess(user) {
    return {
        type: types.auth.AUTH_LOGIN_SUCCESS,
        error: false,
        payload: user
    };
}

export function login(provider) {
    return dispatch => {
        dispatch(loginRequest());
        return providerLogins[provider]().catch(err => dispatch(loginFailure(err)));
    };
}

function logoutRequest() {
    return {
        type: types.auth.AUTH_LOGOUT_REQUEST,
        error: false
    };
}

function logoutFailure() {
    return {
        type: types.auth.AUTH_LOGOUT_FAILURE,
        error: false
    };
}

function logoutSuccess(user) {
    return {
        type: types.auth.AUTH_LOGOUT_SUCCESS,
        error: false,
        user
    };
}

export function logout() {
    return dispatch => {
        dispatch(logoutRequest());
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

firebase.auth().onAuthStateChanged(user => {
    const store = configureStore();
    // if a user is logged in or just finished logging in, we can navigate to the main page
    if (user) {
        history.push('/');
        store.dispatch(loginSuccess(user));
        console.log(store.getState());
    }
});
