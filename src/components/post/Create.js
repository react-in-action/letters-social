import PropTypes from 'prop-types';
import React from 'react';
import Filter from 'bad-words';
import classnames from 'classnames';

import DisplayMap from '../map/DisplayMap';

const filter = new Filter();

class CreatePost extends React.Component {
    static propTypes = {
        onSubmit: PropTypes.func.isRequired
    };
    constructor(props) {
        super(props);
        this.state = {
            content: '',
            valid: false,
            showLocationPicker: false,
            location: null
        };
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleToggleLocation = this.handleToggleLocation.bind(this);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.renderLocationControls = this.renderLocationControls.bind(this);
        this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
    }
    handlePostChange(event) {
        const content = filter.clean(event.target.value);
        this.setState(() => {
            return {
                content,
                valid: content.length <= 300
            };
        });
    }
    handleRemoveLocation() {
        this.setState(() => ({ location: null }));
    }
    handleSelectLocation(location) {
        this.setState(() => ({
            location,
            showLocationPicker: false
        }));
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
                showLocationPicker: !state.showLocationPicker
            };
        });
    }
    // We can implement a "subrender" method here and not clutter the main render method with tons
    // of conditional logic. This is a helpful pattern to explore when dealing with components that
    // have longer render methods
    renderLocationControls() {
        return (
            <div className="controls">
                <button onClick={this.handleSubmit}>Post</button>
                {this.state.location ? (
                    <button onClick={this.handleRemoveLocation} className="open location-indicator">
                        <i className="fa-location-arrow fa" />
                        <small>{this.state.location.name}</small>
                    </button>
                ) : (
                    <button onClick={this.handleToggleLocation} className="open">
                        {this.state.showLocationPicker ? 'Cancel' : 'Add location'}{' '}
                        <i
                            className={classnames(`fa`, {
                                'fa-map-o': !this.state.showLocationPicker,
                                'fa-times': this.state.showLocationPicker
                            })}
                        />
                    </button>
                )}
            </div>
        );
    }
    render() {
        return (
            <form className="create-post" onSubmit={this.handleSubmit}>
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
                {this.renderLocationControls()}
                <DisplayMap
                    allowInput
                    onLocationSelect={this.handleSelectLocation}
                    show={this.state.showLocationPicker}
                />
            </form>
        );
    }
}

export default CreatePost;
