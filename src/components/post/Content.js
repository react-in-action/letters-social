import PropTypes from 'prop-types';
import React from 'react';

/**
 * Displays post content
 * @method Content
 * @param  {object} props
 */
const Content = ({ post }) => <p className="content">{post.content}</p>;

Content.propTypes = {
    post: PropTypes.object
};

export default Content;
