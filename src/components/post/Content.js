import PropTypes from 'prop-types';
import React from 'react';

/**
 * Displays post content
 * @method Content
 * @param  {object} props
 */
const Content = props => {
    const { post } = props;
    return <p className="content">{post.content}</p>;
};

Content.propTypes = {
    post: PropTypes.object
};

export default Content;
