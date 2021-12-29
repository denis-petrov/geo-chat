import {CENTER_POSITION_CENTER_ERROR, UPDATE_CENTER_POSITION} from '../../../types'

export const updateCenterByUserPosition = () => async dispatch => {
    try {
        navigator.geolocation.getCurrentPosition(position => {
                dispatch({
                    type: UPDATE_CENTER_POSITION,
                    payload: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude
                    }
                })
            }, () => {
                alert('Please enable your GPS position feature.')
                throw new Error('Error userPosition callback')
            },
            {maximumAge: 10000, timeout: 5000, enableHighAccuracy: true}
        )
    } catch (e) {
        dispatch({
            type: CENTER_POSITION_CENTER_ERROR,
            payload: console.log(e),
        })
    }
}
