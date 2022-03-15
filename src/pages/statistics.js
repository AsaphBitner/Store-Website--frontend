
import cloneDeep from "lodash.clonedeep"
import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function _StatsPage(){
    const oneWeek = 604800000
    const oneDay = 86400000
    const products = useSelector(state => state.products)
    const sales = useSelector(state => state.sales)
    const uniqueSales = useSelector(state => state.uniqueSales)
    const [salesToShow, setSalestoShow] = useState(sales)
    const [uniqueSalesToShow, setUniqueSalestoShow] = useState(uniqueSales)

    const calculateDate = (month, difference) => {
        switch(month) {
            case 0:
                return (31 + difference)
            case 1:
                return (28 + difference)
            case 2:
                return (31 + difference)
            case 3:
                return (30 + difference)
            case 4:
                return (31 + difference)
            case 5:
                return (30 + difference)
            case 6:
                return (31 + difference)
            case 7:
                return (31 + difference)
            case 8:
                return (30 + difference)
            case 9:
                return (31 + difference)
            case 10:
                return (30 + difference)
            case 11:
                return (31 + difference)
            default: 
                return -100
        }
    }

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
        sorted.sort((a, b) => (a.timesSold > b.timesSold) ? -1 : ((b.timesSold > a.timesSold) ? 1 : 0))
        console.log(sorted)
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
        sorted.sort((a, b) => (a.timesSold > b.timesSold) ? -1 : ((b.timesSold > a.timesSold) ? 1 : 0))
        while(sorted.length > 5){
            sorted.pop()
        }
        setUniqueSalestoShow(sorted)
    }, [uniqueSales])

    useEffect(() => {
    let x = new Date().getMonth()-3
    console.log(x)
        //     let daysAgo = []
        
    //     let sum
    //     for (let ii = 0; ii < products.length; ii++){
    //         let numOfSales = 0
    //         for (let jj = 0; jj < uniqueSales.length; jj++){
    //             if (products[ii].name === uniqueSales[jj].name) {numOfSales++}
    //         }
    //     }
    // }, [sales])
    }, [])

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
            <div className="statistics-card statistics-sales">
                <h2>SALES</h2>
                {salesToShow.map(item => {
                    return(
                        <div>
                            {item.name}: {item.timesSold} 
                        </div>
                    )
                })}
            </div>
            <div className="statistics-card statistics-unique-sales">
                <h2>UNIQUE SALES</h2>
                {uniqueSalesToShow.map(item => {
                    return(
                        <div>
                            {item.name}: {item.timesSold}
                        </div>
                    )
                })}
            </div>

            <div className="statistics-card statistics-sales-5-days">
                <h2>PAST 5 DAYS</h2>
                {/* {new Date().getMonth().toString} */}
            </div>
        </div>
    )

}

    
const mapStateToProps = state => {
    return { ...state }
}
const mapDispatchToProps = {

}

export const StatsPage = connect(mapStateToProps, mapDispatchToProps)(_StatsPage)