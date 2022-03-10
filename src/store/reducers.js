// import itemsList from "../Products-For-Sale"
// console.log("REACHED REDUCER")

const defaultState ={
    products: [],
    cart: [],
    sales: [],
    uniqueSales: [],
    cart: [],
}

export default function myReducer(state = defaultState, action = {}){
    switch(action.type) {
        case 'UPDATE_STATE':
            return state
        case 'UPDATE_PRODUCTS':
            return {...state, products: action.products}
        case 'UPDATE_CART':
            return {...state, cart: action.cart}
        // case 'CHANGE_GAME_ON':
        //     return {...state, gameOn: action.order}
        // case 'CHANGE_GAME_OVER':
        //     return {...state, gameOver: action.order}
        // case 'CHANGE_MINES':
        //     return {...state, numOfMines: action.numOfMines}
        // case 'CHANGE_LIVES':
        //     return {...state, lives: action.num}
        // case 'CHANGE_SAFE_CLICKS':
        //     return {...state, safeClicks: action.num}
        // case 'CHANGE_SMILEY':
        //     return {...state, smiley: action.order}
        // case 'CHANGE_FLAGS':
        //     return {...state, numOfFlags: action.order}
        // case 'CHANGE_TIME':
        //     return {...state, time: action.payload}
        // case 'ZERO_TIMER':
        //     return {...state, zeroTimer: action.payload}
        default: 
            return state
    }   
}


