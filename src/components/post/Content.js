import PropTypes from 'prop-types';
import React from 'react';

const Content = props => {
    const { post } = props;
    return (
        <p className="content">
            {post.content}
        </p>
    );
};

Content.propTypes = {
    post: PropTypes.object
};

export default Content;
