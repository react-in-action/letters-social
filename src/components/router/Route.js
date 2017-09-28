import PropTypes from 'prop-types';
import { Component } from 'react';
import invariant from 'invariant';

/**
 * A route simple wraps another component for configuration, nothing else
 * @type {Object}
 */
class Route extends Component {
    static propTypes = {
        path: PropTypes.string,
        component: PropTypes.oneOfType([PropTypes.element, PropTypes.func])
    };
    render() {
        return invariant(false, "<Route> elements are for config only and shouldn't be rendered");
    }
}

export default Route;
