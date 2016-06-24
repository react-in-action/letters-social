import React from 'react';
import Nav from './nav/navbar';
import { Col, Grid, Row } from 'react-bootstrap';
import Post from './post/Post';
import Sidebar from './sidebar/Sidebar';
import fetch from 'isomorphic-fetch';

import '../styles/styles.scss';

const endpoint = 'http://localhost:3500';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loaded: false,
    };
  }

  async componentDidMount() {
    const posts = await fetch(`${endpoint}/posts?_limit=10`)
                        .then(res => res.json());

    const joinedPosts = posts.map(async post => {
      post.user = await fetch(`${endpoint}/users/${post.user}`).then(user => user.json());
      post.comments.map(async comment => {
        comment.user = await fetch(`${endpoint}/users/${comment.user}`).then(user => user.json());
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

  render() {
    return (
      <div className="app">
        <Nav />
        <Grid fluid>
          <Row>
            <Col sm={2}>
              <Sidebar />
            </Col>
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
