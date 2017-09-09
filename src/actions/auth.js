import * as types from '../constants/types';
import { firebase, providerLogins, logUserOut } from '../backend';
import configureStore from '../store/configureStore';
import { history } from '../history';
import { ensureUserAccount } from '../shared/http';
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

firebase.auth().onAuthStateChanged(user => {
    const store = configureStore();
    if (user) {
        store.dispatch(loading());
        const { uid: id, displayName: name, email, photoURL: profilePicture } = user;
        ensureUserAccount({ id, name, email, profilePicture }).then(user => {
            // // If we get a user back, notify the store
            store.dispatch(loginSuccess(user));
            // // If we're on the login page, we can redirect them now
            if (window.location.pathname.indexOf('/login') !== -1) {
                history.push('/');
            }
            store.dispatch(loaded());
        });
    } else {
        store.dispatch(loading());
        // If no user (like as in a logout), move them to the login page and notify the store
        history.push('/login');
        store.dispatch(logoutSuccess());
        store.dispatch(loaded());
    }
});
