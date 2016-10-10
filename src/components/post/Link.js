import React, { PropTypes } from 'react';

const Link = (props) => {
  const { post: { link } } = props;
  return (
    link ?
      <div className="link">
        <a className="title" href={link.url}>
          <h4>{link.title}</h4>
        </a>
        <div className="url">{link.url}</div>
        <p className="description">{link.description}</p>
      </div>
    :
    null
  );
};

Link.propTypes = {
  post: PropTypes.object.isRequired,
};

export { Link };
