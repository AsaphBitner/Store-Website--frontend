
import { connect, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function _StatsPage(){
    const sales = useSelector(state => state.sales)
    const uniqueSales = useSelector(state => state.uniqueSales)
    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')

    return(
        <div className="admin-page">
            <button onClick={navAdmin}>TO ADMIN</button>
            <button onClick={navHome}>TO HOME</button>
            <button onClick={navStats}>TO STATS</button>
            <h1>STATISTICS PAGE</h1>
            <h2>SALES</h2>
            {sales.map(item => {
                return(
                    <div>
                        {item.name}
                    </div>
                )
            })}
            <h2>UNIQUE SALES</h2>
            {uniqueSales.map(item => {
                return(
                    <div>
                        {item.name}
                    </div>
                )
            })}
        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {

}

export const StatsPage = connect(mapStateToProps, mapDispatchToProps)(_StatsPage)