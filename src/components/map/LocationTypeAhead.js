import React, { Component } from 'react';
import debounce from 'lodash/debounce';
import MapBox from 'mapbox';

import Loader from '../Loader';

export default class LocationTypeAhead extends Component {
    constructor(props) {
        super(props);
        this.state = {
            text: '',
            locations: [],
            ready: false,
            selectedLocation: {
                lat: null,
                lng: null
            },
            error: null
        };
        this.mapbox = new MapBox(process.env.MAPBOX_API_TOKEN);
        this.handleSelectLocation = this.handleSelectLocation.bind(this);
        this.handleSearchChange = this.handleSearchChange.bind(this);
    }
    componentDidMount() {
        this.setState(() => ({ ready: true }));
    }
    handleSelectLocation() {}
    handleSearchChange(e) {
        e.persist();
        this.setState(() => ({ text: e.target.value }));
        if (!e.target.value) return;
        this.mapbox.geocodeForward(e.target.value, {}).then(loc => {
            console.log(loc);
            if (!loc.entity.features) {
                return;
            }
            const locations = loc.entity.features.map(feature => {
                const [lat, lng] = feature.center;
                return {
                    name: feature.place_name,
                    lat,
                    lng
                };
            });
            this.setState(() => ({ locations }));
        });
    }
    geoCode(query) {
        this.mapbox
            .geocodeForward(query)
            .then(res => res.entity)
            .catch(err => console.error(err));
    }
    attemptGeoLocation() {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                ({ coords }) => {
                    const { latitude, longitude } = coords;
                    this.handleSelectLocation(latitude, longitude);
                },
                null,
                {
                    enableHighAccuracy: true,
                    timeout: 5000,
                    maximumAge: 0
                }
            );
        }
    }
    componentDidUpdate(prevProps, prevState) {
        if (prevState.text === '' && this.state.locations.length) {
            this.setState(() => ({ locations: [] }));
        }
    }
    render() {
        return [
            <div className="location-typeahead">
                <i className="fa fa-location-arrow" onClick={this.attemptGeoLocation} />
                <input
                    onChange={this.handleSearchChange}
                    type="text"
                    placeholder="Enter a location..."
                    value={this.state.text}
                />
                {this.state.searching ? (
                    <Loader />
                ) : (
                    <button
                        disabled={!this.state.text && !this.state.locations.length}
                        onClick={this.handleSelectLocation}
                        className="open"
                    >
                        Select
                    </button>
                )}
            </div>,
            this.state.text.length && this.state.locations.length ? (
                <div className="location-typeahead-results">
                    {this.state.locations.map(location => {
                        return <div className="result">{location.name}</div>;
                    })}
                </div>
            ) : null
        ];
    }
}
