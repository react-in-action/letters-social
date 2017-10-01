import PropTypes from 'prop-types';
import React from 'react';
import Filter from 'bad-words';

class CreatePost extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.initialState = {
            content: '',
            valid: false,
            showLocationPicker: false,
            location: {
                lat: 34.1535641,
                lng: -118.1428115,
                name: null
            },
            locationSelected: false
        };
        this.state = this.initialState;
        this.filter = new Filter();
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleSubmit = this.handleSubmit.bind(this);
    }
    handlePostChange(e) {
        const content = this.filter.clean(e.target.value);
        this.setState(() => {
            return {
                content,
                valid: content.length <= 280
            };
        });
    }
    handleSubmit() {
        if (!this.state.valid) {
            return;
        }
        const newPost = {
            content: this.state.content
        };
        this.props.onSubmit(newPost);
        this.setState(() => ({
            content: '',
            valid: false
        }));
    }
    render() {
        return (
            <div className="create-post">
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
                <div className="controls">
                    <button onClick={this.handleSubmit}>Post</button>
                </div>
            </div>
        );
    }
}

export default CreatePost;
