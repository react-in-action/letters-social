import PropTypes from 'prop-types';
import React from 'react';
import { connect } from 'react-redux';

import { createComment } from '../../actions/comments';
import Loader from '../Loader';
import Comment from './Comment';
import CreateComment from './Create';

const Comments = props => {
    const { comments, show, post, handleSubmit, user } = props;
    if (show && !comments) {
        return <Loader />;
    }
    return (
        <div className="comments">
            {show && [
                ...comments.map(comment => <Comment key={comment.id} comment={comment} />),
                <CreateComment key={post.id} handleSubmit={handleSubmit} post={post} user={user} />
            ]}
        </div>
    );
};

Comments.propTypes = {
    comments: PropTypes.array
};

const mapStateToProps = (state, ownProps) => {
    const { postId } = ownProps;
    const post = state.posts[postId];
    const user = state.user;
    const comments = state.commentIds
        .filter(commentId => state.comments[commentId].postId === postId)
        .map(commentId => state.comments[commentId]);
    const show = post.showComments;
    return { comments, show, post, user };
};
const mapDispatchToProps = dispatch => {
    return {
        handleSubmit(comment) {
            dispatch(createComment(comment));
        }
    };
};
export default connect(mapStateToProps, mapDispatchToProps)(Comments);
