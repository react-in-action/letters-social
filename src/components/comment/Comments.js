import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

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
                ...comments.map(comment => <Comment key={comment.id} comment={comment} />),
                <CreateComment key={postId} handleSubmit={handleCommentSubmit} postId={postId} />
            ]}
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
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
