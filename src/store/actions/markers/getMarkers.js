import {API} from '../../../api/API'
import {GET_MARKERS, MARKERS_ERROR} from '../../types'

export const getMarkers = () => async dispatch => {
    try {
        const res = await API.get('/map/markers')
        dispatch({
            type: GET_MARKERS,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MARKERS_ERROR,
            payload: console.log(e),
        })
    }
}

export default getMarkers()