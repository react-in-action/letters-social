// @flow

import React, { PropTypes } from 'react';
import Comments from '../comment/Comments';
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
      <p>
        {post.content}
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
