import {UPDATE_ZOOM, UPDATE_ZOOM_ERROR} from '../../../types'

export const updateZoom = ({zoom}) => async dispatch => {
    try {
        dispatch({
            type: UPDATE_ZOOM,
            payload: zoom
        })
    } catch (e) {
        dispatch({
            type: UPDATE_ZOOM_ERROR,
            payload: console.log(e),
        })
    }
}
