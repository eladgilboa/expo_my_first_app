import _ from 'lodash';
const DEFAULT_STATE = [];

function updateMatch(state,matchObj){
    const timestemp = matchObj.date;
    let newState = [...state];
    
    const index = _.findIndex(newState, { 'date': timestemp });
    if(index > -1){
        newState[index] = matchObj;
    }
    
    return newState;
}

export default (state = DEFAULT_STATE, {type, matchObject, id} = {}) => {
    console.log({type, matchObject, id});
    switch (type) {
        case 'ADD_MATCH':
            return [ ...state, matchObject ];
        case 'UPDATE_MATCH':
            return updateMatch(state,matchObject);
        case 'DELETE_MATCH':
            return state.filter( match => match.date !== id );
        default:
            return state 
    }
}