import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import {MainGamePage} from './pages/MainGamePage.js'
// import 'assets/style/main.scss
// import ScoreBoard from './pages/ScoreBoard.js';
import {connect} from 'react-redux'
import {buildNewBoard} from './store/actions'

function _App(props) {
  // console.log('APP PROPS', props)
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route exact path="/" element={<MainGamePage />} />
          {/* <Route exact path="/ScoreBoard" element={<ScoreBoard/>}></Route> */}
        </Routes>  

      </div>
    </Router>
  );
}

const mapStateToProps = state => {
  return {...state}
}
const mapDispatchToProps = {
  buildNewBoard,
}

export const App = connect(mapStateToProps, mapDispatchToProps)(_App)
