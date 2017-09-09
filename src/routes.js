import React from 'react';
import { Route, IndexRoute } from 'react-router';

import configureStore from './store/configureStore';
import App from './pages/app';
import Home from './pages/index';
import SinglePost from './pages/post';
import Login from './pages/login';
import NotFound from './pages/error';
import { isServer } from './utils/environment';

const store = configureStore();

function requireUser(nextState, replace, callback) {
    if (!isServer()) {
        const { user } = store.getState();
        if (user) {
            callback();
        } else {
            replace({
                pathname: '/login'
            });
            callback();
        }
    } else {
        callback();
    }
}

export const routes = (
    <Route path="/" component={App}>
        <IndexRoute onEnter={requireUser} component={Home} />
        <Route onEnter={requireUser} component={SinglePost} path="/posts/:postId" />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
    </Route>
);
