import React from "react"
import { useEffect, useState } from "react"
import { buildNewBoard, changeBoardSize, changeGameOver, changeGameOn, changeNumOfMines, changeLives, changeSmiley, changeFlags, changeTime, zeroTimer } from "../store/actions.js"
import { connect } from "react-redux"
import { useSelector } from "react-redux"
// import { dataService } from "../services/data-service.js"
//===============================================================================


//COMPONENT IMPORTS /////////////////////////////
//===============================================================================

import MainGameHeadline from '../OLD components/MainGameHeadline.js'
import { GameBoard } from "../OLD components/GameBoard/GameBoard.js"
import { Timer } from "../OLD components/Timer.js"
import { Lives } from "../OLD components/Lives.js"
import { Smiley } from "../OLD components/Smiley.js"
import { ChangeDifficulty } from "../OLD components/ChangeDifficulty.js"
import { Flags } from "../OLD components/Flags.js"
//===============================================================================

// let navigate = useNavigate()

function _MainGamePage(props) {
    const state = useSelector(state => state)

    useEffect(() => {
        props.changeBoardSize(4)
        props.changeNumOfMines(2)
        props.changeGameOn(false)
        props.changeGameOver(false)
        props.changeLives(4)
        props.changeSmiley('🙂')
        props.buildNewBoard(4)
        props.changeFlags(2)
        props.changeTime({})
        props.zeroTimer(0)
    }, [])


    const resetGame = (size = state.boardSize) => {
        props.changeBoardSize(size)
        props.changeNumOfMines(getNumOfMines(size))
        props.changeGameOn(false)
        props.changeGameOver(false)
        props.changeLives(4)
        props.changeSmiley('🙂')
        props.buildNewBoard(size)
        props.changeFlags(getNumOfMines(size))
        props.changeTime({})
        props.zeroTimer(geteZeroTimer())
    }

    const geteZeroTimer = ()=> {if (state.zeroTimer <= 999) {return (state.zeroTimer+1)} else {return 0}}

    const getNumOfMines = (size) => {
                switch (size) {
                case 4:
                    return 2             
                case 8:
                    return 12
                case 12:
                    return 30    
                default:
                    return state.numOfMines
        }

    }

    useEffect(()=>{
        if (state.gameOver && state.lives === 0) {
            props.changeSmiley('😥')
        
        }
        else if (state.gameOver && state.lives > 0) {
            // let points = calculatePoints()
            // console.log(points)
            props.changeSmiley('😎')
        }    
    }, [state.gameOver])




    if (state) return (
        <div className="main-game-page">
            <MainGameHeadline />
            <div className="game-area">
                <div className="game-sub-area">
                    <ChangeDifficulty resetGame={resetGame} />
                    <Timer />
                    <div className="lives-and-flags">
                    <Lives />
                    <Flags />
                    </div>
                </div>
                <div className="smiley-and-board">
                <Smiley resetGame={resetGame} />
                <GameBoard />
                </div>
            </div>
        </div>
    )

}

const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {
    changeBoardSize,
    buildNewBoard,
    changeGameOn,
    changeGameOver,
    changeNumOfMines,
    changeLives,
    changeSmiley,
    changeFlags,
    changeTime,
    zeroTimer,
}

export const MainGamePage = connect(mapStateToProps, mapDispatchToProps)(_MainGamePage)