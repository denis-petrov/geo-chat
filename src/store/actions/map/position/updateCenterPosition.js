import {CENTER_POSITION_CENTER_ERROR, UPDATE_CENTER_POSITION} from '../../../types'

export const updateCenterPosition = ({lat, lng}) => async dispatch => {
    try {
        console.log(lat + " : " + lng)
        dispatch({
            type: UPDATE_CENTER_POSITION,
            payload: {
                lat: lat,
                lng: lng
            }
        })
    } catch (e) {
        dispatch({
            type: CENTER_POSITION_CENTER_ERROR,
            payload: console.log(e),
        })
    }
}
