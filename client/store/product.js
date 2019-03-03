import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_CART = 'UPDATE_CART'
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'

export const gotAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
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

const removedItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
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

export const removeItem = itemId => {
  return async dispatch => {
    await axios.delete(`/api/users/cart/${itemId}`, itemId)
    dispatch(removedItem(itemId))
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
    case UPDATE_CART:
      return {...state, cart: [...state.cart, action.item]}
    case GOT_CART_ITEMS:
      return {...state, cart: action.items}
    case REMOVE_ITEM: {
      const currentCart = [...state.cart]
      const filteredCart = currentCart.filter(item => {
        return item.id !== Number(action.itemId)
      })
      return {...state, cart: filteredCart}
    }
    default:
      return state
  }
}
// add a ACTION to clear the cart upon checkout
