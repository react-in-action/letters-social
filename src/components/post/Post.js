import PropTypes from 'prop-types';
import React from 'react';
import Comments from '../comment/Comments';

import Content from './Content';
import Image from './Image';
import Link from './Link';
import Controls from './Controls';
import User from './User';

import RouterLink from '../router/Link';

function Post(props) {
    const { post, forceOpen } = props;
    return post
        ? <div className="post">
              <RouterLink to={`/posts/${post.id}`}>
                  <div>
                      <User post={post} />
                      <Content post={post} />
                      <Image post={post} />
                      <Link link={post.link} />
                  </div>
              </RouterLink>

              {post.comments
                  ? <Comments forceOpen={forceOpen} post={post} />
                  : null}

              <Controls post={post} />
          </div>
        : null;
}

Post.propTypes = {
    post: PropTypes.object,
    forceOpen: PropTypes.bool
};

export default Post;
