import React from 'react';
const ogProps = {
    updated_time: new Date(),
    type: 'website',
    url: 'https://social.react.sh',
    title: 'Letters Social | React in Action by Mark Thomas from Manning Publications',
    description:
        'Letters Social is a sample application for the React.js book React in Action by Mark Thomas from Manning Publications. Get it today at https://ifelse.io/book'
};
export const HTMLPageWrapperWithState = ({ children, reduxState }) => {
    // we are returning an array here, introduced in React 16
    // with the advent of the Fiber reconciler
    return [
        <doctype html />,
        <html lang="en-us">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>
                    Letters Social | React in Action by Mark Thomas from Manning Publications
                </title>
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="ROBOTS" content="INDEX, FOLLOW" />
                <meta property="og:title" content={ogProps.title} />
                <meta property="og:description" content={ogProps.description} />
                <meta property="og:type" content={ogProps.type} />
                <meta property="og:url" content={ogProps.url} />
                <meta property="og:updated_time" content={ogProps.updated_time} />
                <meta itemprop="description" content={ogProps.description} />
                <meta name="twitter:card" content="summary" />
                <meta name="twitter:title" content={ogProps.title} />
                <meta name="twitter:description" content={ogProps.description} />
                <meta property="book:author" content="MarkOfThomas" />
                <meta property="book:tag" content="react" />
                <meta property="book:tag" content="reactjs" />
                <meta property="book:tag" content="React in Action" />
                <meta property="book:tag" content="javascript" />
                <meta property="book:tag" content="single page application" />
                <meta property="book:tag" content="Manning publications" />
                <meta property="book:tag" content="Mark Thomas" />

                <meta name="HandheldFriendly" content="True" />
                <meta name="MobileOptimized" content="320" />
            </head>
            <body>
                <div id="app">{React.Children.only(children)}</div>
                <script id="intialState">
                    window.__INTIIAL_STATE__ = ${JSON.stringify(reduxState)}
                </script>
                <link rel="stylesheet" href="/static/styles.css" type="text/css" />
                <script async defer src="/static/bundle.js" type="text/javascript" />
                <script async defer src="https://use.fontawesome.com/0fcbe85f9e.js" />
            </body>
        </html>
    ];
};
