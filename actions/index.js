/**
 * Created by elad.gilboa on 20/09/2017.
 */

function guid() {
    function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
            .toString(16)
            .substring(1);
    }

    return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
}

export const createPlayer = (player) => {
    player.id = guid();
    return {
        type: 'PLAYER_CREATED',
        player
    }
};

export const deletePlayer = (player) => {
  return {
      type: 'PLAYER_DELETED',
      player
  }
};

export const addMatch = (matchObject) => {
    return {
        type: 'ADD_MATCH',
        matchObject
    }
};

// TEMP MATCH
export const setTempMatch = (matchObject) => {
    return {
        type: 'SET_TEMP_MATCH',
        matchObject
    }
}

export const clearTempMatch = () => (
    {
        type: 'CLEAR_TEMP_MATCH'
    }
)