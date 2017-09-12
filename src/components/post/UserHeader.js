import PropTypes from 'prop-types';
import React from 'react';
import humanize from 'humanize-duration';

const UserHeader = props => {
    const { date, user } = props;
    return (
        <div className="user-header">
            <div className="user-info-section">
                <img src={user.profilePicture} width={25} height={25} className="img-circle" />
                <a>{user.name}</a>
            </div>
            <small className="date">
                {humanize(new Date() - new Date(date), {
                    largest: 1,
                    round: true,
                    units: ['d', 'h', 'm']
                })}{' '}
                ago
            </small>
        </div>
    );
};

UserHeader.propTypes = {
    date: PropTypes.number,
    user: PropTypes.shape({
        profilePicture: PropTypes.string.isRequired,
        name: PropTypes.string
    })
};

UserHeader.defaultProps = {
    user: {
        profilePicture: '/static/assets/users/4.jpeg'
    }
};

export default UserHeader;
