import React, { PropTypes } from 'react';

const Avatar = (props) => <img src={props.url} alt={props.alt} />;

Avatar.propTypes = {
  url: PropTypes.string.isRequired,
  alt: PropTypes.string,
};

Avatar.defaultProps = {
  url: 'https://s3-us-west-2.amazonaws.com/if-else/4926721-5.jpg',
  alt: 'React in Action',
};

export default Avatar;
