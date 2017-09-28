import PropTypes from 'prop-types';
import React from 'react';

/**
 * Contains the commenting and like buttons for a given post; controls showing comments or not
 * @method PostActionSection
 * @module letters/components
 * @param  {Function}          props
 */
const PostActionSection = props => {
    const { showComments } = props;
    return (
        <div className="post-actions">
            <span>
                <i className={'fa fa-thumbs-o-up'} />
            </span>
            <button className="open">
                <i className="fa fa-commenting-o" />{' '}
                <i className={`fa ${showComments ? 'fa-angle-up' : 'fa-angle-down'}`} />
            </button>
        </div>
    );
};

PostActionSection.propTypes = {
    showComments: PropTypes.bool.isRequired
};

export default PostActionSection;
