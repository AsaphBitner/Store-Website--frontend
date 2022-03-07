// import { findIndex } from "lodash";
import itemsList from "../Products-For-Sale";

export const dataService = {
    makeId,
    _save,
    _load,
    createProducts,
    updateProduct,
    addProduct,
    deleteProduct,
}



function _save(key, item){
    localStorage.setItem(key, JSON.stringify(item))
    // console.log(key, ' ', item)
    return Promise.resolve(item)
}


function _load(payload){
    const item = JSON.parse(localStorage.getItem(payload))
    return Promise.resolve(item)
}

async function createProducts(){
    const products = itemsList()
    await _save('products', products)
    return products 
}

async function updateProduct(payload){
    const products = await _load('products')
    const productIdx = products.findIndex(item => item._id === payload._id) 
    products.splice(productIdx, 1, payload)
    // const newProducts = oldProducts.filter((item) => item._id !== payload._id)
    // newProducts.push(payload)
    await _save('products', products)
    return products
}

async function addProduct(payload){
    const products = await _load('products')
    // const newProducts = oldProducts.filter((item) => item._id !== payload._id)
    products.push(payload)
    await _save('products', products)
    return products
}

async function deleteProduct(payload){
    const oldProducts = await _load('products')
    const newProducts = oldProducts.filter((item) => item._id !== payload._id)
    // products.push(payload)
    await _save('products', newProducts)
    return newProducts
}




function makeId(length = 7) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var ii = 0; ii < length; ii++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

