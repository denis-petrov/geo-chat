import {API} from '../../../api/API'
import {GET_MARKERS, MARKERS_ERROR} from '../../types'

export const getMarkers = () => async dispatch => {
    try {
        console.log('echo')
        const res = await API.get('/map/markers',
            { params: { senderId: "2805ff59-ef17-4b30-8266-982aeb394c38" } }
        )
        console.log(res)
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