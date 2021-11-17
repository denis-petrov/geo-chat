import {ADD_MESSAGE, GET_MESSAGES} from '../types'

const initialState = [];

const messageReducer = (state = initialState, action) => {
    switch (action.type) {
        case ADD_MESSAGE:
            console.log(state, action)
            return {
                ...state,
                messageId: action.payload
            }
        case GET_MESSAGES:
            console.log(state, action)
            return {
                ...state,
                messages: action.payload
            }
        default:
            return state
    }
}

export default messageReducer;