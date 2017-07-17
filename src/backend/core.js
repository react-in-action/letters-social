import firebase from 'firebase';

const config = {
    // Normally we'd never publish these, but we will here so readers don't *have*
    // to have a firebase account first
    apiKey: 'AIzaSyDBosKGKi-BI9Z8vftAwkBRQlSDDNE8PvM',
    authDomain: 'letters-social.firebaseapp.com',
    databaseURL: 'https://letters-social.firebaseio.com',
    storageBucket: 'letters-social.appspot.com',
    messagingSenderId: '695497937993'
};

firebase.initializeApp(config);

export { firebase };
