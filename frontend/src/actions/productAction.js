import axios from 'axios'
import {
    SET_PRODUCT_LIST_REQUEST,
    SET_PRODUCT_LIST_SUCCESS,
    SET_PRODUCT_LIST_FAIL,
    SET_PRODUCT_DELETE_SUCCESS,
    SET_PRODUCT_DELETE_FAIL,
    SET_CREATE_PRODUCT_SUCCESS,
    SET_CREATE_PRODUCT_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_TOP_RATED_REQUEST,
    PRODUCT_TOP_RATED_SUCCESS,
    PRODUCT_TOP_RATED_FAIL,
} from '../constants/productConstants'

import { logout } from './userAction'

export const listProduct = (keyword = '', pageNumber = '') => async (dispatch) => {
    try {
        dispatch({ type: SET_PRODUCT_LIST_REQUEST })
        const { data } = await axios.get(`/api/products?keyword=${keyword}&pageNumber=${pageNumber}`)
        dispatch({
            type: SET_PRODUCT_LIST_SUCCESS,
            payload: data
        })
    } catch (err) {
        dispatch({
            type: SET_PRODUCT_LIST_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const deleteProduct = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        await axios.delete(`/api/products/${id}`, config)
        dispatch({ type: SET_PRODUCT_DELETE_SUCCESS })
    } catch (err) {
        dispatch({
            type: SET_PRODUCT_DELETE_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const creatingProduct = () => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.post('/api/products', {}, config)
        dispatch({
            type: SET_CREATE_PRODUCT_SUCCESS,
            product: data
        })
    } catch (err) {
        dispatch({
            type: SET_CREATE_PRODUCT_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const updateProduct = (product) => async (dispatch, getState) => {
    try {
        const {
            userLogin: { userInfo },
        } = getState()

        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        }

        const { data } = await axios.put(
            `/api/products/${product._id}`,
            product,
            config
        )

        dispatch({
            type: PRODUCT_UPDATE_SUCCESS,
            payload: data,
        })
        //dispatch({ type: PRODUCT_DETAILS_SUCCESS, payload: data })
    } catch (error) {
        const message =
            error.response && error.response.data.message
                ? error.response.data.message
                : error.message
        if (message === 'Not authorized, token failed') {
            dispatch(logout())
        }
        dispatch({
            type: PRODUCT_UPDATE_FAIL,
            payload: message,
        })
    }
}

export const addReview = (id, review) => async (dispatch, getState) => {
    try {
        dispatch({ type: PRODUCT_CREATE_REVIEW_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.post(`/api/products/${id}/reviews`, review, config)
        dispatch({
            type: PRODUCT_CREATE_REVIEW_SUCCESS
        })
    } catch (err) {
        dispatch({
            type: PRODUCT_CREATE_REVIEW_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const listTopProducts = () => async (dispatch) => {
    try {
        dispatch({ type: PRODUCT_TOP_RATED_REQUEST })

        const { data } = await axios.get(`/api/products/top`)

        dispatch({
            type: PRODUCT_TOP_RATED_SUCCESS,
            payload: data,
        })
    } catch (error) {
        dispatch({
            type: PRODUCT_TOP_RATED_FAIL,
            payload:
                error.response && error.response.data.message
                    ? error.response.data.message
                    : error.message,
        })
    }
}