import React from 'react';
import { Lifetime } from './Lifecycle';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      thing: 'thing?',
    };
  }
  componentDidMount() {
    setTimeout(() => {
      this.setState({  })
    }, 2000);
  }
  render() {
    return (
      <Lifetime zip={this.state.thing} />
    );
  }
}
