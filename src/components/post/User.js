import PropTypes from 'prop-types';
import React from 'react';
import humanize from 'humanize-duration';

const User = props => {
    const { post } = props;
    return (
        <div className="user">
            <img
                src={post.user.profilePicture}
                width={25}
                height={25}
                className="img-circle"
                alt={post.content}
            />
            <a>{post.user.name}</a>
            <small className="date pull-right">
                {humanize(new Date() - new Date(post.date), { largest: 1 })} ago
            </small>
        </div>
    );
};

User.propTypes = {
    post: PropTypes.object.isRequired
};

export default User;
