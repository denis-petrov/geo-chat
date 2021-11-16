import { combineReducers } from 'redux'
import markerReducer from './reducers/markerReducer'
import userPositionReducer from './reducers/userPositionReducer'

export default combineReducers({
    markers: markerReducer,
    userPosition: userPositionReducer
})