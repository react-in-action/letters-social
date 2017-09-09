import PropTypes from 'prop-types';
import React from 'react';
import Filter from 'bad-words';
import uuid from 'uuid/v4';
import classnames from 'classnames';

import DisplayMap from '../map/DisplayMap';

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
            valid: false,
            showLocation: false
        };

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleToggleLocation = this.handleToggleLocation.bind(this);
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
                content: this.state.content
            };

            this.props.onSubmit(newPost);
            this.setState({
                content: '',
                valid: null
            });
        }
    }

    handleToggleLocation() {
        this.setState(state => {
            return {
                showLocation: !state.showLocation
            };
        });
    }

    render() {
        return (
            <form className="create-post" onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
                <button>Post</button>
                <button onClick={this.handleToggleLocation} className="open pull-right">
                    {this.state.showLocation ? 'Cancel' : 'Add location'}{' '}
                    <i
                        className={classnames(`fa`, {
                            'fa-map-o': !this.state.showLocation,
                            'fa-times': this.state.showLocation
                        })}
                    />
                </button>
                <div className="addLocation">
                    <DisplayMap allowInput onChange={() => {}} show={this.state.showLocation} />
                </div>
            </form>
        );
    }
}

export default CreatePost;
