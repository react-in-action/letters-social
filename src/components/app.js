import React from 'react';
import Nav from './nav/navbar';
import { Col, Grid, Row } from 'react-bootstrap';
import Post from './post/Post';
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
  componentDidMount() {
    fetch(`${endpoint}/posts`)
    .then(res => res.json())
    .then(posts => this.setState({
      posts,
      loaded: true,
    }));
  }
  render() {
    return (
      <div className="app">
        <Nav />
        <Grid fluid>
          <Row>
            <Col sm={12}>
              {
                this.state.loaded ?
                this.state.posts.map(post => <Post post={post} />)
                :
                  <div>loading...</div>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
