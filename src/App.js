import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
// import {MainGamePage} from './OLD pages/MainGamePage.js'
// import 'assets/style/main.scss
// import ScoreBoard from './pages/ScoreBoard.js';
import { AdminPage } from './pages/Admin';
import { HomePage } from './pages/Homepage';
import { StatsPage } from './pages/Statistics';
import {connect} from 'react-redux'
import { createProducts, createCart, createSales, createUniqueSales } from "./store/actions"
import { useEffect } from 'react';

function _App(props) {
  // console.log('APP PROPS', props)

  useEffect(()=> {
    props.createProducts()
    props.createCart()
    props.createSales()
    props.createUniqueSales()
  }, [])

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<HomePage />} />
          <Route exact path="/homepage" element={<HomePage />} />
          <Route exact path="/adminpage" element={<AdminPage />} />
          <Route exact path="/statspage" element={<StatsPage/>} />
        </Routes>  

      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {...state}
}
const mapDispatchToProps = {
  createProducts,
  createCart,
  createSales, 
  createUniqueSales
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
