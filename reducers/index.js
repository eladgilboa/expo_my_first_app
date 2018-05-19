import {combineReducers} from 'redux'
import playersList from './playersList'
import matches from './matches'
import tempMatch from './tempMatch'

export default combineReducers({
    playersList,
    matches,
    tempMatch
})