
export function getPlayer( state, id ){
    return state.find( ( player ) => {
        return player.id === id;
    })
}

function getPlayerIndex( state, id ){
    return state.findIndex( (player) => {
        return player.id === id;
    })
}

function createPlayer( state, player){
    if( getPlayerIndex( state, player.id ) > -1 ){
        console.error('player index already exist. see creatPlayer' );
        return state;
    }
    return [ ...state, player ];
}

function updatePlayer( state, player ) {
    let index = getPlayerIndex( state, player.id );
    if( index === -1 ){
        console.error('player index does not exist. see updatePlayer' );
        return state;
    }

    return state.map( ( item ) => {
        if( item.id !== player.id ) {
            // This isn't the item we care about - keep it as-is
            return item;
        }

        return {
            ...item,
            ...player
        };
    });
}

export default ( state = [], { type, player} = {} ) => {
    switch ( type ) {
        case 'PLAYER_CREATED':
            return createPlayer( state, player );
        case 'PLAYER_UPDATE':
            return updatePlayer( state, player );
        case 'PLAYER_DELETED':
            return state.filter( ( { id } ) => id !== player.id);
        default:
            return state 
    }
}