import React, { PropTypes, Component } from 'react';
import fetch from 'isomorphic-fetch';

import { Post } from '../components/post';
import { Link } from '../components/router';

export class SinglePost extends Component {
  static propTypes = {
    params: PropTypes.shape({
      post: PropTypes.string,
    }),
  }
  constructor(props) {
    super(props);
    this.state = {
      post: null,
    };
  }

  componentDidMount() {
    fetch(`${process.env.ENDPOINT}/posts/${this.props.params.post}`)
        .then(res => res.json())
        .then(post => this.setState({ post }));
  }

  render() {
    return (
      this.state.post &&
        <div className="container-fluid">
          <div className="row">
            <div className="col-sm-2">
              <Link to="/">
                <div className="pull-right">
                  <br />
                  <i className="fa fa-arrow-left" /> Back
                </div>
              </Link>
            </div>
            <div className="col-xs-12 col-sm-8">
              <Post forceOpen post={this.state.post} />
            </div>
          </div>
        </div>
    );
  }
}
