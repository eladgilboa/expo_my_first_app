const DEFAULT_STATE = {
    date : Date.now(),
    duration:{
        value:0,
        isPaused:true,
        lastUpdate:0
    },
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
    //console.log(type,matchObject);
    switch (type) {
        case 'CLEAR_TEMP_MATCH':
            return { ...DEFAULT_STATE, date : Date.now() };
        case 'SET_TEMP_MATCH':
            return matchObject;
        case 'SET_TEMP_MATCH_DURATION':
            return { ...state,...matchObject}
        default:
            return state 
    }
}