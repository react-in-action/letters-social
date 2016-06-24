// @flow

import React, { PropTypes } from 'react';
import Comments from '../comment/Comments';
import moment from 'moment';
import Controls from './Controls';

const Post = (props: Object) => {
  const { post } = props;
  return (
    <div
      className="post"
      key={post.id}
    >
      <img
        src={post.user.profilePicture}
        width={50}
        height={50}
        alt={post.content}
      />
      <a>{post.user.firstName} {post.user.lastName}</a>
      <small className="date pull-right">{moment(post.date).fromNow()}</small>
      <p>
        {post.content}
        <img className="img-responsive" src={post.image} alt="" />
      </p>
      <Comments {...props} />
      <Controls {...props} />
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export default Post;
