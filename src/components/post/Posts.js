import React, { PropTypes } from 'react';
import { connect } from 'react-redux';
import { Post } from './';

function Posts(props) {
    return (
        <div className="posts">
            {props.posts.map(post => <Post key={post.id} post={post} />)}
        </div>
    );
}

Posts.propTypes = {
    posts: PropTypes.array
};

const PostContainer = connect(state => {
    return {
        posts: state.posts
    };
})(Posts);

export { PostContainer as Posts };
