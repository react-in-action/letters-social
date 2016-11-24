import { history } from '../history';
import { firebase } from './core';

const google = new firebase.auth.GoogleAuthProvider();
google.addScope('https://www.googleapis.com/auth/plus.login');

const facebook = new firebase.auth.FacebookAuthProvider();
facebook.addScope('public_profile');

const github = new firebase.auth.GithubAuthProvider();
github.addScope('user:email');

const twitter = new firebase.auth.TwitterAuthProvider();

export function logout() {
  return new Promise((resolve, reject) => {
    firebase.auth().signOut().then(() => {
      history.push('/login');
      resolve();
    }, error => reject(error));
  });
}

function loginWithProvider(provider) {
  return firebase.auth().signInWithRedirect(provider);
}

export const loginWithGoogle = loginWithProvider.bind(null, google);
export const loginWithTwitter = loginWithProvider.bind(null, twitter);
export const loginWithGithub = loginWithProvider.bind(null, github);
export const loginWithFacebook = loginWithProvider.bind(null, facebook);
