import axios from 'axios'
import {
    SET_FETCH_SINGLE_PRODUCT,
    SET_FETCH_SINGLE_PRODUCT_FAIL,
} from '../constants/productConstants'

export const fetchSingleProduct = (id) => async (dispatch, match) => {
    try {
        const { data } = await axios.get(`/api/products/${id}`)
        dispatch({
            type: SET_FETCH_SINGLE_PRODUCT,
            productDetail: data
        })
    } catch (err) {
        dispatch({
            type: SET_FETCH_SINGLE_PRODUCT_FAIL,
            err:
                err.response && err.response.data.message
                    ? err.response.data.message
                    : err.message,
        })
    }
}
