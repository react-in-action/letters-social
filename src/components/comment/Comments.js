import React, { PropTypes } from 'react';
import Comment from './Comment';

export default class Comments extends React.Component {
  static propTypes = {
    post: PropTypes.object,
  }
  constructor(props) {
    super(props);
    this.toggle = this.toggle.bind(this);
    this.state = {
      showComments: false,
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
        <span>
          <i className="fa fa-comments-o"></i> {post.comments.length}
        </span>
        <br />
        {
          post.comments.length > 0 ?
            <a
              style={{ cursor: 'pointer' }}
              onClick={this.toggle}
            >
              {this.state.showComments ? 'Hide' : 'show'} comments
              &nbsp;
              <i
                className={`fa ${this.state.showComments ? 'fa-angle-up' : 'fa-angle-down'}`}
              ></i>
            </a>
          :
            null
        }
      </div>
    );
  }
}
