import { combineReducers } from 'redux'
import markerReducer from './reducers/markerReducer'
import centerPositionReducer from './reducers/centerPositionReducer'
import userPositionReducer from './reducers/userPositionReducer'
import chatReducer from './reducers/chatReducer';
import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';

export default combineReducers({
    markers: markerReducer,
    centerPosition: centerPositionReducer,
    userPosition: userPositionReducer,
    chats: chatReducer,
    messages: messageReducer,
    user: userReducer
})