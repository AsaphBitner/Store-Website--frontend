import React from "react";
// import { dataService } from "../../services/data-service.js"
// import { useSelector } from "react-redux";
import { connect } from "react-redux";
import { updateCell, buildNewBoard, changeBoardSize, changeGameOver, changeGameOn, changeNumOfMines, changeLives, changeSafeClicks, changeSmiley, changeFlags, changeTime } from "../store/actions.js"

function _ChangeDifficulty(props) {
    // let state = useSelector(state => state)
    // console.log(cell)
    
    const handleLeftClickEasy = (ev)=> {
        ev.preventDefault()
        props.resetGame(4)
    }
    
    const handleLeftClickMedium = (ev)=> {
        ev.preventDefault()
        props.resetGame(8)    
    }


    const handleLeftClickHard = (ev)=> {
        ev.preventDefault()
        props.resetGame(12)
    }

    const handleRightClick = (ev)=> {
        ev.preventDefault()    
    }    

    return (
        <div className="change-difficulty">
            <button onClick={handleLeftClickEasy} onContextMenu={handleRightClick}>
                Easy
            </button>
            <button onClick={handleLeftClickMedium} onContextMenu={handleRightClick}>
                Medium
            </button>
            <button onClick={handleLeftClickHard} onContextMenu={handleRightClick}>
                Hard
            </button>
        </div>
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
    changeSafeClicks, 
    changeSmiley,
    changeFlags,
    changeTime,
  }

  export const ChangeDifficulty = connect(mapStateToProps, mapDispatchToProps)(_ChangeDifficulty)

  
  
  
  