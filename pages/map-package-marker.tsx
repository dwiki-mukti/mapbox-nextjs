import { useState, useEffect } from "react"
import { Map, Marker } from "react-map-gl"


export default function MapPackageMarker() {
    const [UserLocation, setUserLocation] = useState({
        longitude: 180.0000001,
        latitude: 90.0000001
    });
    const [ViewMap, setViewMap] = useState({
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


    useEffect(() => {
        if ((ViewMap.longitude > 180.0000000 && ViewMap.latitude > 90.0000000)) {
            setViewMap((prev) => ({
                ...prev,
                longitude: UserLocation.longitude,
                latitude: UserLocation.latitude
            }));
        }
    }, [UserLocation])



    return (
        <div>
            {
                (ViewMap.longitude < 180.0000001 && ViewMap.latitude < 90.0000001)
                    ? (
                        <Map
                            mapboxAccessToken={process.env.NEXT_PUBLIC_GMAPS_API_KEY}
                            mapStyle="mapbox://styles/mapbox/streets-v9"
                            style={{ width: "100vw", height: "100vh" }}
                            zoom={ViewMap.zoom}
                            latitude={ViewMap.latitude}
                            longitude={ViewMap.longitude}
                            onMove={(ev) => setViewMap(ev.viewState)}
                        >
                            <Marker
                                longitude={UserLocation.longitude}
                                latitude={UserLocation.latitude}
                                anchor="bottom"
                            >
                                <img src="/vercel.svg" style={{ width: "100px" }} />
                            </Marker>
                        </Map>
                    ) : (
                        <div>Loading...</div>
                    )}
        </div>
    )
}
