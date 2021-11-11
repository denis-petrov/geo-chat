import {GET_USER_POSITION, USER_POSITION_ERROR} from '../../types'

export const getUserPosition = () => async dispatch => {
    try {
        dispatch({
            type: GET_USER_POSITION,
        })
    } catch (e) {
        dispatch({
            type: USER_POSITION_ERROR,
            payload: console.log(e),
        })
    }
}
