import React from 'react'
import { withGoogleMap, GoogleMap, Marker } from "react-google-maps";
import MarkerClusterer from "react-google-maps/lib/addons/MarkerClusterer";

import marker_normal from '../img/marker.png';
import marker_active from '../img/marker_active.png';

const GettingStartedGoogleMap = withGoogleMap(props => (
  <GoogleMap
    ref={props.onMapLoad}
    zoom={props.zoom}
    center={props.center}
    onClick={props.onMapClick}
  >
    <MarkerClusterer>
      {props.markers.map((marker, index) => (
        <Marker
          position={{lat: marker.lat, lng: marker.lng}}
          onClick={() => props.onMarkerClick(marker, index)}
          icon={{
            url: props.currentEvent == index ? marker_active : marker_normal
          }}
        />
      ))}
    </MarkerClusterer>
  </GoogleMap>
));

var Map = React.createClass({
  handleMarkerClick: function(marker, index){
    this.props.setCurrentEvent(index);

    if (this.props.currentEvent >= 0) {
      // TODO: share code on list click
      this.setState({
        center: {
          lat: marker.lat,
          lng: marker.lng
        },
        zoom: 12
      });
    }
  },

  getInitialState: function() {
    return {
      zoom: 6,
      center: { lat: 50.549977545454546, lng: 9.675811272727271 },
    };
  },

  render: function() {
    var noop = function(){};

    return (
      <GettingStartedGoogleMap
        containerElement={
          <div style={{ height: `100%` }} />
        }
        mapElement={
          <div style={{ height: `100%` }} />
        }
        onMapLoad={noop}
        onMapClick={noop}
        markers={this.props.results}
        currentEvent={this.props.currentEvent}
        onMarkerClick={this.handleMarkerClick}
        zoom={this.state.zoom}
        center={this.state.center}
      />
    )
  }
})

export default Map;