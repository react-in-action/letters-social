// @flow

import React, { PropTypes } from 'react';
import moment from 'moment';
import Avatar from './Avatar';

class Post extends React.Component {
  static propTypes = {
    post: PropTypes.object,
  }
  constructor() {
    super();
    this.state = {
      showComments: false,
    };
  }
  render() {
    const { post } = this.props;
    return (
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
          post.comments.map(comment => {
            return (
              <div className="comment" key={Math.random()}>
                <small>{moment(comment.date).fromNow()}</small>
                <p>
                  {comment.content}
                </p>
              </div>
            );
          })
        }
      </div>
    );
  }
}
export default Post;
