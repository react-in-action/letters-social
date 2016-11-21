import React, { PropTypes } from 'react';

const Link = (props) => {
  const { link } = props;
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
  link: PropTypes.shape({
    url: PropTypes.string.isRequired,
    title: PropTypes.string.isRequired,
    description: PropTypes.string.isRequired,
  }),
};

export { Link };
