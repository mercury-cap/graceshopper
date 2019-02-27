import axios from 'axios'

const GET_ALL_PRODUCTS = 'GET_ALL_PRODUCTS'
const GET_SINGLE_PRODUCT = 'GET_SINGLE_PRODUCT'

const getAllProducts = products => ({
  type: GET_ALL_PRODUCTS,
  products
})

const getSingleProduct = singleProduct => ({
  type: GET_SINGLE_PRODUCT,
  singleProduct
})

export const getAllProducts = () => {
  return async dispatch => {
    const response = await axios.get('/api/products')
    const products = response.data
    const action = getAllProducts(products)
    dispatch(action)
  }
}

export const getSingleProduct = id => {
  return async dispatch => {
    const response = await axios.get(`/api/products/${id}`)
    const singleProduct = response.data
    const action = getSingleProduct(singleProduct)
    dispatch(action)
  }
}

const initialState = []

export default function(state = initialState, action) {
  switch (action.type) {
    case GET_ALL_PRODUCTS:
      return action.products
    case GET_SINGLE_PRODUCT:
      return action.singleProduct
    default:
      return state
  }
}
