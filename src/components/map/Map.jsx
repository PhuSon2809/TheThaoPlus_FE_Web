import React, { memo } from 'react';
import GoogleMapReact from 'google-map-react';
import LocationOnIcon from '@mui/icons-material/LocationOn';

const AnyReactComponent = ({ text }) => <div>{text}</div>;

function Map({ coords }) {
  console.log(coords);

  return (
    <div style={{ height: '400px', width: '100%' }}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: process.env.REACT_APP_MAP_API }}
        defaultCenter={coords}
        defaultZoom={16}
        center={coords}
      >
        <AnyReactComponent lat={coords.lat} lng={coords.lng} text={<LocationOnIcon color="error" />} />
      </GoogleMapReact>
    </div>
  );
}

export default memo(Map);
