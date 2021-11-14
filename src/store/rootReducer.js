import { combineReducers } from 'redux'
import markerReducer from './reducers/markerReducer'
import chatReducer from "./reducers/chatReducer";
import userReducer from "./reducers/userReducer";

export default combineReducers({
    markers: markerReducer,
    chats: chatReducer,
    user: userReducer
})