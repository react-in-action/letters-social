import React, { Component } from 'react';
import LocationTypeAhead from './LocationTypeAhead';

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
            apiLoaded: false,
            lat: 34.1535641,
            lng: -118.1428115,
            name: null
        };
        this.ensureMapExists = this.ensureMapExists.bind(this);
        this.updateMapPosition = this.updateMapPosition.bind(this);
        this.onLocationSelect = this.onLocationSelect.bind(this);
    }
    componentDidUpdate() {
        if (this.props.show) {
            this.ensureMapExists();
        }
        if (this.props.show && this.map) {
            // See https://www.mapbox.com/mapbox.js/api/v3.1.1/l-map-class/
            this.map.invalidateSize(false);
        }
    }
    componentDidMount() {
        // If we've previously loaded the API, don't do it again!
        const scriptExists = document.getElementById('mapbox-js-api');
        if (window.L || scriptExists) {
            this.mapboxAPI = window.L.mapbox;
            return;
        }

        // Inject and load the styles/script outside React's context
        const mapStyleTag = document.createElement('link');
        mapStyleTag.rel = 'stylesheet';
        mapStyleTag.href = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css';

        const mapsScriptTag = document.createElement('script');
        mapsScriptTag.id = 'mapbox-js-api';
        mapsScriptTag.src = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
        mapsScriptTag.onload = () => {
            window.L.mapbox.accessToken =
                'pk.eyJ1IjoibWFya3RoZXRob21hcyIsImEiOiJHa3JyZFFjIn0.MwCj8OA5q4dqdll1s2kMiw';
            this.mapboxAPI = window.L.mapbox;
            this.Leaflet = window.L;
            this.setState(() => ({ apiLoaded: true }));
        };
        document.body.appendChild(mapStyleTag);
        document.body.appendChild(mapsScriptTag);
    }
    onLocationSelect(location) {
        this.props.onLocationSelect(location);
    }
    ensureMapExists() {
        if (this.state.mapLoaded) return;
        this.map = this.mapboxAPI.map(this.mapNode, 'mapbox.streets');
        this.map.setView([this.state.lat, this.state.lng], 12);
        this.setState(() => ({ mapLoaded: true }));
    }
    updateMapPosition({ lat, lng }) {
        this.map.setView(this.Leaflet.latLng(lng, lat));
        this.addMarker(lat, lng);
    }
    addMarker(lat, lng) {
        this.Leaflet
            .marker([lng, lat], {
                icon: this.mapboxAPI.marker.icon({
                    'marker-color': '#4469af'
                })
            })
            .addTo(this.map);
    }
    render() {
        return (
            <div className="displayMap" style={{ display: this.props.show ? 'block' : 'none' }}>
                {this.props.allowInput &&
                this.props.show && (
                    <LocationTypeAhead
                        onLocationSelect={this.onLocationSelect}
                        onLocationUpdate={this.updateMapPosition}
                    />
                )}
                <div
                    id="map"
                    ref={node => {
                        this.mapNode = node;
                    }}
                />
            </div>
        );
    }
}
