import PropTypes from 'prop-types';
import React from 'react';

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
