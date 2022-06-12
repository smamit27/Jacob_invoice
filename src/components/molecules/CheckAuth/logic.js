import { apiCall } from "../../../services/httpService"

const initialState = {
  loading: false,
  error: false,
  flag: false,
  data: false,
  code: 0
}

const CHECK_AUTH = 'CHECK_AUTH'
const CHECK_AUTH_SUCCESS = 'CHECK_AUTH_SUCCESS'
const CHECK_AUTH_FAILURE = 'CHECK_AUTH_FAILURE'

export function checkAuthInitialAction() {
  return {
    type: CHECK_AUTH
  }
}

export function checkAuthSuccessAction(payload) {
  return {
    type: CHECK_AUTH_SUCCESS,
    payload
  }
}

export function checkAuthFailureAction(payload) {
  return {
    type: CHECK_AUTH_FAILURE,
    payload
  }
}

export function checkAuthAction () {
  return async (dispatch) => {
    try {
      dispatch(checkAuthInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/todos/1',
        dummy: true
      })
      dispatch(checkAuthSuccessAction(response))
    } catch (error) {
      dispatch(checkAuthFailureAction(error))
    }
  }
}


export function checkAuthReducer(state = initialState, action) {
  switch (action.type) {
    case CHECK_AUTH:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: false,
        code: 0
      }
    case CHECK_AUTH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: true,
        code: 0
      }
    case CHECK_AUTH_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: false,
        code: 0
      }
    default:
      return state
  }
}