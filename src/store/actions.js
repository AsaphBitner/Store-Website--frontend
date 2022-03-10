import { dataService } from "../services/data-service"


export function createProducts(){ 
    return async (dispatch) => {
    let products = await dataService.createProducts()
    dispatch({type: 'UPDATE_PRODUCTS', products})
}
}

export function createCart(){ 
    return async (dispatch) => {
    let cart = await dataService.createCart()
    dispatch({type: 'UPDATE_CART', cart})
}
}

export function addProduct(payload){ 
    return async (dispatch) => {
        let products = await dataService.addProduct(payload)
        dispatch({type: 'UPDATE_PRODUCTS', products})
    }
}
export function updateProduct(payload){ 
    return async (dispatch) => {
        let products = await dataService.updateProduct(payload)
        dispatch({type: 'UPDATE_PRODUCTS', products})
    }
}

export function deleteProduct(payload){ 
    return async (dispatch) => {
        let products = await dataService.deleteProduct(payload)
        dispatch({type: 'UPDATE_PRODUCTS', products})
        console.log("REACHED ACTION")

    }
}

export function addToCart(payload){ 
    return async (dispatch) => {
        let cart = await dataService.addToCart(payload)
        dispatch({type: 'UPDATE_CART', cart})
    }
}



