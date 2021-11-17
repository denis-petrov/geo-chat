import {UPDATE_CENTER_POSITION, USER_CENTER_ERROR} from '../../types'

export const updateCenterPosition = (address) => async dispatch => {
    try {
        console.log(address)
        dispatch({
            type: UPDATE_CENTER_POSITION,
            payload: {
                lat: address.y,
                lng: address.x
            }
        })
    } catch (e) {
        dispatch({
            type: USER_CENTER_ERROR,
            payload: console.log(e),
        })
    }
}
