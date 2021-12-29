import {
    ADD_CHAT,
    ADD_MEMBER_BY_INVITE,
    ADD_MEMBER_TO_CHAT,
    GET_CHAT_INFO,
    GET_CHAT_INVITE,
    GET_CHATS,
    UPDATE_CHAT_NAME
} from '../types'

const initialState = []

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_CHATS:
            return {
                ...state,
                chats: action.payload
            }
        case ADD_CHAT:
            return {
                ...state,
                newChatId: action.payload
            }
        case GET_CHAT_INFO:
            return {
                ...state,
                chatInfo: action.payload
            }
        case GET_CHAT_INVITE:
            return {
                ...state,
                inviteToken: action.payload
            }
        case ADD_MEMBER_BY_INVITE:
            return {
                ...state,
                inviteStatus: true
            }
        default:
            return state
    }
}

export default chatReducer