import PropTypes from 'prop-types';
import React from 'react';
import { Button } from 'react-bootstrap';

const Filter = props => {
    const { onClick, filterName } = props;
    return (
        <Button onClick={() => onClick(filterName)} className="filter">
            {filterName}
        </Button>
    );
};

Filter.propTypes = {
    onClick: PropTypes.func.isRequired,
    filterName: PropTypes.string.isRequired
};

export default Filter;
