import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const Controls = (props) => {
  const { post } = props;

  function showLikeCounter() {
    return post.likes > 0;
  }
  function showCommentCounter() {
    return post.comments.length > 0;
  }

  function applyCounterClass(count) {
    return count ? 'control-with-counter' : null;
  }

  return (
    <ButtonGroup>
      <Button className="control">
        <i className={`fa fa-thumbs-o-up ${applyCounterClass(showLikeCounter())}`}></i>
        {showLikeCounter() ? post.likes : null}
      </Button>
      <Button className="control">
        <i className={`fa fa-comment ${applyCounterClass(showCommentCounter())}`} />
        {showCommentCounter() ? post.comments.length : null}
      </Button>
      <Button className="control">
        <i className="fa fa-share"></i>
      </Button>
    </ButtonGroup>
  );
};

Controls.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Controls;
