import PropTypes from 'prop-types';
import React from 'react';
import Comments from '../comment/Comments';

import Content from './Content';
import Image from './Image';
import Link from './Link';
import Like from './Like';
import User from './User';

import RouterLink from '../router/Link';

function Post(props) {
    const { post } = props;
    return post ? (
        <div className="post">
            <RouterLink to={`/posts/${post.id}`}>
                <span>
                    <User post={post} />
                    <Content post={post} />
                    <Image post={post} />
                    <Link link={post.link} />
                </span>
            </RouterLink>
            <Comments show={post.showComments} postId={post.id} />
            <Like post={post} />
        </div>
    ) : null;
}

Post.propTypes = {
    post: PropTypes.object
};

export default Post;
