import React from 'react';
import Nav from './nav/navbar';
import { Col, Grid, Row } from 'react-bootstrap';
import Post from './post/Post';
import { includes } from 'lodash';
import Sidebar from './sidebar/Sidebar';
import fetch from 'isomorphic-fetch';

import '../styles/styles.scss';

export class App extends React.Component {
  // Operations usually carried out in componentWillMount go here
  constructor() {
    super();
    this.selectPostCategory = this.selectPostCategory.bind(this);
    this.state = {
      posts: [],
      loaded: false,
    };
  }

  async componentDidMount() {
    console.log('stuff: ', process.env.NODE_ENV);
    const posts = await fetch('http://localhost:3500/posts?_limit=25')
                        .then(res => res.json());

    const joinedPosts = posts.map(async post => {
      post.user = await fetch(`http://localhost:3500/api/users/${post.user}`).then(user => user.json());
      post.comments.map(async comment => {
        comment.user = await fetch(`http://localhost:3500/api/users/${comment.user}`).then(user => user.json());
        return comment;
      });

      return post;
    });

    Promise.all(joinedPosts).then(hydratedPosts => {
      this.setState({
        posts: hydratedPosts,
        loaded: true,
      });
    });
  }

  selectPostCategory(category: string) {
    this.setState(function (previousState) {
      return {
        posts: previousState.posts.filter(post => includes(post.categories, category)),
      };
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
              <Sidebar />
            </Col>
            {/* Main post area */}
            <Col xs={12} sm={8}>
              <div className="posts">
                {
                  this.state.loaded ?
                  this.state.posts.map(post => <Post key={post.id} post={post} />)
                  :
                    <div>loading...</div>
                }
              </div>
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
