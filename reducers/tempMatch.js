const DEFAULT_STATE = {
    date : Date.now(),
    teamA: {
        players:[],
        goals:[]
    },
    teamB: {
        players:[],
        goals:[]
    },
}

export default (state = DEFAULT_STATE, {type, matchObject} = {}) => {
    switch (type) {
        case 'CLEAR_TEMP_MATCH':
            return { ...DEFAULT_STATE, date : Date.now() };
        case 'SET_TEMP_MATCH':
            return matchObject;
        default:
            return state 
    }
}