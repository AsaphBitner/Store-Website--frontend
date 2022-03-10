
import { useEffect } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import HomeItemsList from "../components/Home-List"
import OpenCartdButton from "../components/Home-Open-Cart-Button"

function _HomePage(){

    useEffect(()=>{

    })

    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')

    return(
        <div className="home-page">
            <button onClick={navAdmin}>TO ADMIN</button>
            <button onClick={navHome}>TO HOME</button>
            <button onClick={navStats}>TO STATS</button>
            <h1>HOMEPAGE</h1>
            <OpenCartdButton />
            <HomeItemsList />
        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {

}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)