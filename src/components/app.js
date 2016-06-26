import { Col, Grid, Row } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import Loader from 'react-loaders';
import Nav from './nav/navbar';
import Posts from './post/Posts';
import React from 'react';
import Sidebar from './sidebar/Sidebar';


import '../styles/styles.scss';

export class App extends React.Component {
  // Operations usually carried out in componentWillMount go here
  constructor() {
    super();
    this.selectPostCategory = this.selectPostCategory.bind(this);
    this.clearFilters = this.clearFilters.bind(this);
    this.filterByMediaType = this.filterByMediaType.bind(this);
  }
  // initialize state
  state = {
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
  };

  async componentDidMount() {
    const posts = await fetch(`${process.env.ENDPOINT}/posts?_limit=25`)
                        .then(res => res.json());

    const joinedPosts = posts.map(async post => {
      post.user = await fetch(`${process.env.ENDPOINT}/users/${post.user}`).then(user => user.json());
      post.comments.map(async comment => {
        comment.user = await fetch(`${process.env.ENDPOINT}/users/${comment.user}`).then(user => user.json());
        return comment;
      });

      return post;
    });

    Promise.all(joinedPosts).then(hydratedPosts => {
      this.setState({
        posts: {
          all: hydratedPosts,
          filtered: hydratedPosts,
        },
        loaded: true,
      });
    });
  }

  selectPostCategory(category: ?string) {
    this.setState((previousState) => {
      const { posts: { all } } = previousState;
      const filtered = previousState.posts.all.filter(post => {
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

      console.log(filtered.length);

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

  removeFilter(filter: string): void {
    // this.setState({
    //   :
    // });
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
              {
                this.state.category || this.state.filters.links || this.state.filters.images ?
                <h4>
                  Posts {this.state.category ? `about ${this.state.category}` : null} {this.state.filters.image ? 'with images' : null} {this.state.filters.link ? 'and links' : null}
                </h4>
                :
                null
              }
               {
                this.state.loaded ?
                  <Posts posts={this.state.posts.filtered} />
                :
                  <div className="loader">
                    <Loader type="line-scale" active={this.state.loaded} />
                  </div>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
