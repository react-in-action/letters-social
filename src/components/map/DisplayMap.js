import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { isServer } from '../../utils/environment';

/**
 * The DisplayMap component is used for display locations attached to posts. It handles loading the
 * mapbox APIs into the browser and also allowing the use to pick a location
 * @module letters/components
 * @type {Class}
 */

export default class DisplayMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapLoaded: false,
            location: {
                lat: props.location.lat,
                lng: props.location.lng,
                name: props.location.name
            }
        };
        this.ensureMapExists = this.ensureMapExists.bind(this);
        this.updateMapPosition = this.updateMapPosition.bind(this);
        this.generateStaticMapImage = this.generateStaticMapImage.bind(this);
    }
    static propTypes = {
        location: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
            name: PropTypes.string
        }),
        displayOnly: PropTypes.bool
    };
    static defaultProps = {
        displayOnly: true,
        location: {
            lat: -118.1428115,
            lng: 34.1535641,
            name: null
        }
    };
    componentDidUpdate() {
        if (this.map && !this.props.displayOnly) {
            // See https://www.mapbox.com/mapbox.js/api/v3.1.1/l-map-class/
            this.map.invalidateSize(false);
        }
    }
    componentWillReceiveProps(nextProps) {
        const locationsAreEqual = Object.keys(nextProps.location).filter(
            k => nextProps.location[k] === this.props.location[k]
        );
        if (!locationsAreEqual) {
            this.updateMapPosition(nextProps.location);
        }
    }
    componentDidMount() {
        this.L = window.L;
        if (!isServer()) {
            this.ensureMapExists();
        }
    }
    ensureMapExists() {
        if (this.state.mapLoaded) return;
        this.map = this.L.mapbox.map(this.mapNode, 'mapbox.streets', {
            zoomControl: false,
            scrollWheelZoom: false
        });
        this.map.setView(this.L.latLng(this.state.location.lng, this.state.location.lat), 12);
        this.addMarker(this.state.location.lat, this.state.location.lng);
        this.setState(() => ({ mapLoaded: true }));
    }
    updateMapPosition(location) {
        const { lat, lng } = location;
        this.map.setView(this.L.latLng(lng, lat));
        this.addMarker(lat, lng);
        this.setState(() => ({ location }));
    }
    addMarker(lat, lng) {
        // IF we have already saved the marker, just update it
        if (this.marker) {
            this.marker.setLatLng(this.L.latLng(lng, lat));
        }
        // Create a marker and put it on the map
        this.marker = this.L.marker([lng, lat], {
            icon: this.L.mapbox.marker.icon({
                'marker-color': '#4469af'
            })
        });
        this.marker.addTo(this.map);
    }
    generateStaticMapImage(lat, lng) {
        return `https://api.mapbox.com/styles/v1/mapbox/streets-v10/static/${lng},${lat},12,0,0/600x175?access_token=pk.eyJ1IjoibWFya3RoZXRob21hcyIsImEiOiJHa3JyZFFjIn0.MwCj8OA5q4dqdll1s2kMiw`;
    }
    render() {
        if (isServer()) {
            return (
                <div className="displayMap">
                    <img
                        className="map"
                        src={this.generateStaticMapImage(
                            this.state.location.lat,
                            this.state.location.lng
                        )}
                        alt={this.state.location.name}
                    />
                </div>
            );
        }
        return [
            <div key="displayMap" className="displayMap">
                <div
                    className="map"
                    ref={node => {
                        this.mapNode = node;
                    }}
                />
            </div>,
            this.props.displayOnly && (
                <div key="location-description" className="location-description">
                    <i className="location-icon fa fa-location-arrow" />
                    <span className="location-name">{this.state.location.name}</span>
                </div>
            )
        ];
    }
}
