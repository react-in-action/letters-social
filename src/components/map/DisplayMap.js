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
            showMap: props.show,
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
        show: PropTypes.bool,
        allowInput: PropTypes.bool,
        location: PropTypes.shape({
            lat: PropTypes.number,
            lng: PropTypes.number,
            name: PropTypes.string
        })
    };
    static defaultProps = {
        show: true,
        allowInput: false,
        showTypeAhead: false,
        location: {
            lat: -118.1428115,
            lng: 34.1535641,
            name: null
        }
    };
    componentDidUpdate() {
        if (this.map) {
            // See https://www.mapbox.com/mapbox.js/api/v3.1.1/l-map-class/
            this.map.invalidateSize(false);
        }
    }
    componentWillReceiveProps(nextProps) {
        const locationsAreEqual = Object.keys(nextProps.location).filter(
            k => nextProps.location[k] === this.props.location[k]
        );
        if (locationsAreEqual) {
            this.updateMapPosition(nextProps.location);
        }
    }
    componentDidMount() {
        this.L = window.L;
        this.ensureMapExists();
    }
    ensureMapExists() {
        if (this.state.mapLoaded) return;
        this.map = this.L.mapbox.map(this.mapNode, 'mapbox.streets', { zoomControl: false });
        this.map.setView([this.state.location.lat, this.state.location.lng], 12);
        this.setState(() => ({ mapLoaded: true }));
    }
    updateMapPosition(location) {
        const { lat, lng } = location;
        this.map.setView(this.L.latLng(lng, lat));
        this.addMarker(lat, lng);
        this.setState(() => ({ location }));
    }
    addMarker(lat, lng) {
        this.L
            .marker([lng, lat], {
                icon: this.L.mapbox.marker.icon({
                    'marker-color': '#4469af'
                })
            })
            .addTo(this.map);
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
        return (
            <div className="displayMap">
                <div
                    className="map"
                    ref={node => {
                        this.mapNode = node;
                    }}
                />
            </div>
        );
    }
}
