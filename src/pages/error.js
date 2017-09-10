import React from 'react';
import Link from '../components/router/Link';

const NotFound = () => {
    return (
        <div className="not-found">
            <img src="/static/assets/system/404.gif" alt="Not Found | React in Action" />
            <h2>Not found :(</h2>
            <Link to="/">
                <button>go back home</button>
            </Link>
        </div>
    );
};

export default NotFound;
