import React, { PropTypes } from 'react';

const Link = (props) => {
  const { post } = props;
  return (
    <div className="link">
      <a href={post.link}></a>
    </div>
  );
};

Link.propTypes = {
  post: PropTypes.object.isRequired,
};

export default Link;
