import React, { PropTypes } from 'react';

const Ad = (props) => {
  const { url, urlTitle, title, image } = props;
  return (
    <div {...props} className="ad">
      <div className="title">{title}</div>
        {
          image ?
            <img src={image} alt="" />
            :
            null
        }
      <div className="ad-url">
        <a href={url}>{urlTitle}</a>
      </div>
    </div>
  );
};

Ad.propTypes = {
  url: PropTypes.string,
  title: PropTypes.string,
  urlTitle: PropTypes.string,
  image: PropTypes.string,
};

Ad.defaultProps = {
  url: 'http://learnreactjs.io',
};

export default Ad;
