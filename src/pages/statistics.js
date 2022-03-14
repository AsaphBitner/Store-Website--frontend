
import cloneDeep from "lodash.clonedeep"
import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function _StatsPage(){
    const products = useSelector(state => state.products)
    const sales = useSelector(state => state.sales)
    const uniqueSales = useSelector(state => state.uniqueSales)
    const [salesToShow, setSalestoShow] = useState(sales)
    const [uniqueSalesToShow, setUniqueSalestoShow] = useState(uniqueSales)

    useEffect(() => {
        if (sales.length < 2) {setSalestoShow(sales); return}
        let salesWithNum = []
        let numOfSales
        for (let ii = 0; ii < products.length; ii++){
            numOfSales = 0
            for (let jj = 0; jj < sales.length; jj++){
                if (products[ii].name === sales[jj].name) {numOfSales++}
            }
            if (numOfSales > 0) {
                let productToPush = products[ii]
                productToPush.timesSold = numOfSales
                salesWithNum.push(productToPush)
            }

        }

        let sorted = cloneDeep(salesWithNum)
        sorted.sort((a, b) => a.timesSold < b.timesSold)
        while(sorted.length > 5){
            sorted.pop()
        }
        setSalestoShow(sorted)
    }, [sales])

    useEffect(() => {
        if (uniqueSales.length < 2) {setUniqueSalestoShow(uniqueSales); return}
        let salesWithNum = []
        let numOfSales
        for (let ii = 0; ii < products.length; ii++){
            numOfSales = 0
            for (let jj = 0; jj < uniqueSales.length; jj++){
                if (products[ii].name === uniqueSales[jj].name) {numOfSales++}
            }
            if (numOfSales > 0) {
                let productToPush = products[ii]
                productToPush.timesSold = numOfSales
                salesWithNum.push(productToPush)
            }

        }
        
        let sorted = cloneDeep(salesWithNum)
        sorted.sort((a, b) => a.timesSold < b.timesSold)
        while(sorted.length > 5){
            sorted.pop()
        }
        setUniqueSalestoShow(sorted)
    }, [uniqueSales])

    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')

    return(
        <div className="admin-page">
            <button onClick={navAdmin}>TO ADMIN</button>
            <button onClick={navHome}>TO HOME</button>
            <button onClick={navStats}>TO STATS</button>
            <h1>STATISTICS PAGE</h1>
            <h2>SALES</h2>
            {salesToShow.map(item => {
                return(
                    <div>
                        {item.name}: {item.timesSold} 
                    </div>
                )
            })}
            <h2>UNIQUE SALES</h2>
            {uniqueSalesToShow.map(item => {
                return(
                    <div>
                        {item.name}: {item.timesSold}
                    </div>
                )
            })}
        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {

}

export const StatsPage = connect(mapStateToProps, mapDispatchToProps)(_StatsPage)