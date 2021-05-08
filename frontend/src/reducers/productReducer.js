import {
    SET_PRODUCT_LIST_REQUEST,
    SET_PRODUCT_LIST_SUCCESS,
    SET_PRODUCT_LIST_FAIL,
    SET_PRODUCT_DELETE_SUCCESS,
    SET_PRODUCT_DELETE_FAIL,
    PRODUCT_UPDATE_SUCCESS,
    PRODUCT_UPDATE_FAIL,
    PRODUCT_UPDATE_RESET,
    SET_CREATE_PRODUCT_SUCCESS,
    SET_CREATE_PRODUCT_FAIL,
    SET_CREATE_PRODUCT_RESET,
    PRODUCT_CREATE_REVIEW_REQUEST,
    PRODUCT_CREATE_REVIEW_SUCCESS,
    PRODUCT_CREATE_REVIEW_FAIL,
    PRODUCT_CREATE_REVIEW_RESET,
    PRODUCT_TOP_RATED_REQUEST,
    PRODUCT_TOP_RATED_SUCCESS,
    PRODUCT_TOP_RATED_FAIL
} from '../constants/productConstants'

export const productListReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case SET_PRODUCT_LIST_REQUEST:
            return {
                ...state,
                loading: true,
                products: []
            }
        case SET_PRODUCT_LIST_SUCCESS:
            return {
                ...state,
                loading: false,
                products: action.payload.products,
                pages: action.payload.pages,
                pageNumber: action.payload.pageNumber
            }

        case SET_PRODUCT_LIST_FAIL:
            return {
                loading: false,
                err: action.payload
            }

        default:
            return state
    }
}

export const productReducerDelete = (state = { success: false }, action) => {
    switch (action.type) {
        case SET_PRODUCT_DELETE_SUCCESS:
            return {
                success: true
            }
        case SET_PRODUCT_DELETE_FAIL:
            return {
                error: action.error
            }
        default:
            return state
    }
}

export const createProductReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_CREATE_PRODUCT_SUCCESS:
            return {
                success: true,
                product: action.product
            }
        case SET_CREATE_PRODUCT_FAIL:
            return {
                error: action.error
            }
        case SET_CREATE_PRODUCT_RESET:
            return {}
        default:
            return state
    }
}

export const productUpdateReducer = (state = { product: {} }, action) => {
    switch (action.type) {
        case PRODUCT_UPDATE_SUCCESS:
            return { loading: false, success: true, product: action.payload }
        case PRODUCT_UPDATE_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_UPDATE_RESET:
            return { product: {} }
        default:
            return state
    }
}


export const productReviewsCreateReducer = (state = {}, action) => {
    switch (action.type) {
        case PRODUCT_CREATE_REVIEW_REQUEST:
            return {
                loading: true
            }
        case PRODUCT_CREATE_REVIEW_SUCCESS:
            return { loading: false, success: true, }
        case PRODUCT_CREATE_REVIEW_FAIL:
            return { loading: false, error: action.payload }
        case PRODUCT_CREATE_REVIEW_RESET:
            return { product: {} }
        default:
            return state
    }
}

export const productTopRatedReducer = (state = { products: [] }, action) => {
    switch (action.type) {
        case PRODUCT_TOP_RATED_REQUEST:
            return { loading: true, products: [] }
        case PRODUCT_TOP_RATED_SUCCESS:
            return { loading: false, products: action.payload }
        case PRODUCT_TOP_RATED_FAIL:
            return { loading: false, error: action.payload }
        default:
            return state
    }
}