import {UPDATE_USER_POSITION, USER_POSITION_ERROR} from '../../types'

export const updateUserPosition = () => async dispatch => {
    try {
        navigator.geolocation.getCurrentPosition(position => {
            dispatch({
                type: UPDATE_USER_POSITION,
                payload: {
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                }
            })
        })
    } catch (e) {
        dispatch({
            type: USER_POSITION_ERROR,
            payload: console.log(e),
        })
    }
}
