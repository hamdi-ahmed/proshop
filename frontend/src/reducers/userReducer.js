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
    SET_USER_UPDATE_PROFILE_FAIL,
    SET_USER_RESET,
    SET_USER_USER_DETAILS_RESET,
    SET_USER_LIST_REQUEST,
    SET_USER_LIST_SUCCESS,
    SET_USER_LIST_FAIL,
    SET_USER_LIST_RESET,
    SET_USER_LIST_DELETED_REQUEST,
    SET_USER_LIST_DELETED_SUCCESS,
    SET_USER_LIST_DELETED_FAIL,
    SET_USER_INFORMATION_SUCCESS,
    SET_USER_INFORMATION_FAIL,
    SET_USER_UPDATE_SUCCESS,
    SET_USER_UPDATE_FAIL,
    SET_USER_UPDATE_RESET
} from '../constants/userConstant'

export const userLoginReducer = (state = {}, action) => {

    switch (action.type) {
        case SET_USER_LOGIN_REQUEST:
            return {
                loading: true,
                userInfo: {}
            }

        case SET_USER_LOGIN_SUCCESS:
            return {
                loading: false,
                userInfo: action.userInfo
            }

        case SET_USER_LOGIN_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        case SET_USER_LOGOUT:
            return {}

        default:
            return state
    }
}

export const userRegisterReducer = (state = {}, action) => {
    switch (action.type) {
        case SET_USER_REGISTER_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SET_USER_REGISTER_SUCCESS:
            return {
                userInfo: action.userRegister,
                loading: false
            }
        case SET_USER_REGISTER_FAIL:
            return {
                error: action.payload,
                loading: false
            }
        default:
            return state
    }
}

export const userDetailReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SET_USER_USER_DETAILS_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SET_USER_USER_DETAILS_SUCCESS:
            return {
                user: action.user,
                loading: false
            }

        case SET_USER_USER_DETAILS_FAIL:
            return {
                loading: false,
                error: action.error
            }
        case SET_USER_USER_DETAILS_RESET:
            return { user: {} }
        default:
            return state
    }
}

export const userUpdateReducer = (state = { userInfo: {} }, action) => {
    switch (action.type) {
        case SET_USER_UPDATE_PROFILE_REQUEST:
            return {
                userInfo: {},
                loading: true,
            }
        case SET_USER_UPDATE_PROFILE_SUCCESS:
            return {
                userInfo: action.userInfo,
                loading: false,
                success: true
            }

        case SET_USER_UPDATE_PROFILE_FAIL:
            return {
                loading: false,
                error: action.error
            }

        case SET_USER_RESET:
            return {
                ...state
            }
        default:
            return state
    }
}

export const userListReducer = (state = { users: [] }, action) => {
    switch (action.type) {
        case SET_USER_LIST_REQUEST:
            return {
                ...state,
                loading: true
            }

        case SET_USER_LIST_SUCCESS:
            return {
                users: action.users,
                loading: false,
            }

        case SET_USER_LIST_FAIL:
            return {
                error: action.error,
                loading: false,
            }
        case SET_USER_LIST_RESET:
            return {
                users: []
            }
        default:
            return state
    }
}

export const userDeletedReducer = (state = {}, action) => {
    //const users = action.payload
    switch (action.type) {
        case SET_USER_LIST_DELETED_REQUEST:
            return {
                loading: true
            }
        case SET_USER_LIST_DELETED_SUCCESS:
            return {
                success: true,
                loading: false
            }
        case SET_USER_LIST_DELETED_FAIL:
            return {
                loading: false,
                error: action.error
            }
        default:
            return state
    }
}

export const userInformationReducer = (state = { user: {} }, action) => {
    switch (action.type) {
        case SET_USER_INFORMATION_SUCCESS:
            return {
                success: true,
                user: action.user
            }
        case SET_USER_INFORMATION_FAIL:
            return {
                error: action.error
            }
        default:
            return state
    }
}

export const userUpdateFromAdminReducer = (state = { user: {}, success: false }, action) => {
    switch (action.type) {
        case SET_USER_UPDATE_SUCCESS:
            return {
                success: true
            }
        case SET_USER_UPDATE_FAIL:
            return {
                error: action.error
            }
        case SET_USER_UPDATE_RESET:
            return {
                user: {}
            }
        default:
            return state
    }
}