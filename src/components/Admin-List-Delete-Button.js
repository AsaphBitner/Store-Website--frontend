import { connect } from "react-redux"
import { deleteProduct } from "../store/actions"

function _DeleteButton(props){

    // console.log(props)
    const handleClick = () => {
        props.deleteProduct(props.product)
        // console.log(props)    
    }

    return(
        <div className="add-button button">
            <button onClick={handleClick}>
                DELETE
            </button>
        </div>
    )
} 

const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {
    deleteProduct,
}

export const DeleteButton = connect(mapStateToProps, mapDispatchToProps)(_DeleteButton)