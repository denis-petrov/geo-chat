import {API} from '../../../api/API'
import {ADD_CHAT, CHATS_ERROR} from '../../types'
import {getCurrentUser} from "../../../utils/getCurrentUser";

export const addChat = (name) => async dispatch => {
    try {
        const user = getCurrentUser()
        const bodyFormData = new FormData()
        bodyFormData.append('name', name)
        bodyFormData.append('adminId', user.userId)
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