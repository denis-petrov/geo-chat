import {API} from '../../../../api/API'
import {ADD_MARKER, MARKERS_ERROR} from '../../../types'
import {getCurrentUser} from '../../../../utils/getCurrentUser'

export const addMarker = ({lat, lng, title, description, chatState}) => async dispatch => {
    try {
        const senderId = getCurrentUser().userId
        const res = await API.post('/map/markers', {senderId, lat, lng, title, description, chatState})
        dispatch({
            type: ADD_MARKER,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MARKERS_ERROR,
            payload: console.log(e)
        })
    }
}