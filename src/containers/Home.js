import React, { Component } from 'react';

import { AutoAffix } from 'react-overlays';

import { fetchPosts, createPost } from '../shared/http';

import { Ad } from '../components/ad/Ad';
import { CreatePost, Posts } from '../components/post';
import { Welcome } from '../components/welcome';

class Home extends Component {
  constructor(props) {
    super(props);
    this.loadMorePosts = this.loadMorePosts.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.state = {
      nPosts: 5,
      posts: [],
      loaded: false
    };
  }

  componentDidMount() {
    fetchPosts(5).then((posts) => this.setState({ loaded: true, posts }))
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

    this.setState({ posts: oldPosts });

    createPost(payload).then((res) => {
      if (res.ok === true) {
        this.fetchPosts();
      }
    });
  }

  loadMorePosts() {
    const nPosts = 5 + this.state.nPosts;
    this.setState({ nPosts });
    fetchPosts(nPosts).then((posts) => this.setState({ posts }))
                      .catch(err => console.error(err));
  }

  render() {
    return (
      <div className="home">
        <div className="row">
          <div className="col-xs-3 hidden-xs">
            <Welcome/>
          </div>
          <div className="col-xs-12 col-sm-6">
            <CreatePost onSubmit={this.handlePostSubmit}/>
            {
              this.state.loaded
              && <Posts posts={this.state.posts}/>

            }
            <button className="load-more text-center btn-lg btn btn-default btn-block" onClick={this.loadMorePosts}>
              Load more posts
            </button>
          </div>
          <div className="col-sm-2 col-xs-12 hidden-xs last-xs">
            <AutoAffix viewportOffsetTop={50} container={this}>
              <div className="ads">
                <Ad url="https://ifelse.io/book" imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/react+in+action+meap+ad.png"/>

                <Ad url="https://ifelse.io/book" imageUrl="https://drtzvj8zd0k9x.cloudfront.net/assets/ads/Yl48tQw.jpg"/>
              </div>
            </AutoAffix>
          </div>
        </div>
      </div>
    );
  }
}

export { Home };
