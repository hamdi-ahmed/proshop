import { combineReducers, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import { composeWithDevTools } from 'redux-devtools-extension'
import {
    productListReducer,
    productReducerDelete,
    createProductReducer,
    productUpdateReducer,
    productReviewsCreateReducer,
    productTopRatedReducer
} from './reducers/productReducer'
import { singleProduct } from './reducers/singleProduct'
import { cartReducer } from './reducers/cartReducer'
import {
    userLoginReducer,
    userRegisterReducer,
    userDetailReducer,
    userUpdateReducer,
    userListReducer,
    userDeletedReducer,
    userInformationReducer,
    userUpdateFromAdminReducer,
} from './reducers/userReducer'

import {
    createOrderReducer,
    getOrderReducer,
    orderPayReducer,
    orderListMyReducer,
    orderReducer
} from './reducers/orderReducer'

const reducer = combineReducers({
    productList: productListReducer,
    productDetail: singleProduct,
    cart: cartReducer,
    userLogin: userLoginReducer,
    userRegister: userRegisterReducer,
    userDetails: userDetailReducer,
    userUpdate: userUpdateReducer,
    createOrder: createOrderReducer,
    getOrder: getOrderReducer,
    orderPay: orderPayReducer,
    orderList: orderListMyReducer,
    userList: userListReducer,
    userDeleted: userDeletedReducer,
    userInformation: userInformationReducer,
    userUpdateFromAdmin: userUpdateFromAdminReducer,
    productReducer: productReducerDelete,
    createProduct: createProductReducer,
    productUpdate: productUpdateReducer,
    order: orderReducer,
    productReview: productReviewsCreateReducer,
    productTopRated: productTopRatedReducer
})

const cartItemsFromStorage = localStorage.getItem('cartItems')
    ? JSON.parse(localStorage.getItem('cartItems'))
    : []


const userInfoFromStorage = localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo')) : null


const shippingAddressFromStorage = localStorage.getItem('Shipping')
    ? JSON.parse(localStorage.getItem('Shipping'))
    : []


const paymentAddressToStorage = localStorage.getItem('Payment')
    ? JSON.parse(localStorage.getItem('Payment'))
    : []
const initialState = {
    cart: {
        cartItems: cartItemsFromStorage,
        shipping: shippingAddressFromStorage,
        payment: paymentAddressToStorage
    },
    userLogin: {
        userInfo: userInfoFromStorage
    }
}

const middleware = [thunk]

const store = createStore(reducer, initialState, composeWithDevTools(applyMiddleware(...middleware)))

export default store