import React from 'react';

import { Route, IndexRoute } from 'react-router';

import App from './pages/app';
import Home from './pages/index';
import SinglePost from './pages/post';
import Login from './pages/login';
import Profile from './pages/profile';
import NotFound from './pages/error';
import { firebase } from './backend';
import { isServer } from './utils/environment';

function requireUser(nextState, replace, callback) {
    if (!isServer()) {
        firebase.auth().onAuthStateChanged(user => {
            if (user) {
                callback();
            } else {
                replace({
                    pathname: '/login'
                });
                callback();
            }
        });
    } else {
        callback();
    }
}

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute onEnter={requireUser} component={Home} />
        <Route
            onEnter={requireUser}
            path="/posts/:post"
            component={SinglePost}
        />
        <Route onEnter={requireUser} path="/profile" component={Profile} />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
    </Route>
);
