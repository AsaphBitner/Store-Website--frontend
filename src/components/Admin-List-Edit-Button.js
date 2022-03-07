
import { useState } from "react"
import { EditProduct } from "./Admin-Edit-Modal"

export default function _EditButton(props){
    
    const [showEditModal, setShowEditModal] = useState(false)
    const handleClick = (ev)=> {
        ev.preventDefault()
        setShowEditModal(true)
    }


    return(
        <div className="edit-button button">
            <EditProduct product={props.product} showEditModal={showEditModal} setShowEditModal={setShowEditModal} />
            <button onClick={handleClick}>
                EDIT
            </button>
        </div>
    )
} 