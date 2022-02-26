
const defaultState ={
    // time: {seconds: 0, minutes: 0, hours: 0, hundreds: 0}
}

export default function myReducer(state = defaultState, action = {}){
    switch(action.type) {
        case 'UPDATE_STATE':
            return state
        case 'UPDATE_BOARD':
            // console.log(action.gameBoard)
            return {...state, gameBoard: action.gameBoard}
        case 'CHANGE_SIZE':
            return {...state, boardSize: action.boardSize}
        case 'CHANGE_GAME_ON':
            return {...state, gameOn: action.order}
        case 'CHANGE_GAME_OVER':
            return {...state, gameOver: action.order}
        case 'CHANGE_MINES':
            return {...state, numOfMines: action.numOfMines}
        case 'CHANGE_LIVES':
            return {...state, lives: action.num}
        case 'CHANGE_SAFE_CLICKS':
            return {...state, safeClicks: action.num}
        case 'CHANGE_SMILEY':
            return {...state, smiley: action.order}
        case 'CHANGE_FLAGS':
            return {...state, numOfFlags: action.order}
        case 'CHANGE_TIME':
            return {...state, time: action.payload}
        case 'ZERO_TIMER':
            return {...state, zeroTimer: action.payload}
        default: 
            return state
    }   
}


