import { dataService } from "../services/data-service"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { updateProduct } from "../store/actions"

function _EditProduct(props){
    
    const [editedProduct, setEditedProduct] = useState({
        _id: props.product._id,
        name: props.product.name,
        description: props.product.description,
        price: props.product.price,
        image: props.product.image,
    })

    useEffect(()=> {
        // console.log(editedProduct)
        return(()=> setEditedProduct({}))
    }, [])

    const changeModal = (ev)=> {
        ev.preventDefault()
        ev.stopPropagation()
        props.setShowEditModal(false)
    }

    const dontChangeModal = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        return
    }
    
    const changeName = (ev)=> {
        ev.preventDefault()
        setEditedProduct({...editedProduct, name: ev.target.value})
    } 
    
    const changePrice = (ev)=> {
        ev.preventDefault()
        setEditedProduct({...editedProduct, price: parseInt(ev.target.value)})
        // console.log(typeof editedProduct.price)
    }

    const changeDescription = (ev)=> {
        ev.preventDefault()
        setEditedProduct({...editedProduct, description: ev.target.value})
    }    
    
    const changeImage = (ev)=> {
        ev.preventDefault()
        setEditedProduct({...editedProduct, image: ev.target.value})
    }
    
    const handleSubmit = (ev)=> {
        ev.preventDefault()
        if (editedProduct.name && editedProduct.description && editedProduct.image && editedProduct.price && (typeof editedProduct.price === 'number'))
        {props.updateProduct(editedProduct)
        // console.log('SUBMITTED')
        props.setShowEditModal(false)}
        else {console.log('SOMETHING WRONG')}
    }


    return(
        (props.showEditModal) ? 
        <div className="edit-product-modal" onClick={changeModal}>
            <div className="edit-product-inner" onClick={dontChangeModal}>
            <h1>ADD PRODUCT</h1>
                <form onSubmit={handleSubmit}>
                    <input className="edit-modal-input" placeholder="NAME" type="text" id="name" value={editedProduct.name} onChange={changeName} />
                    <input className="edit-modal-input" placeholder="PRICE" type="number" id="price" value={editedProduct.price} onChange={changePrice} />
                    <input className="edit-modal-input" placeholder="DESCRIPTION" type="text" id="description" value={editedProduct.description} onChange={changeDescription} />
                    <input className="edit-modal-input" placeholder="IMAGE" type="text" id="image" value={editedProduct.image} onChange={changeImage} />
                    {/* <br/> */}
                    <button type="submit" className="button edit-form-submit-button" onClick={handleSubmit}>SAVE PRODUCT</button>
                </form>
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
    updateProduct,
}

export const EditProduct = connect(mapStateToProps, mapDispatchToProps)(_EditProduct)