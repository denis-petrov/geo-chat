import {combineReducers} from 'redux'
import chatReducer from './reducers/chatReducer'
import userReducer from './reducers/userReducer'
import messageReducer from './reducers/messageReducer'
import friendReducer from './reducers/friendReducer'
import mapReducer from './reducers/mapReducer'

export default combineReducers({
    map: mapReducer,
    chats: chatReducer,
    messages: messageReducer,
    user: userReducer,
    friends: friendReducer
})