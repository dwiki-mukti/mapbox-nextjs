import { useState, useEffect } from "react"
import { Map } from "react-map-gl"


export default function MapPackage() {
    const [UserLocation, setUserLocation] = useState({
        longitude: 180.0000001,
        latitude: 90.0000001,
        zoom: 20
    });


    useEffect(() => {
        navigator.geolocation.watchPosition(({ coords }) => {
            setUserLocation((prev) => ({
                ...prev,
                longitude: coords.longitude,
                latitude: coords.latitude
            }));
        });
    }, []);



    return (
        <div>
            {
                (UserLocation.longitude < 180.0000001 && UserLocation.latitude < 90.0000001)
                    ? (
                        <Map
                            mapboxAccessToken={process.env.NEXT_PUBLIC_GMAPS_API_KEY}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            style={{ width: "100vw", height: "100vh" }}
                            zoom={UserLocation.zoom}
                            latitude={UserLocation.latitude}
                            longitude={UserLocation.longitude}
                            onMove={(ev) => setUserLocation(ev.viewState)}
                        />
                    ) : (
                        <div>Loading...</div>
                    )}
        </div>
    )
}
