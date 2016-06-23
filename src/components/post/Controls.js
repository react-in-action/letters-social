import React, { PropTypes } from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

const Controls = (props) => {
  const { post } = props;
  const showLikeCounter = post.likes > 0;
  const showCommentCounter = post.comments.length > 0;
  function applyCounterClass(count) {
    return count ? 'control-with-counter' : null;
  }
  return (
    <ButtonGroup>
      <Button className="control">
        <i className={`fa fa-thumbs-o-up ${applyCounterClass(showLikeCounter)}`}></i>
        {showLikeCounter ? post.comments.length : null}
      </Button>
      <Button className="control">
        <i className={`fa fa-comment ${applyCounterClass(showCommentCounter)}`} />
        {showCommentCounter ? post.comments.length : null}
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
