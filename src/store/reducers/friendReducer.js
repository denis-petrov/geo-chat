import {ACCEPT_INVITE, GET_FRIENDS, GET_INVITES, INVITE_FRIEND, REJECT_INVITE, REMOVE_FRIEND} from '../types'

const initialState = [];

const friendReducer = (state = initialState, action) => {
    console.log(state, action.payload)
    switch (action.type) {
        case GET_FRIENDS:
            return {
                ...state,
                friends: action.payload
            }
        case GET_INVITES:
            return {
                ...state,
                invites: action.payload
            }
        case INVITE_FRIEND:
        case ACCEPT_INVITE:
        case REJECT_INVITE:
        case REMOVE_FRIEND:
            return {
                ...state,
                requestStatus: true
            }
        default:
            return state
    }
}

export default friendReducer;