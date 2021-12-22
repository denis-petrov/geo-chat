import '../../assets/css/map/Map.css'
import React, {useCallback, useEffect, useState} from 'react'
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet'
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
import {Button, Modal} from "react-bootstrap"
import {addMemberToChat} from "../../store/actions/chat/addMemberToChat"
import {getCurrentUser} from "../../utils/getCurrentUser"
import {useHistory} from "react-router"
import {updateCenterPosition} from "../../store/actions/position/updateCenterPosition"


const createClusterCustomIcon = cluster => {
    let clusterSize = "small"
    if (cluster.getChildCount() >= 10) {
        clusterSize = "medium"
    }
    return new L.divIcon({
        html: `<div class="marker-cluster-wrapper"><span class="marker-cluster-counter">${cluster.getChildCount()}</span></div>`,
        className: 'marker-cluster marker-cluster-' + clusterSize,
        iconSize: L.point(40, 40, true)
    })
}

const Map = (props) => {
    const history = useHistory()

    useEffect(() => {
        props.getMarkers()
        props.getCenterPosition()
    }, [])

    const markers = props.markers
    console.log(markers)

    const center = props.centerPosition

    const controlPanel = [<AddMarker key={"Add"}/>, <GetLocation key={"GetLocation"}/>]

    const handleClickMarker = (marker) => {
        setCurrMarker(marker)
        setModalShow(true)
    }
    const [currMarker, setCurrMarker] = useState(null)


    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => {
        setCurrMarker(null)
        setModalShow(false)
    }

    const handleModalSubmit = () => {
        addMemberToChat(getCurrentUser().userId, currMarker.chatId)
        setModalShow(false)
        history.push('/chat/' + currMarker.chatId)
    }

    console.log(center)
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
                        {markers.map(marker => (
                            <Marker key={`marker-${marker.markerId}`} position={{lat: marker.lat, lng: marker.lng}}
                                    eventHandlers={{click: () => {
                                            handleClickMarker(marker)
                                            props.updateCenterPosition({lat: marker.lat, lng: marker.lng})
                                        }}}>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>

                    {(currMarker !== null) ?
                        <Modal show={modalShow} onHide={handleClose} centered>
                            <Modal.Header closeButton className={"map__modal"}>
                                <Modal.Title>{currMarker.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={"map__modal"}>
                                {currMarker.description}
                            </Modal.Body>
                            <Modal.Footer className={"map__modal map__modal_footer"}>
                                {(currMarker.chatId !== null && currMarker.chatId !== undefined) ?
                                    <Button className={"map__model_create"} onClick={handleModalSubmit}>
                                        Join to Chat
                                    </Button> : null
                                }
                            </Modal.Footer>
                        </Modal> : null
                    }

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
    getMarkers, getCenterPosition, addMemberToChat, updateCenterPosition
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)