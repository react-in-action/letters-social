import PropTypes from 'prop-types';
import React from 'react';

// TODO: bind to global like action for post
const Like = props => {
    const { post } = props;

    function showLikeCounter() {
        return post.likes > 0;
    }
    function applyCounterClassIf(count) {
        return count ? 'control-with-counter' : null;
    }

    return (
        <div className="controls">
            <i className={`fa fa-thumbs-o-up ${applyCounterClassIf(showLikeCounter())}`} />{' '}
            {showLikeCounter() ? post.likes : null}
        </div>
    );
};

Like.propTypes = {
    post: PropTypes.object.isRequired
};

export default Like;
