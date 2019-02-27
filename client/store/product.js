import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const SET_SUBTOTAL = 'SET_SUBTOTAL'
const SET_CART = 'SET_CART'

export const gotAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

export const getProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

// export const setSubtotal = (subtotal) => ({
//   type: SET_SUBTOTAL,
//   subtotal
// })

export const setCart = cartItems => ({
  type: SET_CART,
  cartItems
})

export const getAllProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    const action = gotAllProducts(products)
    dispatch(action)
  }
}

export const getSingleProduct = id => {
  return async dispatch => {
    const response = await axios.get(`/api/products/${id}`)
    const singleProduct = response.data
    dispatch(getProduct(singleProduct))
  }
}

const initialState = {
  products: [],
  singleProduct: {},
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    // case SET_SUBTOTAL:
    //   return {...state, subtotal: action.subtotal}
    case SET_CART:
      return {...state, cart: [...state.cart, ...action.cartItems]}
    default:
      return state
  }
}
// add a ACTION to clear the cart upon checkout
