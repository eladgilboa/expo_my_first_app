const DEFAULT_STATE = {}

export default (state = DEFAULT_STATE, {type, matchObject} = {}) => {
    switch (type) {
        case 'ADD_MATCH':
            return [ ...state, matchObject ];
        case 'TODO_ITEM_DELETED':
            return {...state, lastModified: Date.now()}
        default:
            return state 
    }
}