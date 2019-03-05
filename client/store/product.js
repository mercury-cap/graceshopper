import axios from 'axios'

const GOT_ALL_PRODUCTS = 'GOT_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'
const UPDATE_CART = 'UPDATE_CART'
const GOT_CART_ITEMS = 'GOT_CART_ITEMS'
const REMOVE_ITEM = 'REMOVE_ITEM'
const COMPLETED_CHECKOUT = 'COMPLETED_CHECKOUT'
const GOT_CART = 'GOT_CART'

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

const gotCartItems = cart => ({
  type: GOT_CART_ITEMS,
  cartId: cart.id,
  items: cart.products
})

const completedCheckout = () => ({
  type: COMPLETED_CHECKOUT
})

const removedItem = itemId => ({
  type: REMOVE_ITEM,
  itemId
})

const gotCart = cartId => ({
  type: GOT_CART,
  cartId
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
  const {data: updatedItem} = await axios.put('/api/users/cart', item)
  dispatch(updateCart(updatedItem))
}

export const getCartItems = () => {
  return async dispatch => {
    const {data: cart} = await axios.get('/api/users/cart')
    if (cart) dispatch(gotCartItems(cart))
  }
}

export const removeItem = itemId => {
  return async dispatch => {
    await axios.delete(`/api/users/cart/${itemId}`, itemId)
    dispatch(removedItem(itemId))
  }
}

export const completeCheckout = (cartId, amt) => async dispatch => {
  await axios.put(`/api/payment/${cartId}`, {amt})
  dispatch(completedCheckout())
}

export const updateQuantity = (quantity, itemId) => async dispatch => {
  const {data: updatedItem} = await axios.put(`/api/users/cart/${itemId}`, {
    quantity
  })
  dispatch(updateCart(updatedItem))
}

export const removeCart = cartId => {
  return async dispatch => {
    await axios.delete(`/api/users/cart/order/${cartId}`)
    dispatch(gotCart())
  }
}

const initialState = {
  products: [],
  singleProduct: {},
  cart: [],
  cartId: 0
}

export default function(state = initialState, action) {
  switch (action.type) {
    case GOT_ALL_PRODUCTS:
      return {...state, products: action.products}
    case GET_SINGLE_PRODUCT:
      return {...state, singleProduct: action.product}
    case UPDATE_CART: {
      const newCart = state.cart.filter(item => item.id !== action.item.id)
      return {...state, cart: [...newCart, action.item]}
    }
    case GOT_CART_ITEMS:
      return {...state, cart: action.items, cartId: action.cartId}
    case REMOVE_ITEM: {
      const filteredCart = state.cart.filter(
        item => item.id !== Number(action.itemId)
      )
      return {...state, cart: filteredCart}
    }
    case COMPLETED_CHECKOUT:
      return {...state, cart: initialState.cart, cartId: initialState.cartId}
    default:
      return state
  }
}
