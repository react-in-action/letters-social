import firebase from 'firebase';

const config = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN
};

try {
    firebase.initializeApp(config);
} catch (e) {
    console.log(e);
}

export { firebase };
