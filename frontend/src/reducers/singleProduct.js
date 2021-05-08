import {
    SET_FETCH_SINGLE_PRODUCT,
    SET_FETCH_SINGLE_PRODUCT_FAIL,
} from '../constants/productConstants'


export const singleProduct = (state = { Product: { reviews: [] } }, action) => {
    switch (action.type) {
        case SET_FETCH_SINGLE_PRODUCT:
            return {
                ...state,
                Product: action.productDetail
            }

        case SET_FETCH_SINGLE_PRODUCT_FAIL:
            return {
                ...state,
                err: action.err
            }

        default:
            return state
    }
}

