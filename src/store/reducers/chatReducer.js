import {ADD_CHAT, GET_CHAT_INFO, GET_CHATS} from '../types'

const initialState = [];

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS:
            console.log(state, action)
            return {
                ...state,
                chats: action.payload
            }
        case ADD_CHAT:
            console.log(state, action)
            return action.payload
        case GET_CHAT_INFO:
            console.log(state, action)
            return {
                ...state,
                chatInfo: action.payload
            }
        default:
            return state
    }
}

export default chatReducer;