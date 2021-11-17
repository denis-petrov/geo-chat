import {GET_CENTER_POSITION, USER_CENTER_ERROR} from '../../types'

export const getCenterPosition = () => async dispatch => {
    try {
        dispatch({
            type: GET_CENTER_POSITION,
        })
    } catch (e) {
        dispatch({
            type: USER_CENTER_ERROR,
            payload: console.log(e),
        })
    }
}
