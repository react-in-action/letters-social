import { firebase } from './core';

const github = new firebase.auth.GithubAuthProvider();
github.addScope('user:email');

export function logUserOut() {
    return firebase
        .auth()
        .signOut()
        .catch(err => console.error(err));
}

export function loginWithGithub() {
    return firebase.auth().signInWithPopup(github);
}
