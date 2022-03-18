
const defaultState ={
    products: [],
    cart: [],
    sales: [],
    uniqueSales: [],
}

export default function myReducer(state = defaultState, action = {}){
    switch(action.type) {
        case 'UPDATE_STATE':
            return state
        case 'UPDATE_PRODUCTS':
            return {...state, products: action.products}
        case 'UPDATE_CART':
            return {...state, cart: action.cart}
        case 'UPDATE_SALES':
            return {...state, sales: action.sales}
        case 'UPDATE_UNIQUE_SALES':
            return {...state, uniqueSales: action.uniqueSales}
        default: 
            return state
    }   
}


