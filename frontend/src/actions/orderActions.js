import axios from 'axios'
import {
    DISPLAY_ORDERS_SUCCESS,
    ORDERS_FAIL,
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    SET_CREATE_ORDER_FAIL,
    SET_CREATE_ORDER_REQUEST,
    SET_CREATE_ORDER_SUCCESS,
    SET_GET_ORDERS_REQUEST,
    SET_GET_ORDER_FAIL,
    SET_GET_ORDER_REQUEST,
    SET_GET_ORDER_SUCCESS,
    SET_ORDERS_FAIL,
    SET_ORDER_PAY_FAIL,
    SET_ORDER_PAY_REQUEST,
    SET_ORDER_PAY_SUCCESS
} from '../constants/orderConstants'


export const creatingOrder = (order) => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_CREATE_ORDER_REQUEST })

        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
                'Content-Type': 'application/json'
            }
        }

        const { data } = await axios.post('/api/orders', order, config)
        dispatch({
            type: SET_CREATE_ORDER_SUCCESS,
            createdOrder: data
        })
        localStorage.setItem('Orders', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: SET_CREATE_ORDER_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const getOrderDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_GET_ORDER_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`,
            }
        }

        const { data } = await axios.get(`/api/orders/${id}`, config)
        dispatch({
            type: SET_GET_ORDER_SUCCESS,
            singleOrder: data
        })

    } catch (err) {
        dispatch({
            type: SET_GET_ORDER_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const orderPaid = (id, paymentResult) => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_ORDER_PAY_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/orders/${id}/pay`, paymentResult, config)
        dispatch({
            type: SET_ORDER_PAY_SUCCESS,
            orderPay: data
        })
    } catch (err) {
        dispatch({
            type: SET_ORDER_PAY_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const displayMyOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_GET_ORDERS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.get(`/api/orders/myOrders`, config)
        dispatch({
            type: DISPLAY_ORDERS_SUCCESS,
            orders: data
        })

    } catch (err) {
        dispatch({
            type: SET_ORDERS_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const getAllOrders = () => async (dispatch, getState) => {
    try {
        dispatch({ type: ORDERS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get('/api/orders', config)
        dispatch({
            type: ORDERS_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: ORDERS_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}