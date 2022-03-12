// import { dataService } from "../services/data-service"
// import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { buyCartSales, buyCartUniqueSales, emptyCart } from "../store/actions"
// import cloneDeep from "lodash.clonedeep"

function _CartModal(props){
    
    const cart = useSelector(state => state.cart)

    const changeModal = (ev)=> {
        ev.preventDefault()
        ev.stopPropagation()
        props.setShowCartModal(false)
    }

    const dontChangeModal = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        return
    }
    
    const handleBuy = (ev)=> {
        ev.preventDefault()
        ev.stopPropagation()
        // console.log('BUY BUY BUY')
        props.buyCartSales()
        props.buyCartUniqueSales()
        props.emptyCart()
        props.setShowCartModal(false)
    } 
            
    return(
            (props.showCartModal) ? 
            <div className="home-cart-modal" onClick={changeModal}>
                <div className="home-cart-inner" onClick={dontChangeModal}>
                    <h1>SHOPPING CART</h1>
                    {cart.map((item, idx)=>{return(
                        <div className="cart-item" key={idx}>
                            <div className="cart-item-part image-container">
                                <img src={item.image}></img>                                
                            </div>
                            <div className="cart-item-part">{item.name}</div>
                            <div className="cart-item-part">{`$${item.price}`}</div>
                        </div>
                    )})}
                    <button className="buy-cart-button button" onClick={handleBuy}>
                        BUY
                    </button>
                </div>
            </div>
            : 
            ''
    )
}    

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {
    buyCartSales,
    buyCartUniqueSales,
    emptyCart,
}

export const CartModal = connect(mapStateToProps, mapDispatchToProps)(_CartModal)




                //     ev.preventDefault()
                //     if (editedProduct.name && editedProduct.description && editedProduct.image && editedProduct.price && (typeof editedProduct.price === 'number'))
                //     {props.updateProduct(editedProduct)
                //     // console.log('SUBMITTED')
                //     props.setShowEditModal(false)}
                //     else {console.log('SOMETHING WRONG')}
                // }