
import { connect } from "react-redux"
import _AddButton from "../components/Admin-Add-Button"
import AdminItemsList from "../components/Admin-List"
import { useNavigate } from "react-router-dom"
import { AddProduct } from "../components/Admin-Add-Modal"
import { useEffect, useState } from "react"

function _AdminPage(props){

    // useEffect(()=>{
    //     props.createProducts()
    // }, [])

    const [showAddModal, setShowAddModal] = useState(false)
    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')
    

    return(
        <div className="admin-page">
            <AddProduct showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
            <button onClick={navAdmin}>TO ADMIN</button>
            <button onClick={navHome}>TO HOME</button>
            <button onClick={navStats}>TO STATS</button>
            <_AddButton showAddModal={showAddModal} setShowAddModal={setShowAddModal} />    
            <AdminItemsList />

        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {
    // createProducts,
}

export const AdminPage = connect(mapStateToProps, mapDispatchToProps)(_AdminPage)