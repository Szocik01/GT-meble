import style from "./Map.module.css";
import React from "react";
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Spinner from "../../UI/Spinner";

const center = {
  lat: 49.96177384937579, 
  lng: 18.72196144065742
};

export default React.memo(function Map(props)
{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyBGqOQBkuE2AA9rqwYpzJ-C1g_yHUpKJCc"
      });
    
      const [map, setMap] = useState(null);
    
      const onLoad = useCallback(function callback(map) {
        const bounds = new window.google.maps.LatLngBounds(center);
        map.fitBounds(bounds);
        setMap(map);
      }, [])
    
      const onUnmount = useCallback(function callback() {
        setMap(null);
      }, [])

    return isLoaded ? (
        <GoogleMap
          mapContainerClassName={`${style.map} ${props.gridClass}`}
          center={center}
          zoom={15}
          onLoad={onLoad}
          onUnmount={onUnmount}>
            <Marker position={center}/>
          </GoogleMap>
    ) :<div className={style.spinnerContainer}>
        <Spinner/>
    </div> 
});