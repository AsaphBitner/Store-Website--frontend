// import { cloneDeep } from "lodash";
// import itemsList from "../Products-For-Sale";
import axios from "axios"

axios.defaults.baseURL = 'http://localhost:3001';

export const dataService = {
    createProducts,
    createCart,
    createSales,
    createUniqueSales,
    makeId,
    _save,
    _load,
    updateProduct,
    addProduct,
    deleteProduct,
    addToCart,
    emptyCart,
    buyCartSales,
    buyCartUniqueSales,
}


async function createProducts(){
    const products = await _load('products')
    // console.log(products)
    // return []
    return products
}

async function createCart(){
    const cart = await _load('cart')
    return cart
}

async function createSales(){
    const sales = await _load('sales')
    return sales
}

async function createUniqueSales(){
    const uniqueSales = await _load('unique_sales')
    return uniqueSales
}



async function _save(key, item){
    localStorage.setItem(key, JSON.stringify(item))
    // console.log(key, ' ', item)
    return Promise.resolve(item)
}


async function _load(payload){
    const item = await axios.get('/'+payload)
    // entities = await axios.get(entityType+'/'+payload)
    // JSON.parse(localStorage.getItem(payload))
    return Promise.resolve(item.data)
}


async function updateProduct(payload){
    // const productIdx = products.findIndex(item => item._id === payload._id) 
    // products.splice(productIdx, 1, payload)
    // const newProducts = oldProducts.filter((item) => item._id !== payload._id)
    // newProducts.push(payload)
    // await _save('products', products)
    await axios.put('/product', payload)
    const products = await _load('products')
    return products
}

async function addProduct(payload){
    // const newProducts = oldProducts.filter((item) => item._id !== payload._id)
    // await _save('products', products)
    // products.push(payload)
    await axios.post('/product', payload)
    const products = await _load('products')
    return products
}

async function deleteProduct(payload){
    // const newProducts = oldProducts.filter((item) => item._id !== payload._id)
    // // products.push(payload)
    // await _save('products', newProducts)
    await axios.delete('/product/'+payload._id)
    const newProducts = await _load('products')
    return newProducts
}

async function addToCart(payload){
    // cart.push(payload)
    // await _save('cart', cart)
    delete payload._id
    await axios.post('/cart_item', payload)
    const cart = await _load('cart') || []
    return cart
}

async function emptyCart(){
    // await _save('cart', cart)
    // console.log(item._id)
    const cart = await _load('cart')
    cart.forEach( async item => {
    await axios.delete('/cart_item/'+item._id)
        
    });
    return []
}

async function buyCartSales(){
    const cart = await _load('cart')
    cart.forEach(async (item) => {
        delete item._id
        item.createdAt = Date.now()
        await axios.post('/sale', item)    
    })
    const sales = await _load('sales')
    return sales
}

// !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

async function buyCartUniqueSales(){
    const cart = await _load('cart')
    const uniqueSalesTemp = []
    for (let ii = 0; ii < cart.length; ii++){
        if (!uniqueSalesTemp.length) {uniqueSalesTemp.push(cart[ii])}
        else if (uniqueSalesTemp.find(item => item.name === cart[ii].name)) {continue} else {uniqueSalesTemp.push(cart[ii])}
    }
    // for (let jj = 0; jj < uniqueSalesTemp.length; jj++){
    //     uniqueSalesTemp[jj].createdAt = Date.now()
    //     // uniqueSalesTemp[jj].year = new Date().getFullYear()
    //     // uniqueSalesTemp[jj].month = new Date().getMonth()+1
    //     // uniqueSalesTemp[jj].date = new Date().getDate()
    //     uniqueSales.push(uniqueSalesTemp[jj])
    // }
    // await _save('uniqueSales', uniqueSales)
    uniqueSalesTemp.forEach(async (item) => {
        delete item._id
        item.createdAt = Date.now()
        await axios.post('/unique_sale', item)
    })
    
    const uniqueSales = await _load('unique_sales')
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

