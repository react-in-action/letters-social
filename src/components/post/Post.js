import React, { Component, PropTypes } from 'react';
import Comments from '../comment/Comments';

import { Content, Image, Link, Controls, User } from './';

import { Link as RouterLink } from '../router';

class Post extends Component {
  static propTypes = {
    post: PropTypes.object,
    forceOpen: PropTypes.bool,
  }

  render() {
    const { post, forceOpen } = this.props;
    return (
      post ?
        <div className="post">
          <RouterLink to={`/posts/${post.id}`}>
            <div>
              <User post={post} />
              <Content post={post} />
              <Image post={post} />
              <Link post={post} />
            </div>
          </RouterLink>

          { post.comments ? <Comments forceOpen={forceOpen} post={post} /> : null }

          <Controls post={post} />
        </div>
      :
        null
    );
  }
}

export { Post };
