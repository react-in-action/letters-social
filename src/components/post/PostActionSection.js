import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getCommentsForPost, toggleComments } from '../../actions/comments';

// TODO: bind to global like action for post
/**
 * Contains the commenting and like buttons for a given post; controls showing comments or not
 * @method PostActionSection
 * @module letters/components
 * @param  {Function}          props
 */
const PostActionSection = props => {
    return (
        <div className="post-actions">
            <button onClick={props.loadAndShowComments} className="pull-right open">
                <i className="fa fa-commenting-o" />{' '}
                <i className={`fa ${props.showComments ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </button>
            <i
                className={`fa fa-thumbs-o-up ${props.likes.length
                    ? 'control-with-counter'
                    : null}`}
            />{' '}
            <span>{props.likes.length}</span>
        </div>
    );
};

PostActionSection.propTypes = {
    likes: PropTypes.array.isRequired,
    showComments: PropTypes.bool.isRequired,
    comments: PropTypes.number.isRequired
};

const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;
    const { likes, showComments } = state.posts[postId];
    const comments = state.commentIds.filter(
        commentId => state.comments[commentId].postId === postId
    ).length;
    return {
        likes,
        showComments: Boolean(showComments),
        comments
    };
};

// TODO: WIRE to like function
const mapDispatchToProps = (dispatch, ownProps) => {
    const { postId } = ownProps;
    return {
        loadAndShowComments() {
            dispatch(toggleComments(postId));
            dispatch(getCommentsForPost(postId));
        }
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(PostActionSection);
