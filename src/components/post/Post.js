import PropTypes from 'prop-types';
import React from 'react';

import Content from './Content';
import Image from './Image';
import Link from './Link';
import PostActionSection from './PostActionSection';
import User from './User';
import Comments from '../comment/Comments';
import DisplayMap from '../map/DisplayMap';

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
            {post.location && <DisplayMap location={post.location} />}
            <PostActionSection postId={post.id} />
            <Comments postId={post.id} />
        </div>
    ) : null;
}

Post.propTypes = {
    post: PropTypes.object.isRequired
};

export default Post;
