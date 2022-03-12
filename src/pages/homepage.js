
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { useNavigate } from "react-router-dom"
import HomeItemsList from "../components/Home-List"
import OpenCartdButton from "../components/Home-Open-Cart-Button"
import { EmptyCart } from "../components/Home-Empty-Cart-Button"
import { CartModal } from "../components/Home-Cart-Moadal"

function _HomePage(){

    const [showCartModal, setShowCartModal] = useState(false)
    // useEffect(()=>{

    // })

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
            <div className="home-cart-buttons">
                <OpenCartdButton showCartModal={showCartModal} setShowCartModal={setShowCartModal} />
                <CartModal showCartModal={showCartModal} setShowCartModal={setShowCartModal} />
                <EmptyCart />
            </div>
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