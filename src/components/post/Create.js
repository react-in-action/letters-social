import PropTypes from 'prop-types';
import React from 'react';
import Filter from 'bad-words';
import classnames from 'classnames';

import DisplayMap from '../map/DisplayMap';
import LocationTypeAhead from '../map/LocationTypeAhead';

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
            location: null,
            locationSelected: false
        };
        this.filter = new Filter();
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handlePostChange = this.handlePostChange.bind(this);
        this.handleToggleLocation = this.handleToggleLocation.bind(this);
        this.renderLocationControls = this.renderLocationControls.bind(this);
        this.handleRemoveLocation = this.handleRemoveLocation.bind(this);
        this.onLocationSelect = this.onLocationSelect.bind(this);
        this.onLocationUpdate = this.onLocationUpdate.bind(this);
    }
    handlePostChange(event) {
        const content = this.filter.clean(event.target.value);
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
    onLocationSelect(location) {
        this.setState(() => ({
            location,
            showLocationPicker: false,
            locationSelected: true
        }));
    }
    handleSubmit(event) {
        event.preventDefault();
        if (!this.state.valid) {
            return;
        }
        const newPost = {
            content: this.state.content,
            location: this.state.location
        };
        this.props.onSubmit(newPost);
        this.setState({
            content: '',
            valid: false,
            showLocationPicker: false,
            location: null
        });
    }
    onLocationUpdate(location) {
        this.setState(() => ({
            location,
            locationSelected: false
        }));
    }
    handleToggleLocation(event) {
        event.preventDefault();
        this.setState(state => ({ showLocationPicker: !state.showLocationPicker }));
    }
    // We can implement a "subrender" method here and not clutter the main render method with tons
    // of conditional logic. This is a helpful pattern to explore when dealing with components that
    // have longer render methods
    renderLocationControls() {
        return (
            <div className="controls">
                <button onClick={this.handleSubmit}>Post</button>
                {this.state.location && this.state.locationSelected ? (
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
            <div className="create-post">
                <textarea
                    value={this.state.content}
                    onChange={this.handlePostChange}
                    placeholder="What's on your mind?"
                />
                {this.renderLocationControls()}
                <div
                    className="location-picker"
                    style={{ display: this.state.showLocationPicker ? 'block' : 'none' }}
                >
                    <LocationTypeAhead
                        onLocationSelect={this.onLocationSelect}
                        onLocationUpdate={this.onLocationUpdate}
                    />
                    <DisplayMap
                        displayOnly={false}
                        onLocationSelect={this.onLocationSelect}
                        onLocationUpdate={this.onLocationUpdate}
                    />
                </div>
            </div>
        );
    }
}

export default CreatePost;
