import React, { PropTypes } from 'react';

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
export { Content };
