import {applyMiddleware, createStore} from 'redux'
import myReducer from './reducers.js'
import thunk from 'redux-thunk'

export const store = createStore(myReducer, applyMiddleware(thunk))
 







