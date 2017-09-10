import PropTypes from 'prop-types';
import React from 'react';
import humanize from 'humanize-duration';

const User = props => {
    const { date, user } = props;
    return (
        <div className="user-header">
            <div className="user-info-section">
                <img src={user.profilePicture} width={25} height={25} className="img-circle" />
                <a>{user.name}</a>
            </div>
            <small className="date">
                {humanize(new Date() - new Date(date), { largest: 1 })} ago
            </small>
        </div>
    );
};

User.propTypes = {
    date: PropTypes.string,
    user: PropTypes.shape({
        profilePicture: PropTypes.string.isRequired,
        name: PropTypes.string
    })
};

export default User;
