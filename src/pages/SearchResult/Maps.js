import React from "react";
import { Map, GoogleApiWrapper,  Marker, InfoWindow } from 'google-maps-react';

export class Maps extends React.Component {

  // var bounds = map.getBounds();

  // var center = bounds.getCenter();
  // var ne = bounds.getNorthEast();

  // // r = radius of the earth in statute miles
  // var r = 3963.0;  

  // // Convert lat or lng from decimal degrees into radians (divide by 57.2958)
  // var lat1 = center.lat() / 57.2958; 
  // var lon1 = center.lng() / 57.2958;
  // var lat2 = ne.lat() / 57.2958;
  // var lon2 = ne.lng() / 57.2958;

  // // distance = circle radius from center to Northeast corner of bounds
  // var dis = r * Math.acos(Math.sin(lat1) * Math.sin(lat2) + 
  //   Math.cos(lat1) * Math.cos(lat2) * Math.cos(lon2 - lon1));

  state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
  };

  onMarkerClick = (props, marker, e) => {
    // console.log('props',props);
    // console.log('hello');
    // console.log('marker', marker);
    // console.log('e', e);
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
  };



  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false,
        activeMarker: null
      })
    }
  };

  mapClicked(mapProps, map, clickEvent) {
    console.log(mapProps);
    console.log(map);
  }


  render() {
    const mapStyles = {
      width: "100%",
      height: "675px",
      margin: 0,
      position: 'absolute',
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)"
    };



    return (
      <>
        <Map
          google={this.props.google}
          zoom={13}
          style={mapStyles}
          draggable={false}
          onClick={this.mapClicked}
          initialCenter={{
            lat: (this.props.mapData.latitude) ? this.props.mapData.latitude : '40.7127753',
            lng: (this.props.mapData.longitude) ? this.props.mapData.longitude : '-74.0059728',
          }}
          center={{
            lat: (this.props.mapCenterPoints.latitudeCC) ? this.props.mapCenterPoints.latitudeCC : '40.7127753',
            lng: (this.props.mapCenterPoints.longitudeCC) ? this.props.mapCenterPoints.longitudeCC : '-74.0059728',
          }}

        >
          {/* <Marker onClick={this.onMarkerClick}
            title={'The marker`s title will appear as a tooltip.'}
            name={'SOMA'}
            position={{ lat: 40.7227753, lng: -74.1059728 }} />


          <Marker onClick={this.onMarkerClick}
            name={'Your position'}
            position={{ lat: 40.2127753, lng: -74.4059728 }}
          /> */}


          {this.props?.theaterMarkers?.length > 0 && (
            this.props?.theaterMarkers.map((e, key) => {
              
              return (
                <Marker onClick={this.onMarkerClick} key={e?._id}
                name={e?._source?.theater_name}
                  position={{ lat: e?._source?.latitude, lng: e?._source?.longitude }}
                />
              )
            })
          )}


          {this.props?.businessMarkers?.length > 0 && (
            this.props?.businessMarkers.map((e, key) => {
              return (
                <Marker onClick={this.onMarkerClick} key={e?._id}
                  name={e?._source?.business_name}
                  position={{ lat: e?._source?.latitude, lng: e?._source?.longitude }}
                />
              )
            })
          )}




          <InfoWindow className='info-window-popup'
            marker={this.state.activeMarker}
            visible={this.state.showingInfoWindow}>
            <div className='place-name'>
              <h6>{this.state.selectedPlace.name}</h6>
            </div>
          </InfoWindow>

        </Map>
      </>
    );
  }
}


export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAP_API_KEY
})(Maps);