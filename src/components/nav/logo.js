// @flow
import React from 'react';

const Logo = (props) => {
  return (
    <div className="logo" style={{ fontSize: `${props.size}em` }}>
      <span style={{ color: '#4F93E0' }}>L</span>
      <span style={{ color: '#D0021B' }}>e</span>
      <span style={{ color: '#F8E71C' }}>t</span>
      <span style={{ color: '#4F93E0' }}>t</span>
      <span style={{ color: '#417505' }}>e</span>
      <span style={{ color: '#D0021B' }}>r</span>
      <span style={{ color: '#F8E71C' }}>s</span>
      <small className="social">.social</small>
    </div>
  );
};

Logo.propTypes = {
  size: React.PropTypes.number,
};

Logo.defaultProps = {
  size: 2.3,
};

export default Logo;
