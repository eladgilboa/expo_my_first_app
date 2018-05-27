const DEFAULT_STATE = [];

export default (state = DEFAULT_STATE, {type, matchObject} = {}) => {
    switch (type) {
        case 'ADD_MATCH':
            return [ ...state, matchObject ];
        default:
            return state 
    }
}