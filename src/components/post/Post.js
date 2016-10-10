import React, { Component, PropTypes } from 'react';
import Comments from '../comment/Comments';

import { Content, Image, Link, Controls, User } from './';

import { Link as RouterLink } from '../router';

class Post extends Component {
  render() {
    const { post } = this.props;
    return (
      post ?
        <RouterLink to={`/posts/${post.id}`}>
          <div className="post" >
            <User post={post} />
            <Content post={post} />
            <Image post={post} />
            <Link post={post} />

            { post.comments ? <Comments post={post} /> : null }

            <Controls post={post} />
          </div>
        </RouterLink>
      :
        null
    );
  }
}

Post.propTypes = {
  post: PropTypes.object,
  user: PropTypes.object,
};

export { Post };
