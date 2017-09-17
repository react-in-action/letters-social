import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';
import Post from './Post';

export function Posts(props) {
    return (
        <div className="posts">{props.posts.map(post => <Post key={post.id} post={post} />)}</div>
    );
}
Posts.propTypes = {
    posts: PropTypes.array
};
export function mapStateToProps(state) {
    return {
        posts: state.posts
    };
}
export default connect(mapStateToProps)(Posts);
