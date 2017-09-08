import React, { Component } from 'react';
import ReactDOM from 'react-dom';

import Loader from '../Loader';

// TODO:
// create a map that can receive a location and move to it; doesn't need to be navigable
// user will input a search location in a field and hit "add location" or something. This
// will add the map to the post and save it
// TODO add to models as well (location: "LAT/LNG")

export default class DisplayMap extends Component {
    constructor(props) {
        super(props);
        this.state = {
            mapLoaded: false,
            apiLoaded: false,
            lat: 34.1844509,
            lng: -118.2020208,
            zoom: 10
        };
        this.attemptGeoLocation = this.attemptGeoLocation.bind(this);
        this.ensureMapExists = this.ensureMapExists.bind(this);
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
        if (!window.L) {
            const scriptExists = document.getElementById(process.env.MAP_SCRIPT_ID);
            if (!scriptExists) {
                // Inject and load the styles/script outside React's context
                const mapStyleTag = document.createElement('link');
                mapStyleTag.rel = 'stylesheet';
                mapStyleTag.href = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.css';

                const mapsScriptTag = document.createElement('script');
                mapsScriptTag.id = process.env.MAP_SCRIPT_ID;
                mapsScriptTag.src = 'https://api.mapbox.com/mapbox.js/v3.1.1/mapbox.js';
                mapsScriptTag.onload = () => {
                    console.log('load');
                    window.L.mapbox.accessToken = process.env.MAPBOX_API_TOKEN;
                    this.mapboxAPI = window.L.mapbox;
                    this.Leaflet = window.L;
                    this.setState(() => ({ apiLoaded: true }));
                };
                document.body.appendChild(mapStyleTag);
                return document.body.appendChild(mapsScriptTag);
            }
        }
        this.mapboxAPI = window.L.mapbox;
    }
    ensureMapExists() {
        if (this.state.mapLoaded) return;
        this.map = this.mapboxAPI.map(this.mapNode, 'mapbox.streets');
        this.map.setView([this.state.lat, this.state.lng], this.state.zoom);
        this.setState(() => ({ mapLoaded: true }));
    }
    updateMapPosition(lat, lng, zoom) {
        this.map.setView([lat, lng], zoom);
        this.addMarker(lat, lng);
    }
    addMarker(lat, lng) {
        this.Leaflet
            .marker([lat, lng], {
                icon: this.mapboxAPI.marker.icon({
                    'marker-size': 'library',
                    'marker-symbol': 'rocket',
                    'marker-color': '#4469af'
                })
            })
            .addTo(this.map);
    }
    attemptGeoLocation() {
        return new Promise(resolve => {
            if ('geolocation' in navigator) {
                navigator.geolocation.getCurrentPosition(
                    ({ coords }) => {
                        const { latitude, longitude } = coords;
                        this.updateMapPosition(latitude, longitude);
                    },
                    null,
                    {
                        enableHighAccuracy: true,
                        timeout: 5000,
                        maximumAge: 0
                    }
                );
            } else {
                return resolve({
                    lat: this.props.lat,
                    lng: this.props.lng
                });
            }
        });
    }
    render() {
        return (
            <div className="displayMap" style={{ display: this.props.show ? 'block' : 'none' }}>
                {this.props.allowInput && (
                    <div className="control-bar">
                        <i className="fa fa-location-arrow" onClick={this.attemptGeoLocation} />
                        <input type="text" placeholder="Enter a location..." />
                    </div>
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
