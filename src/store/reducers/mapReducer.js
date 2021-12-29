import {ADD_MARKER, GET_CENTER_POSITION, GET_MARKERS, UPDATE_CENTER_POSITION, UPDATE_ZOOM} from '../types'

const initialState = {
    center: {
        lat: 55.74101998457737,
        lng: 37.62268066406251
    },
    zoom: 12,
    markers: []
}

const mapReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKERS:
            return {
                ...state,
                markers: action.payload
            }
        case ADD_MARKER:
            const newMarkers = state.markers.concat(action.payload)
            return {
                ...state,
                markers: newMarkers
            }
        case GET_CENTER_POSITION:
            return {
                ...state
            }
        case UPDATE_CENTER_POSITION:
            return {
                ...state,
                center: action.payload
            }
        case UPDATE_ZOOM:
            return {
                ...state,
                zoom: action.payload
            }
        default:
            return state
    }
}

export default mapReducer