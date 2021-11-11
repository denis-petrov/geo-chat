import {GET_USER_POSITION, UPDATE_USER_POSITION} from '../types'


const initialState = {
    lat: 55.74101998457737,
    lng: 37.62268066406251
}

const userPositionReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_POSITION:
            return {
                ...state,
            }
        case UPDATE_USER_POSITION:
            return action.payload
        default:
            return state
    }
}

export default userPositionReducer