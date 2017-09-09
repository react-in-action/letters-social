import React from 'react';
import { Route, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';
import App from './app';
import Home from './pages/home';
import SinglePost from './pages/post';
import Login from './pages/login';
import NotFound from './pages/error';
import { isServer } from './utils/environment';
import { getAuthState, loginSuccess } from './actions/auth';
import { loading, loaded } from './actions/loading';

const store = configureStore();

function requireUser(nextState, replace, callback) {
    // TODO: fix this
    // FIND A WAY TO GET THE CURRENT USER FROM FIREBASE WITHOUT AUTHSTATE CHANGE
    //
    //
    //
    //
    //
    const store = configureStore();
    if (!isServer()) {
        store.dispatch(loading());
        getAuthState().then(user => {
            if (user) {
                const { uid: id, displayName: name, email, photoURL: profilePicture } = user;
                // ensureUserAccount({ id, name, email, profilePicture }).then(user => {
                //     // // If we get a user back, notify the store
                store.dispatch(loginSuccess(user));
                store.dispatch(loaded());
                //     // // If we're on the login page, we can redirect them now
                //     if (window.location.pathname.indexOf('/login') !== -1) {
                //         history.push('/');
                //     }
                //     resolve();
                // });
            } else {
                store.dispatch(loading());
                // If no user (like as in a logout), move them to the login page and notify the store
                history.push('/login');
                store.dispatch(loaded());
            }
            callback();
        });
    } else {
        callback();
    }
}

export const routes = (
    <Route path="/" onEnter={requireUser} component={App}>
        <IndexRoute onEnter={requireUser} component={Home} />
        <Route onEnter={requireUser} component={SinglePost} path="/posts/:postId" />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
    </Route>
);
