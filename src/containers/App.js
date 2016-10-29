import React, { PropTypes } from 'react';

import Nav from '../components/nav/navbar';

export const App = (props) => {
  return (
    <div className="app">
      <Nav />
      <div className="container-fluid">
        {props.children}
      </div>
    </div>
  );
};

App.propTypes = {
  children: PropTypes.node,
};
