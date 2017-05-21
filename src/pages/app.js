import PropTypes from 'prop-types';
import React from 'react';

import Nav from '../components/nav/Navbar';

const App = props => {
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
    children: PropTypes.node
};


export default App;
