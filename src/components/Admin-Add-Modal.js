import { dataService } from "../services/data-service"
import { useEffect, useState } from "react"
import { connect } from "react-redux"


function _AddProduct(props){
    
    const [newProduct, setNewProduct] = useState({
        _id: dataService.makeId(),
        name: '',
        description: '',
        price: -1,
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

    return(
        (props.showAddModal) ? 
        <div className="add-product-modal" onClick={changeModal}>
            <div className="add-product-inner" onClick={dontChangeModal}>
            <h1>ADD PRODUCT</h1>
                <form>
                    <input type="text" id="name" value={newProduct.name} onChange={setNewProduct({...newProduct, name: 'value'})} />
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