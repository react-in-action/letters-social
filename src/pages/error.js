import React from 'react';
import Link from '../components/router/Link';

const NotFound = () => {
    return (
        <div className="not-found">
            <img
                src="https://s3.amazonaws.com/learn-react/assets/not-found/404.gif"
                alt="Not Found | React in Action"
            />
            <h2>Not found :(</h2>
            <Link to="/">
                <button>go back home</button>
            </Link>
        </div>
    );
};

export default NotFound;
