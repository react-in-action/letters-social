import React, { PropTypes } from 'react';

const Image = (props) => {
  const { post } = props;
  return (
    post.image ?
      <img className="img-responsive" src={post.image} alt="" />
    : null
  );
};

Image.propTypes = {
  post: PropTypes.object,
};

export default Image;
