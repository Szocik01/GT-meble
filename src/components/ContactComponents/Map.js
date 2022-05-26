import style from "./Map.module.css";
import React from "react";
import { useState, useCallback } from "react";
import { GoogleMap, useJsApiLoader, Marker } from '@react-google-maps/api';
import Spinner from "../../UI/Spinner";

const center = {
  lat: 50.143176723802725,
  lng: 19.40471243372375
};

export default React.memo(function Map(props)
{
    const { isLoaded } = useJsApiLoader({
        id: 'google-map-script',
        googleMapsApiKey: "AIzaSyA8W-CgsC9QLz_tbUzrUPO_wtQkKFxAGW0"
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
          zoom={13}
          onLoad={onLoad}
          onUnmount={onUnmount}>
            <Marker position={center}/>
          </GoogleMap>
    ) :<div className={style.spinnerContainer}>
        <Spinner/>
    </div> 
});