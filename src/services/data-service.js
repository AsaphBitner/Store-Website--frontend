import { findIndex } from "lodash";


export const dataService = {
    buildNewBoard,
    makeId,
    _save,
    _load,
    updateCell,
    placeMines,
    openAround,
    showBombs,
}


function _save(key, item){
    localStorage.setItem(key, JSON.stringify(item))
    // console.log(key, ' ', item)
    return Promise.resolve(item)
}


function _load(payload){
    const item = JSON.parse(localStorage.getItem(payload))
    return Promise.resolve(item)
}



async function buildNewBoard(size) {
    let board = [];
    for (var ii = 0; ii < size; ii++) {
        board.push([]);
        for (var jj = 0; jj < size; jj++)
            board[ii][jj] = { _id: makeId(), mineInCell: false, flagInCell: false, cellClicked: false, minesAround: -1, row: ii, column: jj, cellContents: '' };
    }
    await _save('gameBoard', board)
    return board;
}

async function updateCell(payload){
    let board = await _load('gameBoard')
    // console.log(payload)
    board[payload.row].splice(payload.column, 1, payload)
    await _save('gameBoard', board)
    return board
}


async function placeMines({size, numMines, row, column}) {
    // console.log(size, numMines, row, column)
    // board[row][column].cellClicked = true
    let minesPlaced = 0;
    let board = await _load('gameBoard')
    while (minesPlaced < numMines) {
        for (var ii = 0; ii < size; ii++) {
            for (var jj = 0; jj < size; jj++) {
                // console.log(numMines, minesPlaced)
                // const test = (ii, jj) => {return ((ii, jj) => console.log(board[ii][jj]))}
                if (minesPlaced === numMines) { break };
                if (ii === row && jj === column) { continue };
                if (board[ii][jj].mineInCell) { continue }
                else if (Math.random() < (numMines / (size * size))) { board[ii][jj].mineInCell = true; minesPlaced++ };    
            }
        }
    }
    
    for (let ll = 0; ll < size; ll++){
        for (let mm = 0; mm < size; mm++){
            board[ll][mm].minesAround = updateMinesAround(board, size, ll, mm)
        }
    }        
    // console.log('SAVING ', board)
    await _save('gameBoard', board)
    return board
}

function updateMinesAround(board, size, row, column){
    let counter = 0
    for (var ii = row-1; ii < row+2; ii++) {
        for (var jj = column-1; jj < column+2; jj++) {
            if (ii < 0 || jj < 0 || ii >= size || jj >= size || (ii === row && jj === column)) {continue}
            else if (board[ii][jj].mineInCell) {counter++}
        }
    } 
    return counter  
}

async function openAround(cell){
    // console.log(cell)
    let row = cell.row
    let column = cell.column
    let oldBoard = await _load('gameBoard')
    let size = oldBoard.length
    
    for (var ii = row-1; ii < row+2; ii++) {
        for (var jj = column-1; jj < column+2; jj++) {
            let board = await _load('gameBoard')
            if (ii < 0 || jj < 0 || ii >= size || jj >= size || board[ii][jj].cellClicked === true || board[ii][jj].flagInCell === true) {continue}
            board[ii][jj].cellClicked = true
            if (board[ii][jj].minesAround > 0) {board[ii][jj].cellContents = `${board[ii][jj].minesAround}`} else {board[ii][jj].cellContents = ''}
            await _save('gameBoard', board )
            if (board[ii][jj].minesAround === 0) {
                board[ii][jj].cellContents = ''
                await openAround(board[ii][jj])
            }
        }
    }
    let toReturnBoard = await _load('gameBoard')
    return toReturnBoard
}

async function showBombs(cell){
    let board = await _load('gameBoard')
    let size = await _load('boardSize')

    for (let ii = 0; ii < size; ii++) {
        for (let jj = 0; jj < size; jj++) {
            if (board[ii][jj].cellClicked || (ii === cell.row && jj === cell.column)) {continue}
            else {
                board[ii][jj].cellClicked = true
            if (board[ii][jj].flagInCell) {board[ii][jj].cellContents = '🚩'; continue} 
            else if (board[ii][jj].mineInCell) {board[ii][jj].cellContents = '💣'}
            else {(board[ii][jj].minesAround > 0) ? board[ii][jj].cellContents = board[ii][jj].minesAround : board[ii][jj].cellContents = ''}
            
        }    
        }
    }
    await _save('gameBoard', board)
    return board
}

function makeId(length = 7) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var ii = 0; ii < length; ii++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

