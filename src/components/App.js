import React, { PropTypes } from 'react';
import storage from 'localforage';

import Nav from './nav/navbar';
import Welcome from './welcome/Welcome';

import '../styles/styles.scss';

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
    return new Promise((resolve) => {
      // Logic for welcome banner
      storage.getItem('react-in-action-visited').then((visited) => {
        if (!visited) {
          this.setState({
            showBanner: true,
          });
        }
      });
      resolve(true);
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
    return (
      <div className="app">
        <Nav />
        <div className="container-fluid">

          {this.props.children}

          <Welcome
            show={this.state.showBanner}
            onClose={this.hideBanner}
          />
        </div>
      </div>
    );
  }
}
