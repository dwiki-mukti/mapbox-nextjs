


import React, { useEffect } from 'react'

export default function MapVanila() {

    useEffect(() => {
        if (mapboxgl) {
            mapboxgl.accessToken = process.env.NEXT_PUBLIC_GMAPS_API_KEY;
            const map = new mapboxgl.Map({
                container: 'map',
                style: 'mapbox://styles/mapbox/streets-v12',
                center: [-74.5, 40],
                zoom: 9
            });
        }
    }, [])

    return (
        <div>
            <div id="map" className='h-screen w-screen'></div>
        </div>
    )
}
