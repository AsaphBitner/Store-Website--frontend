import { cloneDeep } from "lodash";
import itemsList from "../Products-For-Sale";

export const dataService = {
    makeId,
    _save,
    _load,
    createProducts,
    updateProduct,
    addProduct,
    deleteProduct,
    addToCart,
    createCart,
    emptyCart,
    createSales,
    createUniqueSales,
    buyCartSales,
    buyCartUniqueSales,
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

async function createCart(){
    const cart = []
    await _save('cart', cart)
    return cart 
}

async function createSales(){
    const sales = []
    await _save('sales', sales)
    return sales
}

async function createUniqueSales(){
    const uniqueSales = []
    await _save('uniqueSales', uniqueSales)
    return uniqueSales 
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

async function addToCart(payload){
    const cart = await _load('cart') || []
    cart.push(payload)
    await _save('cart', cart)
    return cart
}

async function emptyCart(){
    const cart = []
    await _save('cart', cart)
    return cart
}

async function buyCartSales(){
    const cart = await _load('cart')
    const sales = await _load('sales') || []
    for (let ii = 0; ii < cart.length; ii++){
        cart[ii].createdAt = Date.now()
        sales.push(cart[ii])    
    }
    await _save('sales', sales)
    return sales
}

async function buyCartUniqueSales(){
    const cart = await _load('cart')
    const uniqueSales = await _load('uniqueSales') || []
    const uniqueSalesTemp = []
    for (let ii = 0; ii < cart.length; ii++){
        if (!uniqueSalesTemp.length) {uniqueSalesTemp.push(cart[ii])}
        else if (uniqueSalesTemp.find(item => item._id === cart[ii]._id)) {continue} else {uniqueSalesTemp.push(cart[ii])}
    }
    for (let jj = 0; jj < uniqueSalesTemp.length; jj++){
        uniqueSalesTemp[jj].createdAt = Date.now()
        uniqueSales.push(uniqueSalesTemp[jj])
    }

    await _save('uniqueSales', uniqueSales)
    return uniqueSales
}


function makeId(length = 7) {
    var text = ''
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
    for (var ii = 0; ii < length; ii++) {
        text += possible.charAt(Math.floor(Math.random() * possible.length))
    }
    return text
}

