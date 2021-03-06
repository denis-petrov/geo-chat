import '../../assets/css/map/Map.css'
import React, {useCallback, useEffect, useState} from 'react'
import {MapContainer, Marker, TileLayer, useMap} from 'react-leaflet'
import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import {getMarkers} from '../../store/actions/map/markers/getMarkers'
import Pages from '../navigation/Pages'
import Add from '../navigation/control-button/Add'
import GetLocation from '../navigation/control-button/GetLocation'
import MapSearch from '../navigation/search/MapSearch'
import {getCenterPosition} from '../../store/actions/map/position/getCenterPosition'
import AddMarker from '../navigation/control-button/AddMarker'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'
import MarkerClusterGroup from 'react-leaflet-markercluster'
import 'leaflet/dist/images/marker-shadow.png'
import {Button, Modal} from 'react-bootstrap'
import {addMemberToChat} from '../../store/actions/chat/addMemberToChat'
import {getCurrentUser} from '../../utils/getCurrentUser'
import {useHistory} from 'react-router'
import {updateCenterPosition} from '../../store/actions/map/position/updateCenterPosition'
import {updateZoom} from '../../store/actions/map/zoom/updateZoom';
import {deleteMarker} from "../../store/actions/map/markers/deleteMarker";

const blueIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-blue.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

const greenIcon = new L.Icon({
    iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-2x-green.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/0.7.7/images/marker-shadow.png',
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41]
})

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
    const currUserId = getCurrentUser().userId

    const history = useHistory()

    useEffect(() => {
        props.getCenterPosition()
        props.getMarkers({lat: props.centerPosition.lat, lng: props.centerPosition.lng, zoom: props.zoom})
        localStorage.setItem('center', JSON.stringify({lat: props.centerPosition.lat, lng: props.centerPosition.lng}))
        localStorage.setItem('zoom', JSON.stringify(props.zoom))
    }, [])

    const markers = props.markers
    const center = props.centerPosition

    const controlPanel = [<AddMarker key={"Add"}/>, <GetLocation key={"GetLocation"}/>]

    const [currMarker, setCurrMarker] = useState(null)
    const [modalShow, setModalShow] = useState(false)
    const handleClose = () => {
        setCurrMarker(null)
        setModalShow(false)
    }

    const handleClickMarker = (marker) => {
        setCurrMarker(marker)
        setModalShow(true)
    }

    const handleModalDeleteMarker = (markerId) => {
        props.deleteMarker(markerId).then(() => {
            const {lat, lng} = JSON.parse(localStorage.getItem('center'))
            const zoomLocalStore = JSON.parse(localStorage.getItem('zoom'))
            props.getMarkers({lat: lat, lng: lng, zoom: zoomLocalStore})
            setModalShow(false)
        })
    }

    const handleModalJoinToChat = () => {
        props.addMemberToChat(getCurrentUser().userId, currMarker.chatId).then(() => {
            setModalShow(false)
            history.push('/chat/' + currMarker.chatId)
        })
    }

    console.log(markers)
    console.log(currUserId)
    return (
        <div className={"map"}>
            <div className={"map-wrapper mx-auto"}>
                <MapContainer
                    center={center}
                    zoom={JSON.parse(localStorage.getItem('zoom'))}
                    zoomControl={false}
                    className={"map-container"}
                >
                    <ChangeView
                        center={center}
                        zoom={JSON.parse(localStorage.getItem('zoom'))}
                        getMarkers={props.getMarkers}
                        updateCenterPosition={props.updateCenterPosition}
                        updateZoom={props.updateZoom}
                    />
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
                                    icon={marker.ownerId === currUserId ? greenIcon : blueIcon}
                                    eventHandlers={{
                                        click: () => {
                                            props.updateCenterPosition({lat: marker.lat, lng: marker.lng})
                                            handleClickMarker(marker)
                                        }
                                    }}>
                            </Marker>
                        ))}
                    </MarkerClusterGroup>

                    {(modalShow !== false) ?
                        <Modal show={modalShow} centered>
                            <Modal.Header closeButton onClick={handleClose} className={"map__modal"}>
                                <Modal.Title>{currMarker.title}</Modal.Title>
                            </Modal.Header>
                            <Modal.Body className={"map__modal"}>
                                {currMarker.description}
                            </Modal.Body>
                            <Modal.Footer className={"map__modal map__modal_footer"}>
                                <Button className={"map__model_submit map__model_delete " +
                                    ((currMarker.ownerId !== currUserId) ? "map__modal_hidden_element" : "")
                                } onClick={() => handleModalDeleteMarker(currMarker.markerId)}>
                                    Delete marker
                                </Button>

                                <Button className={"map__model_submit " +
                                    ((currMarker.chatId === null || currMarker.chatId === undefined) ? "map__modal_hidden_element" : "")
                                } onClick={handleModalJoinToChat}>
                                    Go to Chat
                                </Button>
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

const ChangeView = ({center, zoom, getMarkers, updateCenterPosition, updateZoom}) => {
    const map = useMap()
    map.setView(center, zoom)

    const onMove = useCallback(() => {
        localStorage.setItem('center', JSON.stringify(map.getCenter()))
    }, [map])

    const onDragEnd = useCallback(() => {
        const {lat, lng} = JSON.parse(localStorage.getItem('center'))
        const zoomLocalStore = JSON.parse(localStorage.getItem('zoom'))
        getMarkers({lat: lat, lng: lng, zoom: zoomLocalStore})
        updateCenterPosition({lat, lng})
        updateZoom({zoom: zoomLocalStore})
    }, [map])

    const onZoomEnd = useCallback(() => {
        localStorage.setItem('zoom', JSON.stringify(map.getZoom()))
    }, [map])

    useEffect(() => {
        map.on('move', onMove)
        map.on('dragend', onDragEnd)
        map.on('zoomend', onZoomEnd)

        return () => {
            map.off('move', onMove)
            map.off('dragend', onDragEnd)
            map.off('zoomend', onZoomEnd)
        }
    }, [map, onMove, onDragEnd, onZoomEnd])

    return null
}

const mapStateToProps = (state) => ({
    markers: state.map.markers,
    centerPosition: state.map.center,
    zoom: state.map.zoom
})

const mapDispatchToProps = {
    getMarkers, deleteMarker, getCenterPosition, addMemberToChat, updateCenterPosition, updateZoom
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)