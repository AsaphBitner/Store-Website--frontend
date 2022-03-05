import { dataService } from "../services/data-service"
import { useEffect, useState } from "react"
import { connect } from "react-redux"


function _AddProduct(props){
    
    const [newProduct, setNewProduct] = useState({
        _id: dataService.makeId(),
        name: '',
        description: '',
        price: '',
        image: '',
    })

    useEffect(()=> {
        console.log(newProduct)

    }, [newProduct])

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

    const handleSubmit = (ev)=> {
        ev.preventDefault()
        console.log('SUBMITTED')
    }

    const changeName = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, name: ev.target.value})
    } 
    
    const changePrice = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, price: parseInt(ev.target.value)})
        console.log(typeof newProduct.price)
    }

    const changeDescription = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, description: ev.target.value})
    }    
    
    const changeImage = (ev)=> {
        ev.preventDefault()
        setNewProduct({...newProduct, image: ev.target.value})
    }

    return(
        (props.showAddModal) ? 
        <div className="add-product-modal" onClick={changeModal}>
            <div className="add-product-inner" onClick={dontChangeModal}>
            <h1>ADD PRODUCT</h1>
                <form onSubmit={handleSubmit}>
                {/* <label htmlFor="name">Name:&nbsp;  */}
                <input placeholder="NAME" type="text" id="name" value={newProduct.name} onChange={changeName} />
                {/* </label> */}
                {/* <br/> */}
                {/* <label htmlFor="price">Number:&nbsp;  */}
                <input placeholder="PRICE" type="number" id="price" value={newProduct.price} onChange={changePrice} />
                {/* </label> */}
                
                {/* <label htmlFor="description">Description:&nbsp;  */}
                <input placeholder="DESCRIPTION" type="text" id="description" value={newProduct.description} onChange={changeDescription} />
                {/* </label> */}
                
                {/* <label htmlFor="image">Image:&nbsp;  */}
                <input placeholder="IMAGE" type="text" id="image" value={newProduct.image} onChange={changeImage} />
                {/* </label> */}
                
                <button type="submit" className="button add-form-submit-button">ADD NEW PRODUCT</button>
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

}

export const AddProduct = connect(mapStateToProps, mapDispatchToProps)(_AddProduct)