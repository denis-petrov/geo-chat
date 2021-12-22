import {API} from '../../../api/API'
import {ADD_MARKER, MARKERS_ERROR} from '../../types'
import {getCurrentUser} from "../../../utils/getCurrentUser";

export const addMarker = ({lat, lng, title, description, chatState}) => async dispatch => {
    try {
        console.log(JSON.stringify({lat, lng}))
        const senderId = getCurrentUser().userId
        console.log({senderId, lat, lng, title, description, chatState})
        const res = await API.post('/map/markers', {senderId, lat, lng, title, description, chatState})
        console.log(res)
        dispatch({
            type: ADD_MARKER,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MARKERS_ERROR,
            payload: console.log(e),
        })
    }
}