import React, { PropTypes } from 'react';

const Image = props => props.post.image && <img className="img-responsive" src={props.post.image} alt="" />;

Image.propTypes = {
  post: PropTypes.shape({
    image: PropTypes.string,
  }),
};

export { Image };
