import PropTypes from 'prop-types';
import React from 'react';

class ChildComponent extends React.Component {
    static propTypes = {
        name: PropTypes.string
    };

    static defaultProps = (function() {
        console.log('ChildComponent : getDefaultProps');
    })();

    state = {
        name: 'Mark'
    };

    componentWillMount() {
        console.log('ChildComponent : componentWillMount');
    }

    componentDidMount() {
        console.log('ChildComponent : componentDidMount');
    }

    componentWillReceiveProps(nextProps) {
        console.log('ChildComponent : componentWillReceiveProps()');
        console.log('nextProps: ', nextProps);
    }

    shouldComponentUpdate(nextProps, nextState) {
        console.log('<ChildComponent/> - shouldComponentUpdate()');
        console.log('nextProps: ', nextProps);
        console.log('nextnextState: ', nextState);
        return true;
    }

    componentWillUpdate(nextProps, nextState) {
        console.log('<ChildComponent/> - componentWillUpdate');
        console.log('nextProps: ', nextProps);
        console.log('nextState: ', nextState);
    }

    componentDidUpdate(previousProps, previousState) {
        console.log('ChildComponent: componentDidUpdate');
        console.log('previousProps:', previousProps);
        console.log('previousState:', previousState);
    }

    componentWillUnmount() {
        console.log('ChildComponent: componentWillUnmount');
    }

    render() {
        console.log('ChildComponent: render');
        return <div>Props: {this.props.name}</div>;
    }
}

class ParentComponent extends React.Component {
    static defaultProps = (function() {
        console.log('ParentComponent: getDefaultProps');
    })();

    constructor(props) {
        super(props);
        console.log('ParentComponent: getInitialState');
        this.state = { text: '' };
    }

    componentWillMount() {
        console.log('ParentComponent: componentWillMount');
    }

    componentDidMount() {
        console.log('ParentComponent: componentDidMount');
    }

    componentWillUnmount() {
        console.log('ParentComponent: componentWillUnmount');
    }

    onInputChange = e => {
        this.setState({ text: e.target.value });
    };

    render() {
        console.log('ParentComponent: render');
        return [
            <h2>Learn about rendering and lifecycle methods!</h2>,
            <input value={this.state.text} onChange={this.onInputChange} />,
            <ChildComponent text={this.state.text} />
        ];
    }
}

export { ChildComponent, ParentComponent };
