
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
    const [salesFive, setSalesFive] = useState(
        {
            day1: {},
            day2: {},
            day3: {},
            day4: {},
            day5: {},
    })
    const [salesToShow, setSalesToShow] = useState(sales)
    const [uniqueSalesToShow, setUniqueSalestoShow] = useState(uniqueSales)

    useEffect(() => {
        updateDays()
    }, [sales])

    const updateDays = () => {

        const days = cloneDeep(salesFive)
        days.day1 = {
            date: new Date().getDate(),
            month: new Date().getMonth()+1,
            year: new Date().getFullYear(),
        }

        ///////////////////////////////////// DAY 2 //////////////////////////////////////////////

        if ((days.day1.date - 1) <= 0) {
            days.day2.month = calculateMonth(days.day1.month-1)
            days.day2.date = calculateDate(days.day2.month, (days.day1.date - 1))
        } 
        else 
        {
            days.day2.month = new Date().getMonth()+1
            days.day2.date = new Date().getDate()-1
        }
        if (days.day2.month > days.day1.month) {days.day2.year = new Date().getFullYear()-1} else {days.day2.year = new Date().getFullYear()}
        ///////////////////////////////////// DAY 3 //////////////////////////////////////////////
        if ((days.day1.date - 2) <= 0) {
            days.day3.month = calculateMonth(days.day1.month-1)
            days.day3.date = calculateDate(days.day3.month, (days.day1.date - 2))
        } 
        else 
        {
            days.day3.month = new Date().getMonth()+1
            days.day3.date = new Date().getDate()-2
        }
        if (days.day3.month > days.day1.month) {days.day3.year = new Date().getFullYear()-1} else {days.day3.year = new Date().getFullYear()}
        
        ///////////////////////////////////// DAY 4 //////////////////////////////////////////////
        if ((days.day1.date - 3) <= 0) {
            days.day4.month = calculateMonth(days.day1.month-1)
            days.day4.date = calculateDate(days.day4.month, (days.day1.date - 3))
        } 
        else 
        {
            days.day4.month = new Date().getMonth()+1
            days.day4.date = new Date().getDate()-3
        }
        if (days.day4.month > days.day1.month) {days.day4.year = new Date().getFullYear()-1} else {days.day4.year = new Date().getFullYear()}
        
        ///////////////////////////////////// DAY 5 //////////////////////////////////////////////
        if ((days.day1.date - 4) <= 0) {
            days.day5.month = calculateMonth(days.day1.month-1)
            days.day5.date = calculateDate(days.day5.month, (days.day1.date - 4))
        } 
        else 
        {
            days.day5.month = new Date().getMonth()+1
            days.day5.date = new Date().getDate()-4
        }
        if (days.day5.month > days.day1.month) {days.day5.year = new Date().getFullYear()-1} else {days.day5.year = new Date().getFullYear()}
        
        ////////////////////////////////////////////////////////////////////////////////////////////////////////////
        
        let sales1 = sales.filter((item) => (item.year === days.day1.year) &&
        (item.month === days.day1.month) &&
        (item.date === days.day1.date))
        if (!sales1.length) {days.day1.sales = 0} else {
            days.day1.sales = sales1.reduce((prev, curr) => prev + curr.price, 0)
        }
        
    
        let sales2 = sales.filter((item) => (item.year === days.day2.year) &&
        (item.month === days.day2.month) &&
        (item.date === days.day2.date))
        if (!sales2.length) {days.day2.sales = 0} else {
            days.day2.sales = sales2.reduce((prev, curr) => prev + curr.price, 0)
        }

        let sales3 = sales.filter((item) => (item.year === days.day3.year) &&
        (item.month === days.day3.month) &&
        (item.date === days.day3.date))
        if (!sales3.length) {days.day3.sales = 0} else {
            days.day3.sales = sales3.reduce((prev, curr) => prev + curr.price, 0)
        }
        
        let sales4 = sales.filter((item) => (item.year === days.day4.year) &&
        (item.month === days.day4.month) &&
        (item.date === days.day4.date))
        if (!sales4.length) {days.day4.sales = 0} else {
            days.day4.sales = sales4.reduce((prev, curr) => prev + curr.price, 0)
        }

        let sales5 = sales.filter((item) => (item.year === days.day5.year) &&
        (item.month === days.day5.month) &&
        (item.date === days.day5.date))
        if (!sales5.length) {days.day5.sales = 0} else {
            days.day5.sales = sales5.reduce((prev, curr) => prev + curr.price, 0)
        }

        setSalesFive(days)
    }

    const calculateMonth = (month) => {
        if (month === 0) {return 12} else {return month}
    }
    const calculateDate = (month, difference) => {
        switch(month) {
            case 1:
                return (31 + difference)
            case 2:
                return (28 + difference)
            case 3:
                return (31 + difference)
            case 4:
                return (30 + difference)
            case 5:
                return (31 + difference)
            case 6:
                return (30 + difference)
            case 7:
                return (31 + difference)
            case 8:
                return (31 + difference)
            case 9:
                return (30 + difference)
            case 10:
                return (31 + difference)
            case 11:
                return (30 + difference)
            case 12:
                return (31 + difference)
            default: 
                return -100
        }
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
                        
                    <div className="statistics-card-item">
                        {(salesFive.day1.sales) ? 
                        `${salesFive.day1.year}-${salesFive.day1.month}-${salesFive.day1.date}: $${salesFive.day1.sales}`
                        :
                        `${salesFive.day1.year}-${salesFive.day1.month}-${salesFive.day1.date}: $0`}
                    </div>
                    <div className="statistics-card-item">
                        {(salesFive.day2.sales) ? 
                        `${salesFive.day2.year}-${salesFive.day2.month}-${salesFive.day2.date}: $${salesFive.day2.sales}`
                        :
                        `${salesFive.day2.year}-${salesFive.day2.month}-${salesFive.day2.date}: $0`}              
                    </div>
                    <div className="statistics-card-item">
                        {(salesFive.day3.sales) ? 
                        `${salesFive.day3.year}-${salesFive.day3.month}-${salesFive.day3.date}: $${salesFive.day3.sales}`
                        :
                        `${salesFive.day3.year}-${salesFive.day3.month}-${salesFive.day3.date}: $0`}
                    </div>

                    <div className="statistics-card-item">
                        {(salesFive.day4.sales) ? 
                        `${salesFive.day4.year}-${salesFive.day4.month}-${salesFive.day4.date}: $${salesFive.day4.sales}`
                        :
                        `${salesFive.day4.year}-${salesFive.day4.month}-${salesFive.day4.date}: $0`}
                    </div>
                    
                    <div className="statistics-card-item">
                        {(salesFive.day5.sales) ? 
                        `${salesFive.day5.year}-${salesFive.day5.month}-${salesFive.day5.date}: $${salesFive.day5.sales}`
                        :
                        `${salesFive.day5.year}-${salesFive.day5.month}-${salesFive.day5.date}: $0`}
                    </div>                    
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








    // useEffect(() => {
    // // console.log(sales[0])
    //     //     let daysAgo = []
        
    // //     let sum
    // //     for (let ii = 0; ii < products.length; ii++){
    // //         let numOfSales = 0
    // //         for (let jj = 0; jj < uniqueSales.length; jj++){
    // //             if (products[ii].name === uniqueSales[jj].name) {numOfSales++}
    // //         }
    // //     }
    // }, [sales])
    // // }, [])