import {API} from '../../../api/API'
import {ADD_CHAT, CHATS_ERROR} from '../../types'

export const addChat = (name) => async dispatch => {
    try {
        const bodyFormData = new FormData()
        bodyFormData.append('name', name)
        const res = await API.post('/chat/create', bodyFormData)
        dispatch({
            type: ADD_CHAT,
            payload: res.data
        })

        return res.data
    } catch (e) {
        dispatch({
            type: CHATS_ERROR,
            payload: console.log(e),
        })
    }
}