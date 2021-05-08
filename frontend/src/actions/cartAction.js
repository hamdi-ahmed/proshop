import axios from 'axios'
import { CART_ADD_ITEMS, CART_REMOVE_ITEMS, CART_SAVE_PAYMENT_ADDRESS, CART_SAVE_SHIPPING_ADDRESS } from '../constants/cartConstant'

export const addToCart = (id, qty) => async (dispatch, getState) => {
    const { data } = await axios.get(`/api/products/${id}`)
    dispatch({
        type: CART_ADD_ITEMS,
        payload: {
            product: data._id,
            name: data.name,
            image: data.image,
            price: data.price,
            countInStock: data.countInStock,
            qty,
        }
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}

export const removeFromCart = (id) => (dispatch, getState) => {
    dispatch({
        type: CART_REMOVE_ITEMS,
        payload: id
    })
    localStorage.setItem('cartItems', JSON.stringify(getState().cart.cartItems))
}


export const saveShippingAddress = (data) => (dispatch) => {
    dispatch({
        type: CART_SAVE_SHIPPING_ADDRESS,
        shipping: data
    })
    localStorage.setItem('Shipping', JSON.stringify(data))
}


export const savePaymentAddress = (paymentAddress) => (dispatch) => {
    dispatch({
        type: CART_SAVE_PAYMENT_ADDRESS,
        payment: paymentAddress
    })

    localStorage.setItem('Payment', JSON.stringify(paymentAddress))
}