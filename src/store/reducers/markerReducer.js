import {ADD_MARKER, GET_MARKERS} from '../types'

const initialState = {
    markers: [],
    loading: true
}

const markerReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_MARKERS:
            console.log(state)
            return {
                ...state,
                markers: action.payload,
                loading: false
            }
        case ADD_MARKER:
            console.log(state)
            return {
                ...state,
                markers: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export default markerReducer