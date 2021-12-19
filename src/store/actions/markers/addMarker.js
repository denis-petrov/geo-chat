import {API} from '../../../api/API'
import {ADD_MARKER, MARKERS_ERROR} from '../../types'

export const addMarker = ({lat, lng, name, description, chatState}) => async dispatch => {
    try {
        console.log(JSON.stringify({lat, lng}))
        const res = await API.post('/map/markers', {
            "senderId": "2805ff59-ef17-4b30-8266-982aeb394c38", lat, lng, name, description, chatState
        })
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