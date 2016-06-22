import React, { PropTypes } from 'react';

const Comment = (props) => {
  const { comment } = props;
  return (
    <div className="comment">
      {comment.date}
      {comment.content}
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
