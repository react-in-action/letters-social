import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import ErrorMessage from './components/error/Error';
import Nav from './components/nav/navbar';
import Loader from './components/Loader';

/**
 * The app component serves as a root for the project and renders either children,
 * the error state, or a loading state
 * @method App
 * @module letters/components
 */
const App = props => {
    return (
        <div className="app">
            <Nav />
            {props.error ? (
                <ErrorMessage error={props.error} />
            ) : props.loading ? (
                <div className="loading">
                    <Loader />
                </div>
            ) : (
                props.children
            )}
        </div>
    );
};

App.propTypes = {
    children: PropTypes.node
};

export default connect(state => {
    return {
        error: state.error,
        loading: state.loading
    };
})(App);
