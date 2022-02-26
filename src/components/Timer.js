import React, { useState } from "react";
import {useEffect} from 'react'
import { useSelector } from "react-redux";
import { changeTime } from "../store/actions";
import { connect } from "react-redux";

let timerInterval;

function _Timer(props) {
    let state = useSelector(state => state)
    const [time, setTime] = useState({seconds: 0, minutes: 0, hours: 0, hundreds: 0})
    let [timeToShow, setTimeToShow] = useState('00:00:00')

    const zeroSec = () => {return (time.seconds < 10) ? '0' : ''}
    const zeroMin = () => {return (time.minutes < 10) ? '0' : ''}
    const zeroHr = () => {return (time.hours < 10) ? '0' : ''}
    
    const updateTime = () => {
        let tempTime = time       
        tempTime.seconds++
        if (tempTime.seconds === 60) {tempTime.seconds = 0; tempTime.minutes++}
        if (tempTime.minutes === 60) {tempTime.minutes = 0; tempTime.hours++}
        if (tempTime.hours === 100) {tempTime.hours = 0; tempTime.hundreds++}
        setTime(tempTime)
        setTimeToShow(`${zeroHr()}${time.hours}:${zeroMin()}${time.minutes}:${zeroSec()}${time.seconds}`)
        props.changeTime({time})
    }


    
    useEffect(()=>{
        if (state.gameOn && timerInterval === undefined) 
            {
            timerInterval = setInterval(updateTime, 1000)
            }
        
        else if (!state.gameOn && timerInterval !== undefined) 
            {
            clearInterval(timerInterval); 
            timerInterval = undefined
            } 
    }, [state.gameOn])
    

    useEffect(() => {
            setTime({seconds: 0, minutes: 0, hours: 0, hundreds: 0})
            setTimeToShow(`00:00:00`)
    }, [state.zeroTimer])


    return (
        <div className="game-timer">
            {timeToShow}
        </div>
    )
}

const mapStateToProps = state => {
    return {...state}
}
  const mapDispatchToProps = {
    changeTime,
  }

  export const Timer = connect(mapStateToProps, mapDispatchToProps)(_Timer)

