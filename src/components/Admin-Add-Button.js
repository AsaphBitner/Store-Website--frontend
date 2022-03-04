
export default function _AddButton(props){
    const changeModal = (ev)=> {
        // console.log("HELLO")
        ev.preventDefault()
        if (props.showAddModal) {props.setShowAddModal(false)} else {props.setShowAddModal(true)}
    }

    return(
        <div className="add-button button" onClick={changeModal}>
            <button >
                ADD
            </button>
        </div>
    )
} 




