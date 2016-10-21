import React, { Component, PropTypes } from 'react';
import enroute from 'enroute';
import invariant from 'invariant';

export class Router extends Component {
  static propTypes = {
    children: PropTypes.element.isRequired,
  }

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
    // Get the component, path, and children props from a given child
    const { component, path, children } = element.props;

    console.debug(`Adding route for ${component.name}::${path}`);

    // Ensure that it has the right input, since PropTypes can't really help here
    invariant(component, `Route ${path} is  missing "path  " property`);
    invariant(typeof path === 'string', `Route ${path} is  missing "path  " property`);

    // Set up Component to be rendered
    const render = (params, renderProps) => {
      const finalProps = {
        ...this.props,
        ...renderProps,
        params,
      };

      const children = React.createElement(component, finalProps);

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
    console.debug('Adding routes');
    React.Children.forEach(routes, route => this.addRoute(route, parent));
  }

  normalizeRoute(path, parent) {
    // If there's just a /, it's an absolute route
    if (path[0] === '/') {
      return path;
    }
    // No parent, no need to join stuff together
    if (parent == null) {
      return path;
    }
    // Join the child to the parent route
    return `${parent.route}/${path}`;
  }

  cleanPath(path) {
    return path.replace(/\/\//g, '/');
  }

  render() {
    const { location } = this.props;
    return this.router(location, { children: null });
  }
}
