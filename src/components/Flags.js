import React, { useState } from "react";
import {useEffect} from 'react'
import { useSelector } from "react-redux";
import { changeTime } from "../store/actions";
import { connect } from "react-redux";


function _Flags(props) {
    // let state = useSelector(state => state)
    let flags = useSelector(state => state.numOfFlags)

    return (
        <div className="game-flags">
            <div className="flag-icon">🚩</div>
            <div className="num-of-flags">{(flags < 10) ? `0${flags}` : flags}</div>
        </div>
    )
}

const mapStateToProps = state => {
    return {...state}
}
  const mapDispatchToProps = {
    changeTime,
  }

  export const Flags = connect(mapStateToProps, mapDispatchToProps)(_Flags)

