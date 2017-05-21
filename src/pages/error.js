import React from 'react';
import Link from '../components/router/Link';

const NotFound = () => {
    return (
        <div className="container">
            <div className="row middle-xs center-xs">
                <div style={{ padding: '10% 0' }} className="col-xs-12">
                    <img
                        src="https://s3.amazonaws.com/learn-react/assets/not-found/404.gif"
                        alt=""
                    />
                    <h2>
                        Not found :(
                    </h2>
                    <Link to="/">
                        <button className="btn btn-default">
                            go back home
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default NotFound;
