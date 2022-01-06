import {API} from '../../../../api/API'
import {DELETE_MARKER, MARKERS_ERROR} from '../../../types'

export const deleteMarker = (markerId) => async dispatch => {
    try {
        console.log(markerId)
        const bodyFormData = new FormData()
        bodyFormData.append('markerId', markerId)
        const res = await API.post('/map/markers/removeMarkerById', bodyFormData)
        dispatch({
            type: DELETE_MARKER,
            payload: res.data
        })
    } catch (e) {
        dispatch({
            type: MARKERS_ERROR,
            payload: console.log(e)
        })
    }
}
