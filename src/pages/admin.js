
import { connect } from "react-redux"
import _AddButton from "../components/Admin-Add-Button"
import AdminItemsList from "../components/Admin-List"
import { useNavigate } from "react-router-dom"
import { AddProduct } from "../components/Admin-Add-Modal"
import { useState } from "react"

function _AdminPage(){

    const [showAddModal, setShowAddModal] = useState(false)
    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')
 

    return(
        <div className="admin-page">
            <AddProduct showAddModal={showAddModal} setShowAddModal={setShowAddModal} />
            <div onClick={navAdmin}>TO ADMIN</div>
            <div onClick={navHome}>TO HOME</div>
            <div onClick={navStats}>TO STATS</div>
            <_AddButton showAddModal={showAddModal} setShowAddModal={setShowAddModal} />    
            <AdminItemsList />

        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {

}

export const AdminPage = connect(mapStateToProps, mapDispatchToProps)(_AdminPage)