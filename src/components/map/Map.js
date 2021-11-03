import '../../assets/css/map/Map.css'
import React, {Component} from 'react'
import {MapContainer, TileLayer} from 'react-leaflet'
import Navigation from '../navigation/Navigation'
import {connect} from 'react-redux'
import {getMarkers} from '../../store/actions/getMarkers'
import {addMarker} from '../../store/actions/addMarkers'

class Map extends Component {

    componentDidMount() {
        this.props.getMarkers()
    }

    render() {
        const {markers} = this.props.markers
        console.log(markers)

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
}

const mapStateToProps = (state) => ({
    markers: state.markers
})

const mapDispatchToProps = {
    getMarkers, addMarker
}

export default connect(mapStateToProps, mapDispatchToProps)(Map)