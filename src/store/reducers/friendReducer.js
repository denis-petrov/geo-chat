import {GET_FRIENDS} from '../types'

const initialState = [];

const friendReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_FRIENDS:
            console.log(state, action.payload)
            return {
                ...state,
                friends: action.payload
            }
        default:
            return state
    }
}

export default friendReducer;