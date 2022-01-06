import {AUTH_USER, CREATE_USER, GET_USER_INFO, GET_USERS_BY_NAME, USER_ERROR} from '../types'

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
        case GET_USER_INFO:
            return {
                ...state,
                user: action.payload
            }
        case CREATE_USER:
            return {
                ...state,
                userId: action.payload
            }
        case USER_ERROR:
            return {
                ...state,
                error: action.payload
            }
        case GET_USERS_BY_NAME:
            return {
                ...state,
                users: action.payload
            }
        default:
            return state
    }
}

export default userReducer