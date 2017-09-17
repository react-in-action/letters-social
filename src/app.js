import React, { Component } from 'react';
import PropTypes from 'prop-types';
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
class App extends Component {
    componentDidMount() {
        // Remove the initial state that was embedded with the intial HTML sent by the server
        const embeddedState = document.getElementById('initialState');
        if (embeddedState) {
            embeddedState.remove();
        }
    }
    render() {
        if (this.props.error) {
            return (
                <div className="app">
                    <ErrorMessage error={this.props.error} />
                </div>
            );
        }
        return (
            <div className="app">
                <Nav />
                {this.props.loading ? (
                    <div className="loading">
                        <Loader />
                    </div>
                ) : (
                    this.props.children
                )}
            </div>
        );
    }
}

App.propTypes = {
    children: PropTypes.node
};

export const mapStateToProps = state => {
    return {
        error: state.error,
        loading: state.loading
    };
};
export default connect(mapStateToProps)(App);
