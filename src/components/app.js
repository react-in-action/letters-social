import React from 'react';
import Nav from './nav/navbar';
import { Col, Grid, Row } from 'react-bootstrap';
import fetch from 'isomorphic-fetch';
import '../styles/styles.scss';

export class App extends React.Component {
  constructor() {
    super();
    this.state = {
      posts: [],
      loaded: false,
    };
  }
  componentDidMount() {
    fetch('http://localhost:3500/posts')
    .then(res => res.json())
    .then(posts => {
      this.setState({
        posts,
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
            <Col sm={12}>
              {
                this.state.loaded ?
                this.state.posts.map(post =>
                  <div
                    style={{
                      border: '1px solid grey',
                      padding: 10, margin: 10,
                      borderRadius: '5px 5px',
                    }}
                    key={post.id}
                  >
                    <img
                      src={post.image}
                      width={25}
                      height={25}
                      alt=""
                    />
                    <span>
                      user: {post.user}
                    </span>
                    <p>
                      content: {post.content}
                    </p>
                  </div>
                )
                :
                  <div>loading!</div>
              }
            </Col>
          </Row>
        </Grid>
      </div>
    );
  }
}
