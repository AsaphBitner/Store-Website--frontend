import { dataService } from "../services/data-service"


export function createProducts(){ 
    return async (dispatch) => {
    let products = await dataService.createProducts()
    dispatch({type: 'UPDATE_PRODUCTS', products})
}
}

export function addProduct(payload){ 
    return async (dispatch) => {
        let products = await dataService.addProduct(payload)
        dispatch({type: 'UPDATE_PRODUCTS', products})
    }
}
export function updateProduct(payload){ 
    return async (dispatch) => {
        let products = await dataService.updateProduct(payload)
        dispatch({type: 'UPDATE_PRODUCTS', products})
    }
}

export function deleteProduct(payload){ 
    return async (dispatch) => {
        let products = await dataService.deleteProduct(payload)
        dispatch({type: 'UPDATE_PRODUCTS', products})
    }
}

export function placeMines(payload){ 
    return async (dispatch) => {
    let board = await dataService.placeMines(payload)
    // console.log('HELLO!!', board)
    dispatch({type: 'UPDATE_BOARD', gameBoard: board})
    return board
    }
}

export function openAround(payload){ 
    return async (dispatch) => {
    let board = await dataService.openAround(payload)
    // console.log('HELLO!!', board)
    dispatch({type: 'UPDATE_BOARD', gameBoard: board})
    return board
    }
}

export function showBombs(payload){ 
    return async (dispatch) => {
    let board = await dataService.showBombs(payload)
    dispatch({type: 'UPDATE_BOARD', gameBoard: board})
    return board
    }
}

export function changeBoardSize(size) {
    return async (dispatch) => {
        await dataService._save('boardSize', size)
        dispatch({type: 'CHANGE_SIZE', boardSize: size})
    }
} 

export function changeNumOfMines(num) {
    return async (dispatch) => {
        await dataService._save('numOfMines', num)
        dispatch({type: 'CHANGE_MINES', numOfMines: num})
    }
} 

export function changeGameOn(order) {
    return async (dispatch) => {
        await dataService._save('gameOn', order)
        dispatch({type: 'CHANGE_GAME_ON', order})
    }
}

export function changeGameOver(order) {
    return async (dispatch) => {
        await dataService._save('gameOver', order)
        dispatch({type: 'CHANGE_GAME_OVER', order})
    }
}

export function changeLives(num) {
    return async (dispatch) => {
        await dataService._save('lives', num)
        dispatch({type: 'CHANGE_LIVES', num})
    }
}

export function changeSafeClicks(num) {
    return async (dispatch) => {
        await dataService._save('safeClicks', num)
        dispatch({type: 'CHANGE_SAFE_CLICKS', num})
    }
}

export function changeSmiley(order) {
    return async (dispatch) => {
        await dataService._save('smiley', order)
        dispatch({type: 'CHANGE_SMILEY', order})
    }
}

export function changeFlags(order) {
    return async (dispatch) => {
        await dataService._save('numOfFlags', order)
        dispatch({type: 'CHANGE_FLAGS', order})
    }
}

export function changeTime(payload) {
    return async (dispatch) => {
        await dataService._save('time', payload)
        // console.log('TIME IN ACTION: ', payload)
        dispatch({type: 'CHANGE_TIME', payload})
    }
}

export function zeroTimer(payload) {
    return (dispatch) => {
        dispatch({type: 'ZERO_TIMER', payload})
    }
}


