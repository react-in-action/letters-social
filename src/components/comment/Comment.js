import React, { PropTypes } from 'react';
import moment from 'moment';

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comment" key={comment.id}>
      <img
        src={comment.user.profilePicture}
        width={50}
        height={50}
        alt={comment.content}
      />
      <a>{comment.user.firstName} {comment.user.lastName}</a>
      <small>
        {moment(comment.date).fromNow()}
      </small>
      <p>
        {comment.content}
      </p>
    </div>
  );
};

Comment.propTypes = {
  comment: PropTypes.shape({
    content: PropTypes.string,
    user: PropTypes.object,
    date: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Comment;
