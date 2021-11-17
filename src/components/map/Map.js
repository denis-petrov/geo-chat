import '../../assets/css/map/Map.css'
import React, {Component, useEffect, useState} from 'react'
import {MapConsumer, MapContainer, TileLayer, useMap} from 'react-leaflet'
import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import {getMarkers} from '../../store/actions/markers/getMarkers'
import {addMarker} from '../../store/actions/markers/addMarkers'
import Pages from '../navigation/Pages'
import Add from '../navigation/control-button/Add'
import GetLocation from '../navigation/control-button/GetLocation'
import MapSearch from '../navigation/search/MapSearch'
import {getCenterPosition} from '../../store/actions/position/getCenterPosition'


class Map extends Component {

    constructor(props) {
        super(props)

        this.search = null
    }

    componentDidMount() {
        this.props.getMarkers()
        this.props.getCenterPosition()
    }


    render() {
        const {markers} = this.props.markers
        console.log(markers)

        const center = this.props.centerPosition

        const controlPanel = [<Add key={"Add"}/>, <GetLocation key={"GetLocation"}/>]

        return (
            <div className={"map"}>
                <div className={"map-wrapper mx-auto"}>
                    <MapContainer
                        center={center}
                        zoom={12}
                        zoomControl={false}
                        className={"map-container"}
                        /*onclick={this.handleClick}*/
                        whenReady={(map) => {
                            console.log(map);
                            map.target.on("click", function (e) {
                                const {lat, lng} = e.latlng
                                console.log(e.latlng)
                            })
                        }}
                    >
                        <MapConsumer>
                            {(map) => {
                                console.log("map center:", map.getCenter())
                                return null
                            }}
                        </MapConsumer>
                        <ChangeView center={center} zoom={12} search={this.search}/>
                        <TileLayer
                            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                        />
                    </MapContainer>
                    <Navigation currPage={Pages.MAP} controlPanel={controlPanel}
                                search={<MapSearch/>}/>
                </div>
            </div>
        )
    }
}

const ChangeView = ({center, zoom, search}) => {
    const map = useMap()

    map.setView(center, zoom)
    console.log('search: ' + search)
    useEffect(() => {
        if (search !== undefined && search !== null) {
            map.addControl(search)
            return () => map.removeControl(search)
        }
    }, [map, search])

    return null
}

const mapStateToProps = (state) => ({
    markers: state.markers,
    centerPosition: state.centerPosition
})

const mapDispatchToProps = {
    getMarkers, addMarker, getCenterPosition
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)