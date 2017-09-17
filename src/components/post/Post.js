import PropTypes from 'prop-types';
import React from 'react';

import Content from './Content';
import Image from './Image';
import Link from './Link';
import PostActionSection from './PostActionSection';
import Comments from '../comment/Comments';
import DisplayMap from '../map/DisplayMap';
import UserHeader from '../post/UserHeader';

import RouterLink from '../router/Link';

/**
 * Displays a post
 * @method      Post
 * @param       {props} props
 * @constructor
 */
function Post(props) {
    const { post } = props;
    return post ? (
        <div className="post">
            <RouterLink to={`/posts/${post.id}`}>
                <span>
                    <UserHeader date={post.date} user={post.user} />
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
