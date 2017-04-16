import React, { PropTypes } from 'react';

const Image = props => {
    if (props.post && props.post.image) {
        return <img className="img-responsive" src={props.post.image} alt="" />;
    }
    return null;
};

Image.propTypes = {
    post: PropTypes.shape({ image: PropTypes.string })
};

export { Image };
