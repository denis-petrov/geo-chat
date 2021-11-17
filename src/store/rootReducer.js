import { combineReducers } from 'redux'
import markerReducer from './reducers/markerReducer'
import userPositionReducer from './reducers/userPositionReducer'
import chatReducer from './reducers/chatReducer';
import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';

export default combineReducers({
    markers: markerReducer,
    userPosition: userPositionReducer,
    chats: chatReducer,
    messages: messageReducer,
    user: userReducer
})