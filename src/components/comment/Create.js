import PropTypes from 'prop-types';
import React from 'react';

class CreateComment extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            comment: ''
        };
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
    }
    handleCommentUpdate(event) {
        this.setState({
            comment: event.target.value
        });
    }
    handleSubmit(event) {
        event.preventDefault();
        const { threadID, handleSubmit } = this.props;
        console.log('Submitting');
        console.log(event.target);
        handleSubmit(threadID);
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="create-comment">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    onChange={this.handleCommentUpdate}
                    className="create-comment"
                />
            </form>
        );
    }
}

CreateComment.propTypes = {
    threadID: PropTypes.string.isRequired,
    handleSubmit: PropTypes.func.isRequired
};

export default CreateComment;
