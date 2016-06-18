import React from 'react';

const ChildComponent = React.createClass({
  propTypes: {
    name: React.PropTypes.string,
  },
  getInitialState: function() {
    return {
      name: 'Mark',
    };
  },
  getDefaultProps: function() {
    console.log('ChildComponent : getDefaultProps');
  },
  componentWillMount: function() {
    console.log('ChildComponent : componentWillMount');
  },
  componentDidMount: function() {
    console.log('ChildComponent : componentDidMount');
  },
  componentWillReceiveProps: function(nextProps) {
    console.log('ChildComponent : componentWillReceiveProps()');
    console.log('nextProps: ', nextProps);
  },
  shouldComponentUpdate: function(nextProps, nextState) {
    console.log('<ChildComponent/> - shouldComponentUpdate()');
    console.log('nextProps: ', nextProps);
    console.log('nextnextState: ', nextState);
    return true;
  },
  componentWillUpdate: function(nextProps, nextState) {
    console.log('<ChildComponent/> - componentWillUpdate');
    console.log('nextProps: ', nextProps);
    console.log('nextState: ', nextState);
  },
  componentDidUpdate: function(previousProps, previousState) {
    console.log('ChildComponent: componentDidUpdate');
    console.log('previousProps:', previousProps);
    console.log('previousState:', previousState);
  },
  componentWillUnmount: function() {
    console.log('ChildComponent: componentWillUnmount');
  },
  render: function() {
    console.log('ChildComponent: render');
    return (
      <div>
        Props: {this.props.name}
      </div>
    );
  },
});

const ParentComponent = React.createClass({
  getDefaultProps: function() {
    console.log('ParentComponent: getDefaultProps');
  },
  getInitialState: function() {
    console.log('ParentComponent: getInitialState');
    return { text: '' };
  },
  componentWillMount: function() {
    console.log('ParentComponent: componentWillMount');
  },
  componentDidMount: function() {
    console.log('ParentComponent: componentDidMount');
  },
  componentWillUnmount: function() {
    console.log('ParentComponent: componentWillUnmount');
  },
  onInputChange: function(e) {
    this.setState({ text: e.target.value });
  },
  render: function() {
    console.log('ParentComponent: render');
    return (
      <div className="container">
        <h2>Learn about rendering and lifecycle methods!</h2>
        <input
          value={this.state.text}
          onChange={this.onInputChange}
        />
        <ChildComponent text={this.state.text} />
      </div>
    );
  },
});

ReactDOM.render(
  <ParentComponent />,
  document.getElementById('container')
);


export { ChildComponent, ParentComponent };
