import React from 'react';
import GoogleMapReact from 'google-map-react';


const CourierView = ({ center, zoom }) => {
  return (
    <div style={{ height: '100vh', width: '100%' }}>
      <GoogleMapReact
        defaultCenter={{ lat: 40.819824, lng: -73.950749 }}
        defaultZoom={15}
        bootstrapURLKeys={{ key: 'AIzaSyDY7lVOOxd3PTuN1B50wTdAVEnpuTA_gOY' }}
      >

      </GoogleMapReact>
    </div>

  )
}

export default CourierView
