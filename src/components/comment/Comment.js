import PropTypes from 'prop-types';
import React from 'react';
import humanize from 'humanize-duration';

const Comment = props => {
    const { comment } = props;
    return (
        <div className="comment" key={comment.id}>
            <div className="user-header">
                <img
                    src={comment.user.profilePicture}
                    width={25}
                    height={25}
                    className="img-circle"
                    alt={comment.user.name}
                />
                <a>{comment.user.name}</a>
                <small className="date">
                    {humanize(new Date() - new Date(comment.date), { largest: 1 })} ago
                </small>
            </div>
            <p className="content"> {comment.content} </p>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.shape({
        content: PropTypes.string,
        user: PropTypes.object,
        date: PropTypes.string,
        likes: PropTypes.number
    })
};

export default Comment;
