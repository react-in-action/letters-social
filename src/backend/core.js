import firebase from 'firebase';

const config = {
    apiKey: 'AIzaSyDBosKGKi-BI9Z8vftAwkBRQlSDDNE8PvM',
    authDomain: 'letters-social.firebaseapp.com'
};

try {
    firebase.initializeApp(config);
} catch (e) {
    console.error('Error initializing firebase — check your source code');
    console.error(e);
}

export { firebase };
