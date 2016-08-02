import React, { PropTypes } from 'react';
import moment from 'moment';

const User = (props) => {
  const { post } = props;
  return (
    <div className="user">
      {
        post.user ?
          <div>
            <img
              src={post.user.profilePicture}
              width={50}
              height={50}
              alt={post.content}
            />
            <a>
              {post.user.firstName} {post.user.lastName}
            </a>
            <small className="date pull-right">
              {moment(post.date).fromNow()}
            </small>
          </div>
        :
          <span>
            Anonymous user <i className="fa fa-user" />
          </span>
      }
    </div>
  );
};

User.propTypes = {
  post: PropTypes.object.isRequired,
};

export default User;
