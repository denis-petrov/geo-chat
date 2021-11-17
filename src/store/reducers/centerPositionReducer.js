import {GET_CENTER_POSITION, UPDATE_CENTER_POSITION} from '../types'

const initialState = {
    lat: 55.74101998457737,
    lng: 37.62268066406251
}

const centerPositionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CENTER_POSITION:
            return {
                ...state,
            }
        case UPDATE_CENTER_POSITION:
            return action.payload
        default:
            return state
    }
}

export default centerPositionReducer