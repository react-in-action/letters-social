import fetch from 'isomorphic-fetch';
import Loader from 'react-loaders';
import React from 'react';
import storage from 'localforage';
import { Col, Grid, Row } from 'react-bootstrap';

import CreatePost from './post/Create';
import Nav from './nav/navbar';
import Posts from './post/Posts';
import Welcome from './welcome/Welcome';

import '../styles/styles.scss';

export default class App extends React.Component {
  // Operations usually carried out in componentWillMount go here
  constructor(props) {
    super(props);
    this.hideBanner = this.hideBanner.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.state = {
      posts: [],
      loaded: false,
      showBanner: false,
    };
  }

  componentDidMount() {
    Promise.all([
      this.initializeStorage(),
      this.fetchPosts(),
    ]).then(() => {
      this.setState({
        loaded: true,
      });
    });
  }

  handlePostSubmit(payload) {
    // Disable empty posts
    if (!payload.content) {
      return;
    }

    // Update the local posts state optimistically
    const oldPosts = this.state.posts;
    oldPosts.unshift(payload);

    this.setState({
      posts: oldPosts,
    });

    // Create options for the request
    const requestOptions = {
      method: 'POST',
      body: JSON.stringify(payload),
      headers: {
        'Content-Type': 'application/json',
      },
    };

    // Send the new post to the API
    fetch(`${process.env.ENDPOINT}/posts`, requestOptions)
      .then(res => {
        if (res.ok === true) {
          this.fetchPosts();
        }
      });
  }

  fetchPosts() {
    // Fetch posts
    return fetch(`${process.env.ENDPOINT}/posts?_limit=25&_sort=date&_order=DESC`)
        .then(res => res.json())
        .then(posts => {
          this.setState({
            posts,
          });
        });
  }

  initializeStorage() {
    return new Promise(resolve => {
      // Logic for welcome banner
      storage.getItem('react-in-action-visited').then(visited => {
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
        <Grid fluid>
          <Row>

            {/* Main post area */}
            <Col xs={12} smOffset={2} sm={8}>
              <CreatePost onSubmit={this.handlePostSubmit} />
              {/* Loader */}
               {
                this.state.loaded ?
                  <Posts posts={this.state.posts} />
                :
                  <div className="loader">
                    <Loader type="line-scale" active={this.state.loaded} />
                  </div>
              }
            </Col>
          </Row>

          {/* Welcome banner */}
          <Welcome
            show={this.state.showBanner}
            onClose={this.hideBanner}
          />
        </Grid>
      </div>
    );
  }
}
