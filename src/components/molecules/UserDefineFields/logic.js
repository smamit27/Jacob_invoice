import { apiCall } from "../../../services/httpService"

/* User define fields modal open close logic */

const USER_DEFINE_FIELDS_MODAL_OPEN = 'USER_DEFINE_FIELDS_MODAL_OPEN'
const USER_DEFINE_FIELDS_MODAL_CLOSE = 'USER_DEFINE_FIELDS_MODAL_CLOSE'

const initialStateModal = {
  open: false,
  data: {}
}

export function userDefineFieldsModalOpenAction (payload = {}) {
  return {
    type: USER_DEFINE_FIELDS_MODAL_OPEN,
    payload
  }
}

export function userDefineFieldsModalCloseAction () {
  return {
    type: USER_DEFINE_FIELDS_MODAL_CLOSE,
  }
}


export function userDefineFieldsModalReducer (state = initialStateModal, action) {
  switch (action.type) {
    case USER_DEFINE_FIELDS_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case USER_DEFINE_FIELDS_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* GET all user define fields */

const initialAllUdf = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALL_UDF = 'GET_ALL_UDF'
const GET_ALL_UDF_FLAG_RESET = 'GET_ALL_UDF_FLAG_RESET'
const GET_ALL_UDF_RESET = 'GET_ALL_UDF_RESET'
const GET_ALL_UDF_SUCCESS = 'GET_ALL_UDF_SUCCESS'
const GET_ALL_UDF_FAILURE = 'GET_ALL_UDF_FAILURE'

export function getAllUdfResetAction () {
  return {
    type: GET_ALL_UDF_RESET
  }
}

export function getAllUdfFlagResetAction () {
  return {
    type: GET_ALL_UDF_FLAG_RESET
  }
}

export function getAllUdfInitialAction() {
  return {
    type: GET_ALL_UDF
  }
}

export function getAllUdfSuccessAction(payload) {
  return {
    type: GET_ALL_UDF_SUCCESS,
    payload,
  }
}

export function getAllUdfFailureAction(payload) {
  return {
    type: GET_ALL_UDF_FAILURE,
    payload
  }
}

export function getAllUdfAction (params) {
  return async (dispatch) => {
    try {
      dispatch(getAllUdfInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetUDFGridData',
        params
      })
      const modifiedResponse = await Promise.all(response.map(async (d) => {
        if (d.IS_DROPDOWN_YN === 'Y') {
          const res = await apiCall({
            method: 'get',
            url: '/GetUDFExistDrpValue',
            params: {
              udfId: d.UDF_ID,
              ...params
            }
          })
          return {
            ...d,
            DROPDOWN_VALUE: res.map(d => d.DRP_VALUES)
          }
        }
        return d
      }))
      dispatch(getAllUdfSuccessAction(modifiedResponse))
    } catch (error) {
      dispatch(getAllUdfFailureAction(error))
    }
  }
}


export function getAllUdfReducer(state = initialAllUdf, action) {
  switch (action.type) {
    case GET_ALL_UDF:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_UDF_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_UDF_FLAG_RESET:
      return {
        ...state,
        flag: false
      }
    case GET_ALL_UDF_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALL_UDF_FAILURE:
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



/* Delete user define field */

const initialDeleteUdfs = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const DELETE_USER_DEIFINE_FIELDS_ = 'DELETE_USER_DEIFINE_FIELDS_'
const DELETE_USER_DEIFINE_FIELDS__RESET = 'DELETE_USER_DEIFINE_FIELDS__RESET'
const DELETE_USER_DEIFINE_FIELDS__SUCCESS = 'DELETE_USER_DEIFINE_FIELDS__SUCCESS'
const DELETE_USER_DEIFINE_FIELDS__FAILURE = 'DELETE_USER_DEIFINE_FIELDS__FAILURE'

export function deleteUserDefineFieldsResetAction () {
  return {
    type: DELETE_USER_DEIFINE_FIELDS__RESET
  }
}

export function deleteUserDefineFieldsInitialAction() {
  return {
    type: DELETE_USER_DEIFINE_FIELDS_
  }
}

export function deleteUserDefineFieldsSuccessAction(payload) {
  return {
    type: DELETE_USER_DEIFINE_FIELDS__SUCCESS,
    payload,
    message: "User define field's deleted successfully",
    showNotification: true
  }
}

export function deleteUserDefineFieldsFailureAction(payload) {
  return {
    type: DELETE_USER_DEIFINE_FIELDS__FAILURE,
    payload
  }
}

export function deleteUserDefineFieldsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteUserDefineFieldsInitialAction())
      const response = await apiCall({
        method: 'delete',
        url: '/DeleteUDFData',
        data: payload.data,
        params: payload.params
      })
      dispatch(deleteUserDefineFieldsSuccessAction({}))
    } catch (error) {
      dispatch(deleteUserDefineFieldsFailureAction(error))
    }
  }
}


export function deleteUserDefineFieldsReducer(state = initialDeleteUdfs, action) {
  switch (action.type) {
    case DELETE_USER_DEIFINE_FIELDS_:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_USER_DEIFINE_FIELDS__RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_USER_DEIFINE_FIELDS__SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_USER_DEIFINE_FIELDS__FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: {}
      }
    default:
      return state
  }
}


/* Create/Edit/View user define field modal open close logic */

const CREATE_EDIT_USER_DEFINE_FIELD_MODAL_OPEN = 'CREATE_EDIT_USER_DEFINE_FIELD_MODAL_OPEN'
const CREATE_EDIT_USER_DEFINE_FIELD_MODAL_CLOSE = 'CREATE_EDIT_USER_DEFINE_FIELD_MODAL_CLOSE'

export function createEditUserDefineFieldModalOpenAction (payload = {}) {
  return {
    type: CREATE_EDIT_USER_DEFINE_FIELD_MODAL_OPEN,
    payload
  }
}

export function createEditUserDefineFieldModalCloseAction () {
  return {
    type: CREATE_EDIT_USER_DEFINE_FIELD_MODAL_CLOSE,
  }
}


export function createEditUserDefineFieldModalReducer (state = initialStateModal, action) {
  switch (action.type) {
    case CREATE_EDIT_USER_DEFINE_FIELD_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case CREATE_EDIT_USER_DEFINE_FIELD_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* Create Edit User define field */

const initialStateFormData = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const CREATE_EDIT_USER_DEFINE_FIELD = 'CREATE_EDIT_USER_DEFINE_FIELD'
const CREATE_EDIT_USER_DEFINE_FIELD_RESET = 'CREATE_EDIT_USER_DEFINE_FIELD_RESET'
const CREATE_EDIT_USER_DEFINE_FIELD_SUCCESS = 'CREATE_EDIT_USER_DEFINE_FIELD_SUCCESS'
const CREATE_EDIT_USER_DEFINE_FIELD_FAILURE = 'CREATE_EDIT_USER_DEFINE_FIELD_FAILURE'

export function createEditUserDefineFieldInitialAction() {
  return {
    type: CREATE_EDIT_USER_DEFINE_FIELD
  }
}

export function createEditUserDefineFieldResetAction () {
  return {
    type: CREATE_EDIT_USER_DEFINE_FIELD_RESET
  }
}

export function createEditUserDefineFieldSuccessAction(payload, flag) {
  return {
    type: CREATE_EDIT_USER_DEFINE_FIELD_SUCCESS,
    payload,
    message: `User define field ${flag === 'new' ? 'created' : 'updated'} successfully`,
    showNotification: true
  }
}

export function createEditUserDefineFieldFailureAction(payload) {
  return {
    type: CREATE_EDIT_USER_DEFINE_FIELD_FAILURE,
    payload
  }
}

export function createEditUserDefineFieldAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(createEditUserDefineFieldInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/InsertUDFData',
        data: payload.data,
        params: payload.params
      })
      dispatch(createEditUserDefineFieldSuccessAction(response, payload?.params?.saveMode === 'I' ? 'new' : 'updated'))
    } catch (error) {
      dispatch(createEditUserDefineFieldFailureAction(error))
    }
  }
}


export function createEditUserDefineFieldReducer(state = initialStateFormData, action) {
  switch (action.type) {
    case CREATE_EDIT_USER_DEFINE_FIELD:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_USER_DEFINE_FIELD_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_USER_DEFINE_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case CREATE_EDIT_USER_DEFINE_FIELD_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: {}
      }
    default:
      return state
  }
}



/* Get existing dropdown options usin udf id */

const initialExistingDropdownOptions = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_EXISTING_DROPDOWN_OPTIONS = 'GET_EXISTING_DROPDOWN_OPTIONS'
const GET_EXISTING_DROPDOWN_OPTIONS_RESET = 'GET_EXISTING_DROPDOWN_OPTIONS_RESET'
const GET_EXISTING_DROPDOWN_OPTIONS_SUCCESS = 'GET_EXISTING_DROPDOWN_OPTIONS_SUCCESS'
const GET_EXISTING_DROPDOWN_OPTIONS_FAILURE = 'GET_EXISTING_DROPDOWN_OPTIONS_FAILURE'
const GET_EXISTING_DROPDOWN_OPTIONS_RESET_FLAG = 'GET_EXISTING_DROPDOWN_OPTIONS_RESET_FLAG'

export function getExistingDropdownOptionsResetAction () {
  return {
    type: GET_EXISTING_DROPDOWN_OPTIONS_RESET
  }
}

export function getExistingDropdownOptionsResetFlagAction () {
  return {
    type: GET_EXISTING_DROPDOWN_OPTIONS_RESET_FLAG
  }
}

export function getExistingDropdownOptionsInitialAction() {
  return {
    type: GET_EXISTING_DROPDOWN_OPTIONS
  }
}

export function getExistingDropdownOptionsSuccessAction(payload) {
  return {
    type: GET_EXISTING_DROPDOWN_OPTIONS_SUCCESS,
    payload,
  }
}

export function getExistingDropdownOptionsFailureAction(payload) {
  return {
    type: GET_EXISTING_DROPDOWN_OPTIONS_FAILURE,
    payload
  }
}

export function getExistingDropdownOptionsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getExistingDropdownOptionsInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetUDFExistDrpValue',
        params: payload
      })
      dispatch(getExistingDropdownOptionsSuccessAction(response))
    } catch (error) {
      dispatch(getExistingDropdownOptionsFailureAction(error))
    }
  }
}


export function getExistingDropdownOptionsReducer(state = initialExistingDropdownOptions, action) {
  switch (action.type) {
    case GET_EXISTING_DROPDOWN_OPTIONS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_EXISTING_DROPDOWN_OPTIONS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_EXISTING_DROPDOWN_OPTIONS_RESET_FLAG:
      return {
        ...state,
        flag: false
      }
    case GET_EXISTING_DROPDOWN_OPTIONS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload.map(d => d.DRP_VALUES)
      }
    case GET_EXISTING_DROPDOWN_OPTIONS_FAILURE:
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
