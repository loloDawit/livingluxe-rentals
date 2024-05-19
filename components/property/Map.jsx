'use client'

import { useEffect, useState } from 'react'
import 'mapbox-gl/dist/mapbox-gl.css'
import Map, { Marker } from 'react-map-gl'
import { setDefaults, fromAddress } from 'react-geocode'
import Image from 'next/image'
import pin from '@/assets/images/pin.svg'
import Loading from '../Loading'

const PropertyMap = ({ property }) => {
    const [state, setState] = useState({
        lat: null,
        lng: null,
        viewport: {
            latitude: 0,
            longitude: 0,
            zoom: 12,
            width: '100%',
            height: '500px',
        },
        loading: true,
        geocodeError: false,
    })

    setDefaults({
        key: process.env.NEXT_PUBLIC_GOOGLE_GEOCODING_API_KEY,
        language: 'en',
        region: 'us',
    })

    useEffect(() => {
        const { location } = property

        const fetchCoords = async () => {
            try {
                const res = await fromAddress(
                    `${location.street} ${location.city} ${location.state} ${location.zipcode}`
                )

                if (res.results.length === 0) {
                    setState((prevState) => ({
                        ...prevState,
                        geocodeError: true,
                        loading: false,
                    }))
                    return
                }

                const { lat, lng } = res.results[0].geometry.location

                setState((prevState) => ({
                    ...prevState,
                    lat,
                    lng,
                    viewport: {
                        ...prevState.viewport,
                        latitude: lat,
                        longitude: lng,
                    },
                    loading: false,
                }))
            } catch (error) {
                console.error(error)
                setState((prevState) => ({
                    ...prevState,
                    geocodeError: true,
                    loading: false,
                }))
            }
        }

        fetchCoords()
    }, [property])

    const { lat, lng, loading, geocodeError } = state

    if (loading) return <Loading loading={loading} />

    if (geocodeError) {
        return <div className="text-xl">No location data found</div>
    }

    return (
        !loading && (
            <Map
                mapboxAccessToken={process.env.NEXT_PUBLIC_MAPBOX_TOKEN}
                mapLib={import('mapbox-gl')}
                initialViewState={{
                    longitude: lng,
                    latitude: lat,
                    zoom: 15,
                }}
                style={{ width: '100%', height: 500 }}
                mapStyle="mapbox://styles/mapbox/streets-v9"
            >
                <Marker longitude={lng} latitude={lat} anchor="bottom">
                    <Image src={pin} alt="location" width={40} height={40} />
                </Marker>
            </Map>
        )
    )
}
export default PropertyMap
