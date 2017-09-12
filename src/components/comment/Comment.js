import PropTypes from 'prop-types';
import React from 'react';

import UserHeader from '../post/UserHeader';

const Comment = props => {
    const { comment } = props;
    return (
        <div className="comment" key={comment.id}>
            <UserHeader
                user={comment.user}
                profilePicture={comment.user.profilePicture}
                date={comment.date}
            />
            <p className="content"> {comment.content} </p>
        </div>
    );
};

Comment.propTypes = {
    comment: PropTypes.shape({
        content: PropTypes.string,
        user: PropTypes.object,
        date: PropTypes.number,
        likes: PropTypes.number
    })
};

export default Comment;
