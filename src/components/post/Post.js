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
    <div
      className="post"
      key={post.id}
    >
      <User {...props} />
      <Content {...props} />
      <Image {...props} />
      <Link {...props} />
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
