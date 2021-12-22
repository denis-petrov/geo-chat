import {AUTH_USER, CREATE_USER, GET_USER_INFO} from '../types'

const initialState = {}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case AUTH_USER:
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
                userId: action.payload
            }
        default:
            return state
    }
}

export default userReducer