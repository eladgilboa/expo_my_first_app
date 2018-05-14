import {combineReducers} from 'redux'
import playersList from './playersList'
import games from './games'

export default combineReducers({
    playersList,
    games
})

// export const getTodoItems = ({todoItems}) => todoItems