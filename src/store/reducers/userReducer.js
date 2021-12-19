import {CREATE_USER, GET_USER_INFO} from '../types'

const initialState = {
    userId: '1',
    role: 'String',
    name: 'String',
    email: 'String',
    password: 'String'
}

const chatReducer = (state = initialState, action) => {
    switch (action.type) {
        case GET_USER_INFO:
            console.log(state, action)
            return {
                ...state,
                user: action.payload
            }
        case CREATE_USER:
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