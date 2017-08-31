import { firebase } from './core';

const google = new firebase.auth.GoogleAuthProvider();
google.addScope('https://www.googleapis.com/auth/plus.login');

const facebook = new firebase.auth.FacebookAuthProvider();
facebook.addScope('public_profile');

const github = new firebase.auth.GithubAuthProvider();
github.addScope('user:email');

const twitter = new firebase.auth.TwitterAuthProvider();

export function logUserOut() {
    return firebase
        .auth()
        .signOut()
        .catch(err => console.error(err));
}

function loginWithProvider(provider) {
    return firebase.auth().signInWithPopup(provider);
}

// If you want to set up a different provider, you can use one of these

export const providerLogins = {
    Google: loginWithProvider.bind(null, google),
    Twitter: loginWithProvider.bind(null, twitter),
    Github: loginWithProvider.bind(null, github),
    Facebook: loginWithProvider.bind(null, facebook)
};
