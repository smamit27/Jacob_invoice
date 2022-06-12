import { apiCall } from "../../../services/httpService"

const initialAllModules = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALL_MODULES = 'GET_ALL_MODULES'
const GET_ALL_MODULES_RESET = 'GET_ALL_MODULES_RESET'
const GET_ALL_MODULES_SUCCESS = 'GET_ALL_MODULES_SUCCESS'
const GET_ALL_MODULES_FAILURE = 'GET_ALL_MODULES_FAILURE'

export function getAllModulesResetAction () {
  return {
    type: GET_ALL_MODULES_RESET
  }
}

export function getAllModulesInitialAction() {
  return {
    type: GET_ALL_MODULES
  }
}

export function getAllModulesSuccessAction(payload) {
  return {
    type: GET_ALL_MODULES_SUCCESS,
    payload,
  }
}

export function getAllModulesFailureAction(payload) {
  return {
    type: GET_ALL_MODULES_FAILURE,
    payload
  }
}

export function getAllModulesAction () {
  return async (dispatch) => {
    try {
      dispatch(getAllModulesInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetUDFModuleAll?Active=Y&RoleID=0'
      })
      dispatch(getAllModulesSuccessAction(response))
    } catch (error) {
      dispatch(getAllModulesFailureAction(error))
    }
  }
}


export function getAllModulesReducer(state = initialAllModules, action) {
  switch (action.type) {
    case GET_ALL_MODULES:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_MODULES_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_MODULES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALL_MODULES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: []
      }
    default:
      return state
  }
}


/* get all field types */
const initialAllFieldTypes = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALL_FIELD_TYPES = 'GET_ALL_FIELD_TYPES'
const GET_ALL_FIELD_TYPES_RESET = 'GET_ALL_FIELD_TYPES_RESET'
const GET_ALL_FIELD_TYPES_SUCCESS = 'GET_ALL_FIELD_TYPES_SUCCESS'
const GET_ALL_FIELD_TYPES_FAILURE = 'GET_ALL_FIELD_TYPES_FAILURE'

export function getAllFieldTypesResetAction () {
  return {
    type: GET_ALL_FIELD_TYPES_RESET
  }
}

export function getAllFieldTypesInitialAction() {
  return {
    type: GET_ALL_FIELD_TYPES
  }
}

export function getAllFieldTypesSuccessAction(payload) {
  return {
    type: GET_ALL_FIELD_TYPES_SUCCESS,
    payload,
  }
}

export function getAllFieldTypesFailureAction(payload) {
  return {
    type: GET_ALL_FIELD_TYPES_FAILURE,
    payload
  }
}

export function getAllFieldTypesAction () {
  return async (dispatch) => {
    try {
      dispatch(getAllFieldTypesInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetUDFFieldTypeModel?Active=Y'
      })
      dispatch(getAllFieldTypesSuccessAction(response))
    } catch (error) {
      dispatch(getAllFieldTypesFailureAction(error))
    }
  }
}


export function getAllFieldTypesReducer(state = initialAllFieldTypes, action) {
  switch (action.type) {
    case GET_ALL_FIELD_TYPES:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_FIELD_TYPES_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_FIELD_TYPES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALL_FIELD_TYPES_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: []
      }
    default:
      return state
  }
}


/* Get UDF data columns info for selected tab */

const initialUdfModuleColumns = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_UDF_MODULE_COLUMNS = 'GET_UDF_MODULE_COLUMNS'
const GET_UDF_MODULE_COLUMNS_RESET = 'GET_UDF_MODULE_COLUMNS_RESET'
const GET_UDF_MODULE_COLUMNS_SUCCESS = 'GET_UDF_MODULE_COLUMNS_SUCCESS'
const GET_UDF_MODULE_COLUMNS_FAILURE = 'GET_UDF_MODULE_COLUMNS_FAILURE'

export function getUdfModuleColumnsResetAction () {
  return {
    type: GET_UDF_MODULE_COLUMNS_RESET
  }
}

export function getUdfModuleColumnsInitialAction() {
  return {
    type: GET_UDF_MODULE_COLUMNS
  }
}

export function getUdfModuleColumnsSuccessAction(payload) {
  return {
    type: GET_UDF_MODULE_COLUMNS_SUCCESS,
    payload,
  }
}

export function getUdfModuleColumnsFailureAction(payload) {
  return {
    type: GET_UDF_MODULE_COLUMNS_FAILURE,
    payload
  }
}

export function getUdfModuleColumnsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getUdfModuleColumnsInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetUDFGridData',
        params: payload
      })
      const modifiedResponse = await Promise.all(response.map(async (d) => {
        if (d.IS_DROPDOWN_YN === 'Y') {
          const res = await apiCall({
            method: 'get',
            url: '/GetUDFExistDrpValue',
            params: {
              udfId: d.UDF_ID,
              CollectionID: payload.CollectionID
            }
          })
          return {
            ...d,
            DROPDOWN_VALUE: res.map(d => d.DRP_VALUES)
          }
        }
        return d
      }))
      dispatch(getUdfModuleColumnsSuccessAction(modifiedResponse))
    } catch (error) {
      dispatch(getUdfModuleColumnsFailureAction(error))
    }
  }
}


export function getUdfModuleColumnsReducer(state = initialUdfModuleColumns, action) {
  switch (action.type) {
    case GET_UDF_MODULE_COLUMNS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_UDF_MODULE_COLUMNS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_UDF_MODULE_COLUMNS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_UDF_MODULE_COLUMNS_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: []
      }
    default:
      return state
  }
}

/* get UDF Numeric format */

const initialUdfNumericFormat = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_UDF_NUMERIC_FORMAT = 'GET_UDF_NUMERIC_FORMAT'
const GET_UDF_NUMERIC_FORMAT_RESET = 'GET_UDF_NUMERIC_FORMAT_RESET'
const GET_UDF_NUMERIC_FORMAT_SUCCESS = 'GET_UDF_NUMERIC_FORMAT_SUCCESS'
const GET_UDF_NUMERIC_FORMAT_FAILURE = 'GET_UDF_NUMERIC_FORMAT_FAILURE'

export function getUdfNumericFormatResetAction () {
  return {
    type: GET_UDF_NUMERIC_FORMAT_RESET
  }
}

export function getUdfNumericFormatInitialAction() {
  return {
    type: GET_UDF_NUMERIC_FORMAT
  }
}

export function getUdfNumericFormatSuccessAction(payload) {
  return {
    type: GET_UDF_NUMERIC_FORMAT_SUCCESS,
    payload,
  }
}

export function getUdfNumericFormatFailureAction(payload) {
  return {
    type: GET_UDF_NUMERIC_FORMAT_FAILURE,
    payload
  }
}

export function getUdfNumericFormatAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getUdfNumericFormatInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetUDFNumericTypeList?active=Y',
        params: payload
      })
      dispatch(getUdfNumericFormatSuccessAction(response))
    } catch (error) {
      dispatch(getUdfNumericFormatFailureAction(error))
    }
  }
}


export function getUdfNumericFormatReducer(state = initialUdfNumericFormat, action) {
  switch (action.type) {
    case GET_UDF_NUMERIC_FORMAT:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_UDF_NUMERIC_FORMAT_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_UDF_NUMERIC_FORMAT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_UDF_NUMERIC_FORMAT_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: []
      }
    default:
      return state
  }
}
