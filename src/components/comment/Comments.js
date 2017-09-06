import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { getCommentsForPost, toggleComments } from '../../actions/comments';
import Loader from '../Loader';
import Comment from './Comment';
import CreateComment from './Create';

const Comments = props => {
    const { comments, show, postId, handleCommentSubmit } = props;
    if (show && !comments) {
        return <Loader />;
    }
    return (
        <div className="comments">
            {show && [
                comments.map(comment => <Comment key={comment.id} comment={comment} />),
                <CreateComment handleSubmit={handleCommentSubmit} postId={postId} />
            ]}
            <button onClick={props.loadAndShowComments} className="pull-right open">
                <i className="fa fa-commenting-o" />{' '}
                <i className={`fa ${show ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </button>
        </div>
    );
};

Comments.propTypes = {
    comments: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;
    const comments = state.commentIds
        .filter(commentId => state.comments[commentId].postId === postId)
        .map(commentId => state.comments[commentId]);
    const show = state.posts[postId].showComments;
    return { comments, show };
};
const mapDispatchToProps = (dispatch, ownProps) => {
    const { postId } = ownProps;
    return {
        handleCommentSubmit(payload) {
            dispatch();
        },
        loadAndShowComments() {
            dispatch(toggleComments(postId));
            dispatch(getCommentsForPost(postId));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
