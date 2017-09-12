import React from 'react';
import { Route, IndexRoute } from 'react-router';

import App from './app';
import Home from './pages/home';
import SinglePost from './pages/post';
import Login from './pages/login';
import NotFound from './pages/error';
import { loadUser } from './shared/http';
import { createError } from './actions/error';
import { loginSuccess } from './actions/auth';
import { getFirebaseUser } from './actions/auth';
import configureStore from './store/configureStore';

const store = configureStore();
/**
 * This React Router onenter hook helps determine if there's a currently-authenticated user or not
 * @method requireUser
 * @module letters/components
 * @param  {nextState}    nextState next react router Location descriptor
 * @param  {function}    replace   replace function
 * @param  {Function}  callback  callback to invoke when ready to transition
 * @return {void}
 */
// We're using the new async/await syntax here:
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/async_function
async function requireUser(nextState, replace, callback) {
    try {
        // Check to see if there's a currently-authenticated user
        const { user: { authenticated } } = store.getState();
        const isOnLoginPage = nextState.location.pathname === '/login';
        // If there is, we can allow the migration
        if (authenticated) {
            return callback();
        }
        // Otherwise, check firebase to see if there's a user logged in
        const firebaseUser = await getFirebaseUser();
        if (!firebaseUser && !isOnLoginPage) {
            replace({
                pathname: '/login'
            });
            return callback();
        }
        // If there's no user BUT we're on the login page, proceed
        if (!firebaseUser && isOnLoginPage) {
            return callback();
        }
        // We need to load the actual user, so do so here
        const user = await loadUser(firebaseUser.uid);
        store.dispatch(loginSuccess(user));
        return callback();
    } catch (err) {
        store.dispatch(createError(err));
        return callback();
    }
}

/**
 * Routes configuration
 * @module letters/components
 */
export const routes = (
    <Route path="/" onEnter={requireUser} component={App}>
        <IndexRoute component={Home} />
        <Route component={SinglePost} path="/posts/:postId" />
        <Route path="/login" component={Login} />
        <Route path="*" component={NotFound} />
    </Route>
);
