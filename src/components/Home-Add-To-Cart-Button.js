// import { useEffect } from "react"
import { connect } from "react-redux"
import { addToCart } from "../store/actions"

function _AddToCartButton(props){

    // console.log(props)
    const handleClick = () => {
        props.addToCart(props.product)
        // console.log("ADDED TO CART")
    }

    return(
        <div className="add-button button">
            <button onClick={handleClick}>
                ADD TO CART
            </button>
        </div>
    )
} 

const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {
    addToCart,
}

export const AddToCartButton = connect(mapStateToProps, mapDispatchToProps)(_AddToCartButton)