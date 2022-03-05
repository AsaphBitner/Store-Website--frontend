
import { useEffect } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"


function _HomePage(){

    useEffect(()=>{

    })

    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')

    return(
        <div className="admin-page">
           <div onClick={navAdmin}>TO ADMIN</div>
            <div onClick={navHome}>TO HOME</div>
            <div onClick={navStats}>TO STATS</div>
            <h1>HOMEPAGE</h1>
        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {

}

export const HomePage = connect(mapStateToProps, mapDispatchToProps)(_HomePage)