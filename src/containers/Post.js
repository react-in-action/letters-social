import React, { Component } from 'react';
import fetch from 'isomorphic-fetch';

import { Post } from '../components/post';

import { Link } from '../components/router';


export class SinglePost extends Component {
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    const { params } = this.props;
    fetch(`${process.env.ENDPOINT}/posts/${params.post}`)
        .then(res => res.json())
        .then(post => this.setState({ post }));
  }

  render() {
    return (
      this.state.post &&
      <div className="row">
        <div className="col-xs-2">
          <Link to="/home">
            <div>
              Back
            </div>
          </Link>
        </div>
        <div className="col-xs-10 col-sm-8">
          <Post post={this.state.post} />
        </div>
      </div>
    );
  }
}
