import React from "react";
import { useSelector } from "react-redux";
import { changeSmiley } from "../store/actions"
import { connect } from "react-redux";


function _Smiley(props) {
    let state = useSelector(state => state)
    const smiley = state.smiley

    return (
        <div className="smiley" onClick={()=> props.resetGame(state.boardSize)} >
         <span>{smiley}</span>
        </div>
    )
}

const mapStateToProps = state => {
    return {...state}
  }
  const mapDispatchToProps = {
    changeSmiley,
  }

  export const Smiley = connect(mapStateToProps, mapDispatchToProps)(_Smiley)
