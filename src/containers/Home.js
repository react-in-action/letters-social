import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import Loader from 'react-loaders';

import { CreatePost, Posts } from '../components/post';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.state = {
      posts: [],
      loaded: false,
      showBanner: false,
    };
  }

  componentDidMount() {
    this.fetchPosts()
        .then(() => this.setState({ loaded: true }))
        .catch(err => console.error(err));
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
      .then((res) => {
        if (res.ok === true) {
          this.fetchPosts();
        }
      });
  }

  fetchPosts() {
    // Fetch posts
    return fetch(`${process.env.ENDPOINT}/posts?_limit=25&_sort=date&_order=DESC`)
        .then(res => res.json())
        .then((posts) => {
          this.setState({
            posts,
          });
        });
  }

  render() {
    return (
      <div className="row">

        {/* Main post area */}
        <div className="col-xs-12 col-sm-offset-2 col-sm-8">

          <CreatePost onSubmit={this.handlePostSubmit} />

          {/* Loader */}
          { this.state.loaded ?
            <Posts posts={this.state.posts} />
            :
            <div className="loader"> <Loader type="line-scale" active={this.state.loaded} /></div>
          }

        </div>
      </div>
    );
  }
}

export { Home };
