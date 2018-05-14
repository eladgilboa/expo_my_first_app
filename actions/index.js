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

export const startMatch = (matchObject) => {
    matchObject.date = new Date().getTime();
    return {
        type: 'MATCH_START',
        matchObject
    }
};