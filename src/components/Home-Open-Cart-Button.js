import { useSelector } from "react-redux"
import { useEffect } from "react"

export default function OpenCartdButton(props){
    const cart = useSelector(state => state.cart)
    const cartLength = cart.length

    
    // useEffect(()=>{
    //     console.log(cartLength)
    // }, [cart])

    const changeModal = (ev)=> {
        // console.log("HELLO")
        ev.preventDefault()
        // if (props.showAddModal) {props.setShowAddModal(false)} else {props.setShowAddModal(true)}
    }

    return(
        <div className="open-cart-button button" onClick={changeModal}>
            <button>
                Cart: {cartLength}
            </button>
        </div>
    )
} 




