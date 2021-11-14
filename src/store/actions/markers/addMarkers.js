import {API} from '../../../api/API'
import {ADD_MARKER, MARKERS_ERROR} from '../../types'

export const addMarker = () => async dispatch => {
    try {
        const res = await API.post('/map/markers', 'request test')
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

export default addMarker()