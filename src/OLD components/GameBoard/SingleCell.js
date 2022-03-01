import cloneDeep from "lodash.clonedeep";
import React, { useEffect, useState } from "react";
// import { dataService } from "../../services/data-service.js"
import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { updateCell, buildNewBoard, placeMines, openAround, showBombs, changeBoardSize, changeGameOver, changeGameOn, changeNumOfMines, changeLives, changeSmiley, changeFlags, changeTime } from "../../store/actions.js"

function _SingleCell(props) {
    // let [safeClickTOs, setSafeClickTOs] = useState(0)
    let state = useSelector(state => state)
    let cell = props.cell.cell
    let [timeOutMines, setTimeOutMines] = useState(null)
    let [cellBackground, setCellBackground] = useState('')
 
    const openClosed = () => {
        if (cell.cellClicked) {return 'open'} else {return 'closed'}
        }
    
    const showNeutralized = ()=> {
        for (let ii = 0; ii < state.boardSize; ii++) {
            for (let jj = 0; jj < state.boardSize; jj++) {
            if (cell.mineInCell && cell.flagInCell) {setCellBackground('cell-green-background')}
            if (cell.mineInCell && !cell.flagInCell) {setCellBackground('cell-red-background')}
            if (!cell.mineInCell && cell.flagInCell) {setCellBackground('cell-blue-background')}
            if (!cell.mineInCell && !cell.flagInCell) {setCellBackground('')}
            }
        }
    }
    
    /////////////////////////////////////////////////////////////////////

        const checkVictory = () => {
        if (state.numOfFlags > 0) {return false}
        // let victoryStatus = true
        for (let ii = 0; ii < state.boardSize; ii++){
            for (let jj = 0; jj < state.boardSize; jj++){
                if ((state.gameBoard[ii][jj].flagInCell && !state.gameBoard[ii][jj].mineInCell) 
                    || (!state.gameBoard[ii][jj].flagInCell && state.gameBoard[ii][jj].mineInCell)) 
                {return false} 
            }
        }
        return true
    }    
    // console.log(cell)
        
//////////////////////////////////////////////////////////////////////////////////////////////

    const handleLeftClick = async (ev)=> {
        ev.preventDefault()
        if (cell.flagInCell || cell.cellClicked || state.gameOver) {return}
        if (!state.gameOn && !state.gameOver) {
            props.changeGameOn(true)
            let payload = {
                size: state.boardSize, numMines: state.numOfMines, row: cell.row, column: cell.column
            }
            let newBoard = await props.placeMines(payload)
            // console.log(newBoard)
            cell = cloneDeep(newBoard[cell.row][cell.column])
            props.updateCell(cell)
        } 
        if (cell.mineInCell) {
            // setSafeClickTOs(safeClickTOs+1)
            if (timeOutMines) {clearTimeout(timeOutMines); setTimeOutMines(null)}
            if (state.lives > 1) {
                cell.cellContents = '💣'
                props.changeLives(state.lives-1)
                props.updateCell(cell)
                setTimeOutMines(setTimeout(() => {
                    if (state.gameOver || !state.gameOn || cell.cellClicked || cell.flagInCell ) {return}
                    else {cell.cellContents = '' 
                          props.updateCell(cell)}
                    timeOutMines = null
                }, 9000))
                return
            }
            else {
                if (timeOutMines) {clearTimeout(timeOutMines); setTimeOutMines(null)}
                props.changeLives(state.lives-1)
                props.changeGameOn(false)
                props.changeGameOver(true)
                await props.showBombs(cell)
                cell.cellContents = '💥'
                cell.cellClicked = true
                props.updateCell(cell)
                // console.log('HELLO!!!')
                return
            }
        } 
        else if (cell.minesAround) {cell.cellContents = `${cell.minesAround}`} 
        else {
            cell.cellContents = ''
            props.openAround(cell)
        }
        cell.cellClicked = true
        props.updateCell(cell)
        
        // console.log(cell.cellContents)
        // dataService.placeMines(4, 2, props.row, props.column)
        // console.log(cell.mineInCell)
        }
    
    const handleRightClick = async (ev)=> {
        ev.preventDefault()
        if (timeOutMines) {clearTimeout(timeOutMines); setTimeOutMines(null)}
        if (state.gameOver || !state.gameOn || cell.cellClicked) {return}
        
        else if (cell.flagInCell) {cell.flagInCell = false; cell.cellContents = ''; props.changeFlags(state.numOfFlags+1); props.updateCell(cell)}
        
        else if (!cell.flagInCell && state.numOfFlags > 0) {
        cell.flagInCell = true; 
        cell.cellContents = '🚩'; 
        await props.changeFlags(state.numOfFlags-1); 
        await props.updateCell(cell)
        // cell = cloneDeep(state.gameBoard[cell.row][cell.column])
    }       
    }    

    useEffect(()=> {
        // console.log(state.numOfFlags)
        const victory = checkVictory()
        if (victory){
            props.changeGameOn(false)
            props.changeGameOver(true)
            props.showBombs(cell)
        }
    }, [state.numOfFlags])

    useEffect(()=> {
        if (!state.gameOn || state.gameOver) {
            if (timeOutMines) {clearTimeout(timeOutMines); setTimeOutMines(null)}
            showNeutralized()
        }
    }, [state.gameOn, state.gameOver])


    return (
        <td className={`single-cell ${openClosed()} ${cellBackground}`} onClick={handleLeftClick} onContextMenu={handleRightClick}>
            {cell.cellContents}
        </td>
    )
}

const mapStateToProps = state => {
    return {...state}
  }
  const mapDispatchToProps = {
    updateCell,
    changeBoardSize,
    buildNewBoard,
    changeGameOn,
    changeGameOver,
    changeNumOfMines,
    changeLives,  
    changeSmiley,
    changeFlags,
    changeTime,
    placeMines,
    openAround,
    showBombs,
  }

  export const SingleCell = connect(mapStateToProps, mapDispatchToProps)(_SingleCell)

  
  
  
  
  // const handleClick = (side) => { 
      //     return function(ev) { 
          //         ev.preventDefault()
          //         if(side == 'left') { console.log('left was clicked') } else {  console.log('right was clicked') } } }
          // {/* <td onClick={handleClick('left')} onContextMenu={handleClick('right')}> */}
          // {/* |R{props.cell.row}C{props.cell.column}|  */}
          
         