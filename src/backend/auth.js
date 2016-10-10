import firebase from 'firebase';

const github = new firebase.auth.GithubAuthProvider();
github.addScope('user:email');

export { github };
