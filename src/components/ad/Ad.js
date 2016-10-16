import React, { PropTypes } from 'react';
import { AutoAffix } from 'react-overlays';

const Ad = (props) => {
  return (
    <AutoAffix viewportOffsetTop={props.offset} container={this}>
      <div className="ad">
        <a target="_blank" rel="noreferrer noopener" href={props.url}>
          <img className="img-responsive" src={props.imageUrl} alt="React in Action by Mark Thomas | Manning Publications" />
        </a>
        <small>ads by Letters</small>
      </div>
    </AutoAffix>
  );
};

Ad.propTypes = {
  imageUrl: PropTypes.string,
  url: PropTypes.string,
  offset: PropTypes.number,
};

export { Ad };
