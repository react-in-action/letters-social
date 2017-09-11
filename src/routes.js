import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Home from './pages/home';
import SinglePost from './pages/post';
import Login from './pages/login';
import NotFound from './pages/error';
import { isServer } from './utils/environment';
import { loginSuccess } from './actions/auth';
import { checkIfUserExists } from './actions/auth';
import configureStore from './store/configureStore';

const store = configureStore();
function requireUser(nextState, replace, callback) {
    if (isServer()) {
        return callback();
    }
    const { user } = store.getState();
    if (user.authenticated) {
        return callback();
    }
    checkIfUserExists().then(user => {
        const onLoginPage = nextState.location.pathname === '/login';
        if (user) {
            store.dispatch(loginSuccess(user));
        }
        if (user && onLoginPage) {
            replace({
                pathname: '/'
            });
        }
        if (!onLoginPage && !user) {
            replace({
                pathname: '/login'
            });
        }
        return callback();
    });
}

export const routes = (
    <Route path="/" onEnter={requireUser} component={App}>
        <IndexRoute component={Home} />
        <Route component={SinglePost} path="/posts/:postId" />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
    </Route>
);
