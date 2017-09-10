import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getCommentsForPost, toggleComments } from '../../actions/comments';
import { like, unlike } from '../../actions/posts';
// TODO: bind to global like action for post
/**
 * Contains the commenting and like buttons for a given post; controls showing comments or not
 * @method PostActionSection
 * @module letters/components
 * @param  {Function}          props
 */
const PostActionSection = props => {
    const { likes, liked, unlikePost, likePost, loadAndShowComments, showComments } = props;
    return (
        <div className="post-actions">
            <span onClick={liked ? unlikePost : likePost}>
                <i className={liked ? 'fa fa-thumbs-up' : 'fa fa-thumbs-o-up'} /> {likes.length}
            </span>
            <button onClick={loadAndShowComments} className="open">
                <i className="fa fa-commenting-o" />{' '}
                <i className={`fa ${showComments ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </button>
        </div>
    );
};

PostActionSection.propTypes = {
    likes: PropTypes.array.isRequired,
    showComments: PropTypes.bool.isRequired,
    comments: PropTypes.array.isRequired,
    liked: PropTypes.bool
};

const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;
    const { likes, showComments } = state.posts[postId];
    const comments = state.commentIds.filter(commentId => state.comments[commentId].id === postId);
    const liked = likes.find(like => like.postId === postId && state.user.id === like.userId);
    return {
        likes,
        liked: Boolean(liked),
        showComments: Boolean(showComments),
        comments
    };
};

const mapDispatchToProps = (dispatch, ownProps) => {
    const { postId } = ownProps;
    return {
        loadAndShowComments() {
            dispatch(toggleComments(postId));
            dispatch(getCommentsForPost(postId));
        },
        likePost() {
            dispatch(like(postId));
        },
        unlikePost() {
            dispatch(unlike(postId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostActionSection);
