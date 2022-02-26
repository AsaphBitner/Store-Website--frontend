import React from "react";
// import {useState, useEffect} from 'react'
import { useSelector } from "react-redux";
import { changeLives } from "../store/actions";
import { connect } from "react-redux";

function _Lives(props) {
    let state = useSelector(state => state)

        const noExtraLives = () => {
            if (state.gameOn) {props.changeLives(1)}
        }


    return (
        <div className="lives" onClick={() => noExtraLives()}>
        <div className="heart">{(state.lives > 1) ? '💖' : '💔'}</div>
        <div className="extra-lives">{(state.lives > 1) ? `0${(state.lives)-1}` : `00`}</div>  
        </div>
    )
}
const mapStateToProps = state => {
    return {...state}
  }
  const mapDispatchToProps = {
    changeLives,
  }

  export const Lives = connect(mapStateToProps, mapDispatchToProps)(_Lives)

    // {/* <div className={`extra-lives-number ${(state.lives < 2) ? 'no-display' : ''}`}>{(state.lives >= 2) ? (state.lives-1) : ''}</div> */}
    // {/* <div className={`heart ${(state.lives < 4) ? 'no-display' : ''}`}>{(state.lives >= 4) ? '💖' : ''}</div>
    // <div className={`heart ${(state.lives < 3) ? 'no-display' : ''}`}>{(state.lives >= 3) ? '💖' : ''}</div> */}
    // {/* <div className={`heart ${(state.lives < 2) ? 'no-display' : ''}`}>{(state.lives >= 2) ? '💖' : ''}</div>
    // <div className={`extra-lives-zero ${(state.lives > 1) ? 'no-display' : ''}`}>{(state.lives <= 1) ? '💔' : ''}</div> */}
    