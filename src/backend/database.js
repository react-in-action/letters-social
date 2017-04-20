import { firebase } from './core';

export const update = payload => {
    const { currentUser } = firebase.auth();
    if (!currentUser) {
        return Promise.reject(new Error('No user for update'));
    }
    return firebase
        .database()
        .ref(`users/${currentUser.uid}`)
        .set(payload);
};
