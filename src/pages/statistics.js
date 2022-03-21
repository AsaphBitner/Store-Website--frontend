
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
    const [salesFive, setSalesFive] = useState([])
    const [salesToShow, setSalesToShow] = useState(sales)
    const [uniqueSalesToShow, setUniqueSalestoShow] = useState(uniqueSales)

    useEffect(() => {
        updateDays()
    }, [sales])

    const updateDays = () => {
        // const x = Date.now()
        // const d = new Date(x);
        // const aaa = new Date(d.setDate(-32));

        const days = []
        const todayOuter = new Date()
        // const dateNow = Date.now()
        // today.setDate(today.getDate()-1)
        // const dateHere = new Date(today)
        // console.log(new Date (today.setDate(today.getDate()-1)).getDate())
        console.log(new Date(todayOuter.setDate(todayOuter.getDate()-4)).getDate())
        for (let ii = 0; ii < 5; ii++){
            const today = new Date()
            const salesForDate = sales.filter(item => {
                return (new Date(item.createdAt).getDate() === new Date(today.setDate(today.getDate()-ii)).getDate() &&
                new Date(item.createdAt).getMonth() === new Date(today.setDate(today.getDate())).getMonth() &&
                new Date(item.createdAt).getFullYear() === new Date(today.setDate(today.getDate())).getFullYear())})
            const day = {
                date: new Date(today.setDate(today.getDate()-ii)).getDate(),
                month: new Date(today.setDate(today.getDate()-ii)).getMonth()+1,
                year: new Date(today.setDate(today.getDate()-ii)).getFullYear(),
                salesSum: salesForDate.reduce((prev, curr) => prev + curr.price, 0)
            }
            days.push(day)
        }

        setSalesFive(days)
    }


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





