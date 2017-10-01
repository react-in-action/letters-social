import PropTypes from 'prop-types';
import React from 'react';

class CreateComment extends React.Component {
    static propTypes = {
        post: PropTypes.object.isRequired,
        handleSubmit: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            content: ''
        };
        this.handleCommentUpdate = this.handleCommentUpdate.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handleCommentUpdate(event) {
        const content = event.target.value;
        this.setState(() => ({ content }));
    }
    handleSubmit(event) {
        const { post, user } = this.props;
        event.preventDefault();
        this.props.handleSubmit({
            userId: user.id,
            postId: post.id,
            content: this.state.content.trim()
        });
        this.setState(() => ({ content: '' }));
    }
    render() {
        return (
            <form onSubmit={this.handleSubmit} className="create-comment">
                <input
                    type="text"
                    placeholder="Write a comment..."
                    onChange={this.handleCommentUpdate}
                    className="create-comment"
                    value={this.state.content}
                />
            </form>
        );
    }
}

export default CreateComment;
