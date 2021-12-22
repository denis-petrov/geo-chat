import {ADD_MARKER, GET_MARKERS} from '../types'

const initialState = []

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKERS:
            return action.payload
        case ADD_MARKER:
            console.log(state)
            state = state.concat(action.payload)
            console.log(state)
            return state
        default:
            return state
    }
}

export default markerReducer