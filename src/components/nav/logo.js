import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../components/router/Link';

/**
 * Letters logo
 * @method Logo
 * @param  {Object} props
 */
const Logo = props => {
    return (
        <Link to="/">
            <div className="logo" style={{ fontSize: `${props.size}em` }}>
                L
            </div>
        </Link>
    );
};

Logo.propTypes = {
    size: PropTypes.number
};

Logo.defaultProps = {
    size: 1.75
};

export default Logo;
