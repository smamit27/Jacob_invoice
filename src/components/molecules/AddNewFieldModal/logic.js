import { apiCall, getAddAllModule, getRequiredOptions } from "../../../services/httpService"

const initialState = {
  loading: false,
  error: false,
  flag: false,
  data: [],
  code: 0
}

const ADD_MODULE_ALL = 'ADD_MODULE_ALL'
const ADD_MODULE_ALL_SUCCESS = 'ADD_MODULE_ALL_SUCCESS'
const ADD_MODULE_ALL_FAILURE = 'ADD_MODULE_ALL_FAILURE'

export function addModuleAllInitialAction() {
  return {
    type: ADD_MODULE_ALL
  }
}

export function addModuleAllSuccessAction(payload) {
  return {
    type: ADD_MODULE_ALL_SUCCESS,
    payload
  }
}

export function addModuleAllFailureAction(payload) {
  return {
    type: ADD_MODULE_ALL_FAILURE,
    payload
  }
}

export function addModuleAllAction() {
  return async (dispatch) => {
    try {
      dispatch(addModuleAllInitialAction())
      const response = await getAddAllModule()
      dispatch(addModuleAllSuccessAction(response))
    } catch (error) {
      dispatch(addModuleAllFailureAction(error))
    }
  }
}


export function addModuleAllReducer(state = initialState, action) {
  switch (action.type) {
    case ADD_MODULE_ALL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: [],
        code: 0
      }
    case ADD_MODULE_ALL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload,
        code: 0
      }
    case ADD_MODULE_ALL_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: [],
        code: 0
      }
    default:
      return state
  }
}


const initialStateOfRequired = {

  loading: false,
  error: false,
  flag: false,
  reqdata: [],
  code: 0
}
//for required options
const REQUIRED_OPTIONS = 'ADD_MODULE_ALL'
const REQUIRED_OPTIONS_SUCCESS = 'REQUIRED_OPTIONS_SUCCESS'
const REQUIRED_OPTIONS_FAILURE = 'REQUIRED_OPTIONS_FAILURE'

export function requiredOptionsInitialAction() {
  return {
    type: REQUIRED_OPTIONS
  }
}

export function requiredOptionsSuccessAction(payload) {
  return {
    type: REQUIRED_OPTIONS_SUCCESS,
    payload
  }
}

export function requiredOptionsFailureAction(payload) {
  return {
    type: REQUIRED_OPTIONS_FAILURE,
    payload
  }
}

export function requiredAllOptions() {
  return async (dispatch) => {
    try {
      dispatch(requiredOptionsInitialAction())
      const response = await getRequiredOptions()
      dispatch(requiredOptionsSuccessAction(response))
    } catch (error) {
      dispatch(requiredOptionsFailureAction(error))
    }
  }
}
export function requiredReducer(state = initialStateOfRequired, action) {
  switch (action.type) {
    case REQUIRED_OPTIONS:
      return {
        ...state,

        loading: true,
        error: false,
        flag: false,
        reqdata: [],
        code: 0
      }
    case REQUIRED_OPTIONS_SUCCESS:
      return {
        ...state,

        loading: false,
        error: false,
        flag: true,
        reqdata: action.payload,
        code: 0
      }
    case REQUIRED_OPTIONS_FAILURE:
      return {

        ...state,
        loading: false,
        error: true,
        flag: false,
        reqdata: [],
        code: 0
      }
    default:
      return state
  }
}
