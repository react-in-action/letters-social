import * as types from '../constants/types';
import { firebase, loginWithGithub, logUserOut } from '../backend';
import { history } from '../history';
import { createError } from './error';
import { loading, loaded } from './loading';

export function loginSuccess(user) {
    return {
        type: types.auth.AUTH_LOGIN_SUCCESS,
        error: null,
        user
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

export function getFirebaseUser() {
    return new Promise(resolve => {
        firebase.auth().onAuthStateChanged(user => {
            resolve(user);
        });
    });
}

export function login() {
    return dispatch => {
        return loginWithGithub().then(async () => {
            dispatch(loading());
            const user = await getFirebaseUser();
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
                dispatch(loginSuccess(newUser));
                dispatch(loaded());
                history.push('/');
                return newUser;
            }
            const existingUser = await res.json();
            dispatch(loginSuccess(existingUser));
            dispatch(loaded());
            history.push('/');
            return existingUser;
        });
    };
}
