import { combineReducers } from 'redux'
import markerReducer from './reducers/markerReducer'
import centerPositionReducer from './reducers/centerPositionReducer'

export default combineReducers({
    markers: markerReducer,
    centerPosition: centerPositionReducer
})