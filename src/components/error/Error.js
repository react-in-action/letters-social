import React from 'react';
import { connect } from 'react-redux';
export function renderErrorMessage(err) {
    return err.stack || err.stacktrace || 'no error stack available';
}
const ErrorMessage = ({ error }) => {
    return (
        <div className="error">
            <h2 className="message">Something went wrong</h2>
            <p>We're on it!</p>
            <code>{renderErrorMessage(error)}</code>
            <button className="block">
                <a
                    href="https://github.com/react-in-action/letters-social/issues/new"
                    target="_blank"
                    rel="noreferrer noopener"
                >
                    Open an issue on Github
                </a>
            </button>
        </div>
    );
};

export default connect(state => {
    return {
        error: state.error
    };
})(ErrorMessage);
