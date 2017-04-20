import PropTypes from 'prop-types';
import React from 'react';
import Filter from 'bad-words';

const filter = new Filter();

class CreatePost extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };

    constructor(props) {
        super(props);

        // Set up state
        this.state = {
            content: '',
            valid: null
        };

        // Set up event handlers
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
    }

    handlePostChange(event) {
        const content = filter.clean(event.target.value);
        this.setState({
            content,
            valid: content.length <= 300
        });
    }

    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.valid) {
            return;
        }
        if (this.props.onSubmit) {
            const newPost = {
                date: Date.now(),
                // Assign a temporary key to the post; the API will create a real one for us
                id: Date.now(),
                content: this.state.content
            };

            this.props.onSubmit(newPost);
            this.setState({
                content: '',
                valid: null
            });
        }
    }

    render() {
        return (
            <form className="create-post" onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
                <button className="btn btn-default">Post</button>
            </form>
        );
    }
}

export default CreatePost;
