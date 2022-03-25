
import cloneDeep from "lodash.clonedeep"
import { useEffect, useState } from "react"
import { connect, useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"


function _StatsPage(){

    // const oneWeek = 604800000
    // const oneDay = 86400000
    const products = useSelector(state => state.products)
    const sales = useSelector(state => state.sales)
    const uniqueSales = useSelector(state => state.uniqueSales)
    const [salesFive, setSalesFive] = useState([])
    const [salesToShow, setSalesToShow] = useState([])
    const [uniqueSalesToShow, setUniqueSalestoShow] = useState([])

    // useEffect(() => {
    //     sales = []
    //     sales = useSelector(state => state.sales)
    //     uniqueSales = []
    //     uniqueSales = useSelector(state => state.uniqueSales)
    // }, [])

    useEffect(() => {
        const days = []
        const todayOuter = new Date()
        // console.log(new Date(todayOuter.setDate(todayOuter.getDate()-4)).getDate())
        for (let ii = 0; ii < 5; ii++){
            let today = new Date()
            const todayModified = new Date(today.setDate(today.getDate()-ii))
            const salesForDate = sales.filter(item => {
                return (new Date(item.createdAt).getDate() === new Date(today.setDate(today.getDate()-ii)).getDate() &&
                new Date(item.createdAt).getMonth() === new Date(today.setDate(today.getDate()-ii)).getMonth() &&
                new Date(item.createdAt).getFullYear() === new Date(today.setDate(today.getDate()-ii)).getFullYear())})
                
            const day = {
                date: todayModified.getDate(),
                month: todayModified.getMonth()+1,
                year: todayModified.getFullYear(),
                salesSum: salesForDate.reduce((prev, curr) => prev + curr.price, 0)
            }
            console.log(todayModified.getDate())
            days.push(day)
            // today = null
            // todayModified = null
        }
        setSalesFive(days)   
    }, [sales])


    useEffect(() => {
        if (sales.length < 2) {setSalesToShow(sales); return}
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
        // console.log(sorted)
        while(sorted.length > 5){
            sorted.pop()
        }
        setSalesToShow(sorted)
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
    
    const navigate = useNavigate()
    const navAdmin = () => navigate('/adminpage')
    const navHome = () => navigate('/homepage')
    const navStats = () => navigate('/statspage')

    return(
        <div className="statistics-page">
            <button onClick={navAdmin}>TO ADMIN</button>
            <button onClick={navHome}>TO HOME</button>
            <button onClick={navStats}>TO STATS</button>
            <h1>STATISTICS PAGE</h1>
            <div className="statistics-cards-container">
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
                    <h2 className="statistics-card-item">PAST 5 DAYS</h2>
                        {salesFive.map((item) => {
                            return(
                            <div className="statistics-card-item">
                            {(item.salesSum) ? 
                             `${item.year}-${item.month}-${item.date}: $${item.salesSum}`
                            :
                            `${item.year}-${item.month}-${item.date}: $0`}
                            </div>
                            )
                        })}

                </div>
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





