import PropTypes from 'prop-types';
import { Component } from 'react';

export default class ContextWrapper extends Component {
    static get childContextTypes() {
        return {
            data: PropTypes.object
        };
    }
    static propTypes = {
        children: PropTypes.element
    }
    getChildContext() {
        return {
            data: this.props.data
        };
    }
    render() {
        return this.props.children;
    }
}
