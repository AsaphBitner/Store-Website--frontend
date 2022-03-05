import { dataService } from "../services/data-service"
import { useEffect, useState } from "react"
import { connect } from "react-redux"
import { addProduct } from "../store/actions"

function _AddProduct(props){
    
    const [newProduct, setNewProduct] = useState({
        _id: dataService.makeId(),
        name: '',
        description: '',
        price: '',
        image: '',
    })

    // useEffect(()=> {
    //     console.log(newProduct)

    // }, [newProduct])

    const changeModal = (ev)=> {
        ev.preventDefault()
        ev.stopPropagation()
        props.setShowAddModal(false)
    }

    const dontChangeModal = (ev) => {
        ev.preventDefault()
        ev.stopPropagation()
        return
    }
    
    const changeName = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, name: ev.target.value})
    } 
    
    const changePrice = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, price: parseInt(ev.target.value)})
        // console.log(typeof newProduct.price)
    }

    const changeDescription = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, description: ev.target.value})
    }    
    
    const changeImage = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, image: ev.target.value})
    }
    
    const handleSubmit = (ev)=> {
        ev.preventDefault()
        if (newProduct.name && newProduct.description && newProduct.image && newProduct.price && (typeof newProduct.price === 'number'))
        {props.addProduct(newProduct)
        // console.log('SUBMITTED')
        props.setShowAddModal(false)}
        else {console.log('SOMETHING WRONG')}
    }


    return(
        (props.showAddModal) ? 
        <div className="add-product-modal" onClick={changeModal}>
            <div className="add-product-inner" onClick={dontChangeModal}>
            <h1>ADD PRODUCT</h1>
                <form onSubmit={handleSubmit}>
                    <input className="add-modal-input" placeholder="NAME" type="text" id="name" value={newProduct.name} onChange={changeName} />
                    <input className="add-modal-input" placeholder="PRICE" type="number" id="price" value={newProduct.price} onChange={changePrice} />
                    <input className="add-modal-input" placeholder="DESCRIPTION" type="text" id="description" value={newProduct.description} onChange={changeDescription} />
                    <input className="add-modal-input" placeholder="IMAGE" type="text" id="image" value={newProduct.image} onChange={changeImage} />
                    
                    <button type="submit" className="button add-form-submit-button" onClick={handleSubmit}>ADD NEW PRODUCT</button>
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
    addProduct,
}

export const AddProduct = connect(mapStateToProps, mapDispatchToProps)(_AddProduct)