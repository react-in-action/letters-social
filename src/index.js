import React from 'react';
import { render } from 'react-dom';

import { App } from './components/App';
import { Home, SinglePost } from './containers';
import { Router, Route } from './components/router';
import { history } from './history';

const appContainer = document.getElementById('app');

const initialState = {
  location: window.location.pathname,
};


// Function that wraps ReactDOM.render and renders the app w/ current location
const renderApp = (state) => {
  render(
    <Router {...state}>
      <Route path="" component={App}>
        <Route path="/" component={Home} />
        <Route path="/posts/:post" component={SinglePost} />
      </Route>
    </Router>,
    appContainer
  );
};

// When things change, re-render the app
history.listen((location) => {
  console.log(location);
  const newState = Object.assign(
    {},
    initialState,
    { location: location.pathname }
  );
  renderApp(newState);
});

// Render the app w/ the current location
renderApp(initialState);
