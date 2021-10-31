import { combineReducers } from 'redux'
import markerReducer from './reducers/markerReducer'

export default combineReducers({
    markers: markerReducer
})