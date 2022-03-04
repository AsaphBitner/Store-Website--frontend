
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"


function _StatsPage(){

    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')

    return(
        <div className="admin-page">
            <div onClick={navAdmin}>TO ADMIN</div>
            <div onClick={navHome}>TO HOME</div>
            <div onClick={navStats}>TO STATS</div>
            <h1>STATISTICS PAGE</h1>
        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {

}

export const StatsPage = connect(mapStateToProps, mapDispatchToProps)(_StatsPage)