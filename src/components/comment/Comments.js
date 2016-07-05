import React, { PropTypes } from 'react';
import Comment from './Comment';
import fetch from 'isomorphic-fetch';
import { Button } from 'react-bootstrap';

export default class Comments extends React.Component {
  static propTypes = {
    post: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      comments: [],
      showComments: false,
      commentsLoaded: false,
    };
  }

  toggle() {
    this.setState({
      showComments: !this.state.showComments,
    });
  }

  render() {
    const { post } = this.props;
    return (
      <div className="comments">
        {
          this.state.showComments && post.comments.length > 0 ?
          post.comments.map(comment =>
            <Comment key={comment.id} comment={comment} />
          )
          :
          null
        }
        {
          post.comments.length > 0 ?
            <Button
              onClick={this.toggle}
              className="pull-right"
            >
              <i
                className={`fa ${this.state.showComments ? 'fa-angle-up' : 'fa-angle-down'}`}
              ></i>
            </Button>
          :
            null
        }
      </div>
    );
  }
}
