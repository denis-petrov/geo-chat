import {API} from '../../../../api/API'
import {GET_MARKERS, MARKERS_ERROR} from '../../../types'
import {getCurrentUser} from "../../../../utils/getCurrentUser";

export const getMarkers = ({lat, lng, zoom}) => async dispatch => {
    try {
        console.log({lat, lng, zoom})
        const res = await API.get('/map/markers',
            {
                params: {
                    senderId: getCurrentUser().userId,
                    lat: lat,
                    lng: lng,
                    zoom: zoom
                }
            }
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