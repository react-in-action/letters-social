import React from 'react';
import { render } from 'react-dom';
import { Provider } from 'react-redux';

import { App } from './containers/App';
import { Home, SinglePost, Login, NotFound, Profile } from './containers';
import { Router, Route } from './components/router';
import { history } from './history';
import { firebase } from './backend';
import configureStore from './store/configureStore';
import initialReduxState from './constants/initialState';

import './styles/styles.scss';

// Configure the Redux store
const store = configureStore(initialReduxState);

// Function that wraps ReactDOM.render and renders the app w/ current location
export const renderApp = (state) => {
    render(
        <Provider store={store}>
            <Router {...state}>
                <Route
                    path="/"
                    index={Home}
                    component={App}>
                    <Route
                        path="posts/:post"
                        component={SinglePost} />
                        <Route
                            path="login"
                            component={Login}
                        />
                        <Route
                            component={Profile}
                            path="profile"
                        />
                        <Route path="*" component={NotFound} />
                    </Route>
            </Router>
        </Provider>,
    document.getElementById('app'),
  );
};

// Create an intial state object to use
const initialState = {
  location: window.location.pathname,
};

// When there's a history change, re-render the app
export function activateHistoryListener() {
    history.listen((location) => {
        // scroll to the top of the page when changing routes
        window.scrollTo( 0, 0);
        const user = firebase.auth().currentUser;
        const newState = Object.assign(initialState, {
            location: user
                    ? location.pathname
                    : '/login',
                });

                renderApp(newState);
  });
}

// Set up the auth listener
export function activateAuthListener() {
  firebase.auth().onAuthStateChanged(((user) => {
    if (user && window.location.pathname === '/login') {
      return history.push('/');
    }
    return history.push(user ? window.location.pathname : '/login');
  }));
}

// Render the app initially
renderApp(initialState);
activateHistoryListener();
activateAuthListener();
