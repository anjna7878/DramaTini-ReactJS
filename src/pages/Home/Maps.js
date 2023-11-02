import React from "react";

import { Map, GoogleApiWrapper } from 'google-maps-react';



export class Maps extends React.Component {
  render() {
    const mapStyles = {
      width: "100%",
      height: "500px",

      margin: 0,
      position: 'absolute',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -53%)"
    };
    return (
      <Map
        google={this.props.google}
        zoom={15}
        style={mapStyles}
        initialCenter={{ lat: 9.761927, lng: 79.95244 }}
      />
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(Maps);