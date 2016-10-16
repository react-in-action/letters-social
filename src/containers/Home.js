import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import Loader from 'react-loaders';
import { AutoAffix } from 'react-overlays';

import { Ad } from '../components/ad/Ad';
import { CreatePost, Posts } from '../components/post';
import { Welcome } from '../components/welcome';

class Home extends Component {
  constructor(props) {
    super(props);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.fetchPosts = this.fetchPosts.bind(this);
    this.state = {
      nPosts: 5,
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
    const limit = 5;
    this.setState((state) => {
      return {
        nPosts: state.nPosts + limit,
      };
    });
    // Fetch posts
    return fetch(`${process.env.ENDPOINT}/posts?_limit=${this.state.nPosts}&_sort=date&_order=DESC`)
        .then(res => res.json())
        .then(posts => this.setState({ posts }));
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div className="col-xs-3 hidden-xs">
            <Welcome />
          </div>
          <div className="col-xs-12 col-sm-6">
            <CreatePost onSubmit={this.handlePostSubmit} />
            {
              this.state.loaded ?
                <Posts posts={this.state.posts} />
              : <div className="loader"><Loader type="line-scale" active={this.state.loaded} /> </div>
            }
            <button className="load-more text-center btn-lg btn btn-default btn-block" onClick={this.fetchPosts}>
              Load more posts
            </button>
          </div>
          <div className="col-sm-2 col-xs-12 last-xs">
            <AutoAffix viewportOffsetTop={50} container={this}>
              <div className="ads">
                <Ad
                  url="https://www.manning.com/books/react-in-action" imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png"
                />

                <Ad
                  url="https://www.manning.com/books/react-in-action"
                  imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/Yl48tQw.jpg"
                />
              </div>
            </AutoAffix>
          </div>
        </div>
      </div>
    );
  }
}

export { Home };
