import PropTypes from 'prop-types';
import React from 'react';
import { ButtonGroup, Button } from 'react-bootstrap';

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
        <ButtonGroup>
            <Button className="control">
                <i
                    className={`fa fa-thumbs-o-up ${applyCounterClassIf(showLikeCounter())}`}
                />
                {showLikeCounter() ? post.likes : null}
            </Button>
            <Button className="control">
                <i
                    className={`fa fa-comment ${applyCounterClassIf(showCommentCounter())}`}
                />
                {showCommentCounter() ? post.comments.length : null}
            </Button>
            <Button className="control">
                <i className="fa fa-share" />
            </Button>
        </ButtonGroup>
    );
};

Controls.propTypes = {
    post: PropTypes.object.isRequired
};

export default Controls;
