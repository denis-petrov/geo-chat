import { combineReducers } from 'redux'
import markerReducer from './reducers/markerReducer'
import centerPositionReducer from './reducers/centerPositionReducer'
import chatReducer from './reducers/chatReducer';
import userReducer from './reducers/userReducer';
import messageReducer from './reducers/messageReducer';
import friendReducer from "./reducers/friendReducer";

export default combineReducers({
    markers: markerReducer,
    centerPosition: centerPositionReducer,
    chats: chatReducer,
    messages: messageReducer,
    user: userReducer,
    friends: friendReducer
})