import React, { PropTypes } from 'react';
import { Button } from 'react-bootstrap';
import Comment from './Comment';
import CreateComment from './Create';

export default class Comments extends React.Component {
  static propTypes = {
    post: PropTypes.object,
  }
  constructor(props) {
    super(props);

    // Bind methods
    this.toggle = this.toggle.bind(this);
    this.handleCommentSubmit = this.handleCommentSubmit.bind(this);

    // initialize state
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

  handleCommentSubmit(id) {
    console.log('Thread id: ', id);
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
          this.state.showComments ?
            <CreateComment handleSubmit={this.handleCommentSubmit} threadID={post.id} />
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
              />
            </Button>
          :
            null
        }
      </div>
    );
  }
}
