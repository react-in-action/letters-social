import React from 'react';
import { connect } from 'react-redux';
const ErrorMessage = ({ error }) => {
    return (
        <div className="error">
            <h2 className="message">Something went wrong</h2>
            <p>We're on it!</p>
            <code>{error}</code>
        </div>
    );
};

export default connect(state => {
    return {
        error: state.error
    };
})(ErrorMessage);
