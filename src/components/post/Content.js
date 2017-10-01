import PropTypes from 'prop-types';
import React from 'react';

const Content = ({ post }) => <p className="content">{post.content}</p>;

Content.propTypes = {
    post: PropTypes.object
};

export default Content;
