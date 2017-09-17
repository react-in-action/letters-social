import PropTypes from 'prop-types';
// Major thanks to TJ Holowaychuk's work on https://github.com/tj/react-enroute
// This code draws on the simple router created there; thanks (again) TJ!

import React, { Component } from 'react';
import enroute from 'enroute';
import invariant from 'invariant';

/**
 * The custom router we build. It handles the basics of client-side routing for our react application
 * @module letters/components
 * @type {Object}
 */
export default class Router extends Component {
    static propTypes = {
        children: PropTypes.array,
        location: PropTypes.string.isRequired
    };

    // You could also take advantage of class properties and store routes there
    // routes = {};

    constructor(props) {
        super(props);

        // We'll store the routes on the Router component
        this.routes = {};

        // Add all the children components to the routes
        this.addRoutes(props.children);

        // Set up the router for matching & routing
        this.router = enroute(this.routes);
    }

    addRoute(element, parent) {
        // Get the component, path, index, and children props from a given child
        const { component, path, children, index } = element.props;

        // Ensure that it has the right input, since PropTypes can't really help here
        invariant(component, `Route ${path} is missing the "path" property`);
        invariant(typeof path === 'string', `Route ${path} is not a string`);

        // Set up Ccmponent to be rendered
        const render = (params, renderProps) => {
            const finalProps = Object.assign({ router: { params } }, this.props, renderProps);

            // Or, using the object spread operator (currently a candidate proposal for future versions of JavaScript)
            // const finalProps = {
            //   ...this.props,
            //   ...renderProps,
            //   params,
            // };

            const hasIndexRoute = index && path === finalProps.location;

            const children = hasIndexRoute
                ? React.createElement(component, finalProps, React.createElement(index, finalProps))
                : React.createElement(component, finalProps);

            return parent ? parent.render(params, { children }) : children;
        };

        // Set up the route itself (/a/b/c)
        const route = this.normalizeRoute(path, parent);

        // If there are children, add those routes, too
        if (children) {
            this.addRoutes(children, { route, render });
        }

        // Set up the route on the routes property
        this.routes[this.cleanPath(route)] = render;
    }

    addRoutes(routes, parent) {
        React.Children.forEach(routes, route => this.addRoute(route, parent));
    }

    cleanPath(path) {
        return path.replace(/\/\//g, '/');
    }

    normalizeRoute(path, parent) {
        // If there's just a /, it's an absolute route
        if (path[0] === '/') {
            return path;
        }
        // No parent, no need to join stuff together
        if (!parent) {
            return path;
        }
        // Join the child to the parent route
        return `${parent.route}/${path}`;
    }

    render() {
        const { location } = this.props;
        invariant(location, '<Router/> needs a location to work');
        return this.router(location);
    }
}
