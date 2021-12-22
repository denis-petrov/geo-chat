import {ADD_MARKER, GET_MARKERS} from '../types'

const initialState = []

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKERS:
            return action.payload
        case ADD_MARKER:
            state = state.concat(action.payload)
            return state
        default:
            return state
    }
}

export default markerReducer