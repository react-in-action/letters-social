import PropTypes from 'prop-types';
import React from 'react';

import Loader from '../Loader';
import Comment from './Comment';

const Comments = props => {
    const { comments, show, post, handleSubmit, user } = props;
    if (show && !comments) {
        return <Loader />;
    }
    return (
        <div className="comments">
            {show && comments.map(comment => <Comment key={comment.id} comment={comment} />)}
        </div>
    );
};
Comments.propTypes = {
    comments: PropTypes.array,
};
export default Comments;
