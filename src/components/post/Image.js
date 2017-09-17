import PropTypes from 'prop-types';
import React from 'react';

/**
 * Displays images
 * @method Image
 * @param  {object} props 
 */
const Image = props => {
    if (props.post && props.post.image) {
        return <img className="img-responsive" src={props.post.image} alt="" />;
    }
    return null;
};

Image.propTypes = {
    post: PropTypes.shape({ image: PropTypes.string })
};

export default Image;
