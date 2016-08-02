import React, { PropTypes } from 'react';
import Comments from '../comment/Comments';
import Content from './Content';
import Controls from './Controls';
import Image from './Image';
import Link from './Link';
import User from './User';

const Post = (props: Object) => {
  const { post } = props;
  return (
    post ?
      <div
        className="post"
      >
        <User {...props} />
        <Content {...props} />
        <Image {...props} />
        <Link {...props} />
        { post.comments ? <Comments {...props} /> : null }
        <Controls {...props} />
      </div>
    :
      null
  );
};

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export default Post;
