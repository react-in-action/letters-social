import React from 'react';

import { isServer } from './environment';

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
    return (
        <html lang="en-us">
            <head>
                <meta charSet="utf-8" />
                <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
                <title>Letters Social | React in Action by Mark Thomas from Manning Publications</title>
                <link rel="manifest" href="/static/manifest.json" />
                <meta name="viewport" content="width=device-width,initial-scale=1" />
                <meta name="ROBOTS" content="INDEX, FOLLOW" />
                <meta property="og:title" content={ogProps.title} />
                <meta property="og:description" content={ogProps.description} />
                <meta property="og:type" content={ogProps.type} />
                <meta property="og:url" content={ogProps.url} />
                <meta property="og:updated_time" content={ogProps.updated_time} />
                <meta itemProp="description" content={ogProps.description} />
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
                <meta name="theme-color" content="#4469af" />
                <link href="https://fonts.googleapis.com/css?family=Open+Sans:400,700,800" rel="stylesheet" />
            </head>
            <body>
                <div id="app">{React.Children.only(children)}</div>
                <script id="initialState" data-intial-redux-state={JSON.stringify(reduxState)} />
                <script />
                <link rel="stylesheet" href="/static/styles.css" type="text/css" />
                <link rel="stylesheet" href="https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css" />
                <script src="https://cdn.ravenjs.com/3.17.0/raven.min.js" />
                <script src="https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js" />
                <script src="/static/bundle.js" type="text/javascript" />
                <script>
                    {!isServer() &&
                        process.env.NODE_ENV === 'production' &&
                        (function(i, s, o, g, r, a, m) {
                            i.GoogleAnalyticsObject = r;
                            (i[r] =
                                i[r] ||
                                function() {
                                    (i[r].q = i[r].q || []).push(arguments);
                                }),
                                (i[r].l = 1 * new Date());
                            (a = s.createElement(o)), (m = s.getElementsByTagName(o)[0]);
                            a.async = 1;
                            a.src = g;
                            m.parentNode.insertBefore(a, m);
                        })(window, document, 'script', 'https://www.google-analytics.com/analytics.js', 'ga')}
                    {!isServer() && ga('create', 'UA-80377914-2', 'auto')};
                    {!isServer() && ga('send', 'pageview')};
                </script>
            </body>
        </html>
    );
};
