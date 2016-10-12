import React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';
import { Home, SinglePost, Login } from './containers';
import { Router, Route } from './components/router';
import { history } from './history';
import { firebase } from './backend';

import './styles/styles.scss';

// Function that wraps ReactDOM.render and renders the app w/ current location
const renderApp = (state) => {
  render(
    <Router {...state}>
      <Route path="" component={App}>
        <Route path="/" component={Home} />
        <Route path="/posts/:post" component={SinglePost} />
        <Route path="/login" component={Login} />
      </Route>
    </Router>,
    document.getElementById('app'),
  );
};

const initialState = {
  location: window.location.pathname,
};

// Render the app initially
renderApp(initialState);

// When there's a history change, re-render the app
history.listen((location) => {
  const user = firebase.auth().currentUser;
  const newState = Object.assign(
      initialState,
      { location: user ? location.pathname : '/login' }
    );
  renderApp(newState);
});

// When the user is
firebase.auth().onAuthStateChanged((user) => {
  const currentLocation = window.location.pathname;
  if (currentLocation === '/') {
    history.push(user ? window.location.pathname : '/login');
  }

  // Ensure user gets redirected after they log in
  if (user && currentLocation === '/login') {
    history.push('/');
  }
});
