import axios from 'axios'

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_CART = 'UPDATE_CART'
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const COMPLETED_CHECKOUT = 'COMPLETED_CHECKOUT'

export const gotAllProducts = products => ({
  type: GOT_ALL_PRODUCTS,
  products
})

export const getProduct = product => ({
  type: GET_SINGLE_PRODUCT,
  product
})

const updateCart = item => ({
  type: UPDATE_CART,
  item
})

const gotCartItems = items => ({
  type: GOT_CART_ITEMS,
  items
})

const completedCheckout = () => ({
  type: COMPLETED_CHECKOUT
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

export const updateCartInServer = item => async dispatch => {
  await axios.put('/api/users/cart', item)
  dispatch(updateCart(item))
}

export const getCartItems = () => {
  return async dispatch => {
    const {data: items} = await axios.get('/api/users/cart')
    dispatch(gotCartItems(items))
  }
}

export const completeCheckout = () => async dispatch => {
  await axios.delete('/api/payment')
  dispatch(completedCheckout())
}

const initialState = {
  products: [],
  singleProduct: {},
  cart: []
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case UPDATE_CART:
      return {...state, cart: [...state.cart, action.item]}
    case GOT_CART_ITEMS:
      return {...state, cart: action.items}
    case COMPLETED_CHECKOUT:
      return {...state, cart: initialState.cart}
    default:
      return state
  }
}
// add a ACTION to clear the cart upon checkout
