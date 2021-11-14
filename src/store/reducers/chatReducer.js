import {ADD_CHAT, ADD_MESSAGE, GET_CHAT_INFO, GET_CHATS, GET_MESSAGES} from '../types'

const initialState = [
    {
        chatId: 1,
        name: 'Test',
        members: [1, 2]
    }
];

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
            return {
                ...state,
                chats: action.payload
            }
        case GET_CHAT_INFO:
            console.log(state, action)
            return {
                ...state,
                chats: action.payload
            }
        case ADD_MESSAGE:
            console.log(state, action)
            return {
                ...state,
                chats: action.payload
            }
        case GET_MESSAGES:
            console.log(state, action)
            return {
                ...state,
                chats: action.payload
            }
        default:
            return state
    }
}

export default chatReducer;