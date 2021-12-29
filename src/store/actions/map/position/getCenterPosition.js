import {CENTER_POSITION_CENTER_ERROR, GET_CENTER_POSITION} from '../../../types'

export const getCenterPosition = () => async dispatch => {
    try {
        dispatch({type: GET_CENTER_POSITION})
    } catch (e) {
        dispatch({
            type: CENTER_POSITION_CENTER_ERROR,
            payload: console.log(e),
        })
    }
}
