import fetch from 'isomorphic-fetch';
import Loader from 'react-loaders';
import React from 'react';
import storage from 'localforage';
import { Col, Grid, Row } from 'react-bootstrap';

import CreatePost from './post/Create';
import Nav from './nav/navbar';
import Posts from './post/Posts';
import Sidebar from './sidebar/Sidebar';
import Welcome from './welcome/Welcome';

import '../styles/styles.scss';

export default class App extends React.Component {
  // Operations usually carried out in componentWillMount go here
  constructor(props) {
    super(props);
    this.selectPostCategory = this.selectPostCategory.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.filterByMediaType = this.filterByMediaType.bind(this);
    this.hideBanner = this.hideBanner.bind(this);
    this.handlePostSubmit = this.handlePostSubmit.bind(this);
    this.state = {
      posts: {
        all: [],
        filtered: [],
      },
      category: null,
      filters: {
        image: null,
        link: null,
        categories: [],
      },
      loaded: false,
      connected: false,
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
    const oldPosts = this.state.posts.all;
    oldPosts.unshift(payload);

    this.setState({
      posts: {
        all: oldPosts,
        filtered: this.state.posts.filtered,
      },
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
        .then(hydratedPosts => {
          this.setState({
            posts: {
              all: hydratedPosts,
              filtered: hydratedPosts,
            },
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

  selectPostCategory(category: ?string) {
    this.setState((previousState) => {
      const { posts: { all } } = previousState;
      const filtered = previousState.posts.all
      .filter(post => post.comments && post.comments.length)
      .filter(post => {
        return category ? post.categories.includes(category) : post;
      });
      return {
        category,
        posts: {
          all,
          filtered,
        },
      };
    });
  }

  filterByMediaType(mediaType: string) {
    this.setState(previousState => {
      const { posts: { all }, filters: { image, link } } = previousState;
      const filtered = previousState.posts.filtered.filter(post => {
        return !!post[mediaType];
      });

      const nextState = {
        filters: {
          image,
          link,
        },
        posts: {
          all,
          filtered,
        },
      };
      nextState.filters[mediaType] = true;
      return nextState;
    });
  }

  clearFilters(): void {
    this.setState({
      category: null,
      posts: {
        all: this.state.posts.all,
        filtered: this.state.posts.all,
      },
      filters: {
        images: null,
        links: null,
      },
    });
  }

  render() {
    return (
      <div className="app">
        <Nav />
        <Grid fluid>
          <Row>
            {/* Sidebar area */}
            <Col xs={12} sm={2}>
              <Sidebar
                onMediaFilterSelect={this.filterByMediaType}
                category={this.state.category}
                onClearFilter={this.clearFilters}
                onFilterSelect={this.selectPostCategory}
              />
            </Col>

            {/* Main post area */}
            <Col xs={12} sm={8}>
              <CreatePost onSubmit={this.handlePostSubmit} />
              {
                this.state.category || this.state.filters.links || this.state.filters.images ?
                  <h4>
                    Posts {this.state.category ? `about ${this.state.category}` : null} {this.state.filters.image ? 'with images' : null} {this.state.filters.link ? 'and links' : null}
                  </h4>
                :
                null
              }

              {/* Loader */}
               {
                this.state.loaded ?
                  <Posts posts={this.state.posts.filtered} />
                :
                  <div className="loader">
                    <Loader type="line-scale" active={this.state.loaded} />
                  </div>
              }
              {/* No posts :( */}
              {
                this.state.loaded && this.state.posts.filtered.length === 0 ?
                  <h2>No posts found matching your criteria ☹️</h2>
                  :
                  null
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
