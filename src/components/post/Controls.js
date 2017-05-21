import PropTypes from 'prop-types';
import React from 'react';

const Controls = props => {
    const { post } = props;

    function showLikeCounter() {
        return post.likes > 0;
    }

    function showCommentCounter() {
        return post.comments && post.comments.length > 0;
    }

    function applyCounterClassIf(count) {
        return count ? 'control-with-counter' : null;
    }

    return (
        <div className="btn-group">
            <button className="btn btn-default control">
                <i
                    className={`fa fa-thumbs-o-up ${applyCounterClassIf(showLikeCounter())}`}
                />
                {showLikeCounter() ? post.likes : null}
            </button>
            <button className="btn btn-default control">
                <i
                    className={`fa fa-comment ${applyCounterClassIf(showCommentCounter())}`}
                />
                {showCommentCounter() ? post.comments.length : null}
            </button>
            <button className="btn btn-default control">
                <i className="fa fa-share" />
            </button>
        </div>
    );
};

Controls.propTypes = {
    post: PropTypes.object.isRequired
};

export default Controls;
