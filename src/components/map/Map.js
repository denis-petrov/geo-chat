import '../../assets/css/map/Map.css'
import React, {Component} from 'react'
import {MapContainer, TileLayer, useMap} from 'react-leaflet'
import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import {getMarkers} from '../../store/actions/markers/getMarkers'
import {addMarker} from '../../store/actions/markers/addMarkers'
import Pages from '../navigation/Pages'
import Add from '../navigation/control-button/Add'
import GetLocation from '../navigation/control-button/GetLocation'
import MapSearch from '../navigation/search/MapSearch'
import {getUserPosition} from '../../store/actions/position/getUserPosition'

class Map extends Component {

    componentDidMount() {
        this.props.getMarkers()
        this.props.getUserPosition()
    }

    render() {
        const {markers} = this.props.markers
        console.log(markers)

        const userPosition = this.props.userPosition

        const controlPanel = [<Add key={"Add"}/>, <GetLocation key={"GetLocation"}/>]

        return (
            <div className={"map"}>
                <div className={"map-wrapper mx-auto"}>
                    <MapContainer
                        center={userPosition}
                        zoom={12}
                        zoomControl={false}
                        className={"map-container"}
                    >
                        <ChangeView center={userPosition} zoom={12}/>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                    <Navigation currPage={Pages.MAP} controlPanel={controlPanel} search={MapSearch}/>
                </div>
            </div>
        )
    }
}

function ChangeView({center, zoom}) {
    const map = useMap()
    map.setView(center, zoom)
    return null
}

const mapStateToProps = (state) => ({
    markers: state.markers,
    userPosition: state.userPosition
})

const mapDispatchToProps = {
    getMarkers, addMarker, getUserPosition
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)