import {GET_USER_INFO} from '../types'

const initialState = {
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            console.log(state, action)
            return {
                ...state,
                user: action.payload
            }
        default:
            return state
    }
}

export default chatReducer;