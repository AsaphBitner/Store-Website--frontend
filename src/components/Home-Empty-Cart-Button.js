// import { dataService } from "../services/data-service"
// import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { emptyCart } from "../store/actions"

function _EmptyCart(props){
    
    const handleClick = (ev)=> {
        ev.preventDefault()
        props.emptyCart()
    }


    return(
        <>
        <button className="empty-cart-button button" onClick={handleClick}>
            EMPTY<br/>
            CART
        </button>
        </>
    )
}
    
    

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {
    emptyCart,
}

export const EmptyCart = connect(mapStateToProps, mapDispatchToProps)(_EmptyCart)