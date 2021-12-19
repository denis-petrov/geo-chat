import {UPDATE_CENTER_POSITION, USER_CENTER_ERROR} from '../../types'

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
        console.log('ERORRRR')
        dispatch({
            type: USER_CENTER_ERROR,
            payload: console.log(e),
        })
    }
}
