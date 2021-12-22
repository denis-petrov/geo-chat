import '../../assets/css/map/Map.css'
import React, {useCallback, useEffect} from 'react'
import {MapContainer, Marker, Popup, TileLayer, useMap} from 'react-leaflet'
import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import {getMarkers} from '../../store/actions/markers/getMarkers'
import Pages from '../navigation/Pages'
import Add from '../navigation/control-button/Add'
import GetLocation from '../navigation/control-button/GetLocation'
import MapSearch from '../navigation/search/MapSearch'
import {getCenterPosition} from '../../store/actions/position/getCenterPosition'
import AddMarker from '../navigation/control-button/AddMarker'
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import MarkerClusterGroup from "react-leaflet-markercluster"
import "leaflet/dist/images/marker-shadow.png"


const createClusterCustomIcon = cluster => {
    let clusterSize = "small"
    if (cluster.getChildCount() >= 10) {
        clusterSize = "medium"
    }
    return new L.divIcon({
        html: `<div class="marker-cluster-wrapper"><span class="marker-cluster-counter">${cluster.getChildCount()}</span></div>`,
        className: 'marker-cluster marker-cluster-' + clusterSize,
        iconSize: L.point(40, 40, true),
    })
}

const Map = (props) => {

    useEffect(() => {
        props.getMarkers()
        props.getCenterPosition()
    }, [])

    const markers = props.markers
    console.log(markers)

    const center = props.centerPosition
    console.log(center)

    const controlPanel = [<AddMarker key={"Add"}/>, <GetLocation key={"GetLocation"}/>]

    return (
        <div className={"map"}>
            <div className={"map-wrapper mx-auto"}>
                <MapContainer
                    center={center}
                    zoom={12}
                    zoomControl={false}
                    className={"map-container"}
                >
                    <ChangeView center={center} zoom={12}/>
                    <TileLayer
                        attribution='&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
                        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                    />
                    <MarkerClusterGroup
                        spiderfyOnMaxZoom={true}
                        iconCreateFunction={createClusterCustomIcon}
                        showCoverageOnHover={false}
                    >
                        {markers.map(marker => {
                                console.log(marker)
                                const position = {lat: marker.lat, lng: marker.lng}
                                return (<Marker key={`marker-${marker.markerId}`} position={position} onClick={e => console.log('click')}>
                                        <h1></h1>
                                        <Popup>
                                            <span>A pretty CSS3 popup. <br/> Easily customizable.</span>
                                        </Popup>
                                    </Marker>
                                )
                            }
                        )}
                    </MarkerClusterGroup>
                </MapContainer>
                <Navigation currPage={Pages.MAP} controlPanel={controlPanel}
                            search={<MapSearch/>}/>
            </div>
        </div>
    )
}

const ChangeView = ({center, zoom}) => {
    const map = useMap()
    map.setView(center, zoom)

    const onMove = useCallback(() => {
        localStorage.setItem("center", JSON.stringify(map.getCenter()))
    }, [map])
    useEffect(() => {
        map.on('move', onMove)
        return () => map.off('move', onMove)
    }, [map, onMove])

    return null
}

const mapStateToProps = (state) => ({
    markers: state.markers,
    centerPosition: state.centerPosition
})

const mapDispatchToProps = {
    getMarkers, getCenterPosition
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)