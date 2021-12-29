import {
    ADD_MESSAGE,
    GET_LAST_MESSAGES_FOR_CHAT_LIST,
    GET_MESSAGES,
    GET_MESSAGES_BEFORE_DATE
} from '../types'

const initialState = []

const messageReducer = (state = initialState, action) => {
    let data = action.payload
    let chatId = data !== undefined && data.length > 0 ? data[0].chatId : null
    switch (action.type) {
        case ADD_MESSAGE:
            console.log(state, action)
            return {
                ...state,
                messageId: data
            }
        case GET_MESSAGES_BEFORE_DATE:

            if (chatId) {
                if (state.messages !== undefined
                    && state.messages[chatId] !== undefined
                    && state.messages[chatId].length > 0
                    && data.length === 1
                ) {
                    let messages = state.messages[chatId]
                    if (messages[messages.length - 1].chatId === data[0].chatId) {
                        data = state.messages.concat(data)
                    }
                }

                if (state.messages === undefined) {
                    state.messages = {}
                }

                state.messages[chatId] = state.messages[chatId].concat(data)
                console.log(state.messages)
                data = state.messages

                if (data.length > 0) {
                    return {
                        ...state,
                        messages: data
                    }
                }

                return {
                    ...state,
                    messages: data
                }
            }

            return state
        case GET_MESSAGES:
            if (chatId) {
                if (state.messages !== undefined
                    && state.messages[chatId] !== undefined
                    && state.messages[chatId].length > 0
                    && data.length === 1
                ) {
                    let messages = state.messages[chatId]
                    console.log(state.messages[chatId], data)
                    if (messages[messages.length - 1].chatId === data[0].chatId && messages[messages.length - 1].messageId !== data[0].messageId) {
                        data = data.concat(messages)
                    }
                }

                if (state.messages === undefined) {
                    state.messages = {}
                }

                state.messages[chatId] = data
                console.log(state.messages)
                data = state.messages
            }

            return {
                ...state,
                messages: data
            }
        case GET_LAST_MESSAGES_FOR_CHAT_LIST:
            if (chatId) {
                if (state.lastMessages === undefined) {
                    state.lastMessages = {}
                }

                state.lastMessages[chatId] = data[0]
                console.log(state.lastMessages)
                data = state.lastMessages
            }

            return {
                ...state,
                lastMessages: data
            }
        default:
            return state
    }
}

export default messageReducer