import '../../assets/css/map/Map.css'
import React from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import Navigation from '../navigation/Navigation'

const Map = () => {
    return (
        <div className={"map"}>
            <div className={"map-wrapper mx-auto"}>
                <MapContainer
                    center={[45.4, -75.7]}
                    zoom={12}
                    zoomControl={false}
                    className={"map-container"}
                >
                    <TileLayer
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                </MapContainer>
                <Navigation/>
            </div>
        </div>
    )
}

export default Map