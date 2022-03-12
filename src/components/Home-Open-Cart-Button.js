import { useSelector } from "react-redux"
import { useEffect } from "react"

export default function OpenCartdButton(props){
    const cart = useSelector(state => state.cart)
    const cartLength = cart.length

    
 

    const changeModal = (ev)=> {
        ev.preventDefault()
        ev.stopPropagation()
        props.setShowCartModal(true)
    }

    return(
        <div className="open-cart-button button" onClick={changeModal}>
            <button>
                Cart: {cartLength}
            </button>
        </div>
    )
} 




