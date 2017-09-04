import PropTypes from 'prop-types';
import React from 'react';

import Link from '../../components/router/Link';

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
    size: PropTypes.number,
    logoOnly: PropTypes.bool
};

Logo.defaultProps = {
    size: 1.75,
    logoOnly: true
};

export default Logo;
