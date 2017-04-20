import React from 'react';
import { AutoAffix } from 'react-overlays';

const Welcome = () => {
    return (
        <AutoAffix viewportOffsetTop={50} container={this}>
            <div className="welcome">
                <h3>Welcome!</h3>
                <p>
                    If you're here, you're probably reading or heard about
                    {' '}
                    <a
                        href="https://ifelse.io/book"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        React in Action
                    </a>
                    . This app, Letters Social, is built with
                    {' '}
                    <a
                        rel="noopener noreferrer"
                        href="https://facebook.github.io/react/"
                    >
                        React
                    </a>
                    {' '}
                    and is what you'll be building
                    {' '}
                    <a href="https://ifelse.io/book" rel="noopener noreferrer">
                        in the book (React in Action)
                    </a>
                    .
                </p>
                <p>
                    <a href="https://ifelse.io/book" rel="noopener noreferrer">
                        React in Action
                    </a>
                    {' '}
                    explores
                </p>
                <ul>
                    <li>Building a simple social app</li>
                    <li>Learning about the fundamentals of React</li>
                    <li>Building modern JavaScript (ES6 and beyond)</li>
                    <li>Implementing a routing system from scratch</li>
                    <li>Utilizing server-side rendering</li>
                    <li>Testing React applications</li>
                    <li>Implementing application architecture</li>
                </ul>
                <p>
                    If you have any questions or thoughts, feel free to reach out to me
                    {' '}
                    <a
                        href="https://twitter.com/markthethomas"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @markthethomas
                    </a>
                    {' '}
                    on the Manning Author's forum (you get access w/ the MEAP!) or on
                    {' '}
                    <a
                        href="https://twitter.com/markthethomas"
                        rel="noreferrer noopener"
                    >
                        Twitter
                    </a>
                    {' '}
                    .
                    <br />
                    <br />
                    -
                    {' '}
                    <a href="https://ifelse.io" rel="noreferrer noopener">
                        Mark
                    </a>
                </p>
            </div>
        </AutoAffix>
    );
};

export default Welcome;
