// @flow

import React, { PropTypes } from 'react';
import Comments from '../comment/Comments';

const Post = (props: Object) => {
  const { post } = props;
  return (
    <div
      className="post"
      key={post.id}
    >
      <img
        src={post.image}
        width={50}
        height={50}
        alt={post.content}
      />
      <span>
        user: {post.user}
      </span>
      <p>
        content: {post.content}
      </p>
      <Comments {...props} />
      {/* <Controls {...props} />*/}
    </div>
  );
};

Post.propTypes = {
  post: PropTypes.object,
};

export default Post;
