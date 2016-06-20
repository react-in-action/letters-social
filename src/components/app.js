import React from 'react';
import Nav from './nav/navbar';
import { Col, Grid, Row } from 'react-bootstrap';
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
                this.state.posts.map(post =>
                  <div
                    className="post"
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
                    {
                      post.comments.map(() => {
                        return (
                          <div className="comment" key={Math.random()}>
                            a comment!
                          </div>
                        );
                      })
                    }
                  </div>
                )
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
