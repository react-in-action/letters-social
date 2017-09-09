import PropTypes from 'prop-types';
import React from 'react';
import Comments from '../comment/Comments';

import Content from './Content';
import Image from './Image';
import Link from './Link';
import PostActionSection from './PostActionSection';
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
            <PostActionSection postId={post.id} />
            <Comments postId={post.id} />
        </div>
    ) : null;
}

Post.propTypes = {
    post: PropTypes.object.isRequired
};

export default Post;
