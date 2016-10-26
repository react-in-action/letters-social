import React, { PropTypes } from 'react';
import storage from 'localforage';

import Nav from '../components/nav/navbar';

export class App extends React.Component {

  static propTypes = {
    children: PropTypes.node,
  }

  // Operations usually carried out in componentWillMount go here
  constructor(props) {
    super(props);
    this.hideBanner = this.hideBanner.bind(this);
    this.state = {
      showBanner: false,
    };
  }

  componentDidMount() {
    this.initializeStorage();
  }

  initializeStorage() {
    return storage.getItem('react-in-action-visited').then((visited) => {
      if (!visited) {
        this.setState({
          showBanner: true,
        });
      }
    });
  }

  hideBanner() {
    storage.setItem('react-in-action-visited', true).then(() => {
      this.setState({
        showBanner: false,
      });
    });
  }

  render() {
    const { children } = this.props;
    return (
      <div className="app">
        <Nav />
        <div className="container-fluid">
          {children}
        </div>
      </div>
    );
  }
}
