import React, { PropTypes } from 'react';

const Logo = (props) => {
  return (
    <div className="logo" style={{ fontSize: `${props.size}em` }}>
      <a href="/">
        <span style={{ color: '#4F93E0' }}>L</span>
        <span style={{ color: '#D0021B' }}>e</span>
        <span style={{ color: '#F8E71C' }}>t</span>
        <span style={{ color: '#4F93E0' }}>t</span>
        <span style={{ color: '#417505' }}>e</span>
        <span style={{ color: '#D0021B' }}>r</span>
        <span style={{ color: '#F8E71C' }}>s</span>
        {
          props.logoOnly ?
          null
          :
            <small className="social">.social</small>
        }
      </a>
    </div>
  );
};

Logo.propTypes = {
  size: PropTypes.number,
  logoOnly: PropTypes.bool,
};

Logo.defaultProps = {
  size: 2.3,
  logoOnly: true,
};

export default Logo;
