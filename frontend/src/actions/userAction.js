import axios from 'axios'
import {
    SET_USER_LOGIN_REQUEST,
    SET_USER_LOGIN_SUCCESS,
    SET_USER_LOGIN_FAIL,
    SET_USER_LOGOUT,
    SET_USER_REGISTER_REQUEST,
    SET_USER_REGISTER_SUCCESS,
    SET_USER_REGISTER_FAIL,
    SET_USER_USER_DETAILS_REQUEST,
    SET_USER_USER_DETAILS_SUCCESS,
    SET_USER_USER_DETAILS_FAIL,
    SET_USER_UPDATE_PROFILE_REQUEST,
    SET_USER_UPDATE_PROFILE_SUCCESS,
    SET_USER_RESET,
    SET_USER_LIST_REQUEST,
    SET_USER_LIST_SUCCESS,
    SET_USER_LIST_FAIL,
    SET_USER_LIST_DELETED_REQUEST,
    SET_USER_LIST_DELETED_SUCCESS,
    SET_USER_LIST_DELETED_FAIL,
    SET_USER_INFORMATION_SUCCESS,
    SET_USER_INFORMATION_FAIL,
    SET_USER_UPDATE_SUCCESS,
    SET_USER_UPDATE_FAIL
} from '../constants/userConstant'

import { ORDER_LIST_RESET } from '../constants/orderConstants'


export const login = (email, password) => async (dispatch) => {
    try {
        dispatch({
            type: SET_USER_LOGIN_REQUEST
        })
        //we want to send data in a header with content type
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const { data } = await axios.post('/api/users/login', { email, password }, config)
        dispatch({
            type: SET_USER_LOGIN_SUCCESS,
            userInfo: data
        })

        localStorage.setItem('userInfo', JSON.stringify(data))

    } catch (err) {
        dispatch({
            type: SET_USER_LOGIN_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

// export const logout = () => (dispatch) => {
//     localStorage.removeItem('userInfo')
//     dispatch({ type: SET_USER_LOGOUT })
//     dispatch({ type: SET_USER_RESET })
//     dispatch({ type: ORDER_LIST_RESET })
// }

export const logout = () => (dispatch) => {
    localStorage.removeItem('userInfo')
    localStorage.removeItem('cartItems')
    localStorage.removeItem('Shipping')
    localStorage.removeItem('Payment')
    dispatch({ type: SET_USER_LOGOUT })
    dispatch({ type: SET_USER_RESET })
    dispatch({ type: ORDER_LIST_RESET })
    document.location.href = '/login'
}

export const register = (name, email, password) => async (dispatch) => {
    try {
        dispatch({ type: SET_USER_REGISTER_REQUEST })
        //we want to send data in a header with content type
        const config = {
            headers: {
                'Content-Type': 'application/json'
            },
        }
        const { data } = await axios.post('/api/users/', { name, email, password }, config)
        dispatch({
            type: SET_USER_REGISTER_SUCCESS,
            userInfo: data
        })
        dispatch({
            type: SET_USER_LOGIN_SUCCESS,
            userInfo: data
        })
        localStorage.setItem('userInfo', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: SET_USER_REGISTER_FAIL,
            payload:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const getUserDetails = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_USER_USER_DETAILS_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            },
        }

        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: SET_USER_USER_DETAILS_SUCCESS,
            user: data
        })
    } catch (err) {
        dispatch({
            type: SET_USER_USER_DETAILS_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const update = (user, id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_USER_UPDATE_PROFILE_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }

        const { data } = await axios.put(`/api/users/${id}`, user, config)
        dispatch({
            type: SET_USER_UPDATE_PROFILE_SUCCESS,
            userInfo: data
        })

        //localStorage.setItem('userUpdate', JSON.stringify(data))
    } catch (err) {
        dispatch({
            type: SET_USER_USER_DETAILS_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const getAllUsers = () => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_USER_LIST_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users`, config)
        dispatch({
            type: SET_USER_LIST_SUCCESS,
            users: data
        })
    } catch (err) {
        dispatch({
            type: SET_USER_LIST_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }

}

export const deleteUser = (id) => async (dispatch, getState) => {
    try {
        dispatch({ type: SET_USER_LIST_DELETED_REQUEST })
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        await axios.delete(`/api/users/${id}`, config)
        dispatch({ type: SET_USER_LIST_DELETED_SUCCESS })
    } catch (err) {
        dispatch({
            type: SET_USER_LIST_DELETED_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}


export const getUserInfo = (id) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.get(`/api/users/${id}`, config)
        dispatch({
            type: SET_USER_INFORMATION_SUCCESS,
            user: data
        })
    } catch (err) {
        dispatch({
            type: SET_USER_INFORMATION_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}

export const userUpdateProfile = (id, user) => async (dispatch, getState) => {
    try {
        const { userLogin: { userInfo } } = getState()
        const config = {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`
            }
        }
        const { data } = await axios.put(`/api/users/${id}`, user, config)
        dispatch({ type: SET_USER_UPDATE_SUCCESS })
        dispatch({ type: SET_USER_USER_DETAILS_SUCCESS, user: data })
    } catch (err) {
        dispatch({
            type: SET_USER_UPDATE_FAIL,
            error:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
