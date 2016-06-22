import React, { PropTypes } from 'react';
import moment from 'moment';

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comment" key={comment.id}>
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
    user: PropTypes.string,
    date: PropTypes.string,
    likes: PropTypes.number,
  }),
};

export default Comment;
