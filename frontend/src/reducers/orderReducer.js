import {
    DISPLAY_ORDERS_SUCCESS,
    ORDERS_FAIL,
    ORDERS_REQUEST,
    ORDERS_SUCCESS,
    ORDER_LIST_RESET,
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
    SET_ORDER_PAY_SUCCESS,
    SET_ORDER_RESET
} from '../constants/orderConstants'

export const createOrderReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_CREATE_ORDER_REQUEST:
            return {
                loading: true
            }
        case SET_CREATE_ORDER_SUCCESS:
            return {
                createdOrder: action.createdOrder,
                loading: false,
                success: true
            }

        case SET_CREATE_ORDER_FAIL:
            return {
                error: action.error,
                loading: false
            }

        default:
            return state
    }
}


export const getOrderReducer = (state = { loading: true, orderItems: [], shippingAddress: {} }, action) => {
    switch (action.type) {
        case SET_GET_ORDER_REQUEST:
            return {
                ...state,
                loading: true
            }
        case SET_GET_ORDER_SUCCESS:
            return {
                singleOrder: action.singleOrder,
                loading: false,
            }
        case SET_GET_ORDER_FAIL:
            return {
                loading: false,
                error: action.error
            }

        default:
            return state
    }
}

export const orderPayReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_ORDER_PAY_REQUEST:
            return {
                loading: true
            }
        case SET_ORDER_PAY_SUCCESS:
            return {
                loading: false,
                success: true,
            }
        case SET_ORDER_PAY_FAIL:
            return {
                loading: false,
                error: action.error,
            }
        case SET_ORDER_RESET:
            return {}
        default:
            return state
    }
}


export const orderListMyReducer = (state = { orders: [] }, action) => {
    switch (action.type) {
        case SET_GET_ORDERS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case DISPLAY_ORDERS_SUCCESS:
            return {
                loading: false,
                orders: action.orders,
            }

        case SET_ORDERS_FAIL:
            return {
                loading: false,
                error: action.payload
            }

        case ORDER_LIST_RESET:
            return { orders: [] }
        default:
            return state
    }
}

export const orderReducer = (state = { payload: [] }, action) => {
    switch (action.type) {
        case ORDERS_REQUEST:
            return {
                loading: true
            }
        case ORDERS_SUCCESS:
            return {
                loading: false,
                payload: action.payload
            }
        case ORDERS_FAIL:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}
