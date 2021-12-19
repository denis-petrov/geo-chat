import {ADD_MARKER, GET_MARKERS} from '../types'

const initialState = []

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKERS:
            console.log(state)
            return action.payload
        case ADD_MARKER:
            console.log(state)
            const updatedMarkers = state.markers
            updatedMarkers.push(action.payload)
            return updatedMarkers
        default:
            return state
    }
}

export default markerReducer