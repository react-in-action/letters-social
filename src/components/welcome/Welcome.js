import React from 'react';

const Welcome = () => {
    return (
        <div>
            <div className="welcome">
                <h1>Welcome!</h1>
                <p>
                    If you're here, you're probably reading{' '}
                    <a href="https://ifelse.io/book" target="_blank" rel="noopener noreferrer">
                        React in Action
                    </a>{' '}
                    from Manning Publications. This app is the example application that you'll build
                    as you go through the book. In React in Action, you'll learn:
                    <ul>
                        <li>Building a simple social app</li>
                        <li>Learning about the fundamentals of React</li>
                        <li>Building React apps with modern JavaScript (ES2015 and beyond)</li>
                        <li>How React works (React in action covers through Reacy 16 (fiber))</li>
                        <li>Implementing a routing system from scratch</li>
                        <li>Utilizing server-side rendering</li>
                        <li>Testing React applications</li>
                        <li>Implementing a Redux application architecture</li>
                    </ul>
                </p>

                <p>
                    If you have any questions or thoughts, feel free to reach out to me{' '}
                    <a
                        href="https://twitter.com/markthethomas"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        @markthethomas
                    </a>{' '}
                    on the Manning Author's forum (you get access w/ the MEAP!) or on {' '}
                    <a href="https://twitter.com/markthethomas" rel="noreferrer noopener">
                        Twitter
                    </a>{' '}
                    .
                    <br />
                    <br />
                    -{' '}
                    <a href="https://ifelse.io" rel="noreferrer noopener">
                        Mark Thomas
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Welcome;
