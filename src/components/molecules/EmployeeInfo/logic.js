import { generateRandomString, jsonStringParse } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

/* Get employeeInfo table data */

const initialStateEmployeeInfoTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const EMPLOYEE_INFO_TABLE = 'EMPLOYEE_INFO_TABLE'
const EMPLOYEE_INFO_TABLE_RESET = 'EMPLOYEE_INFO_TABLE_RESET'
const EMPLOYEE_INFO_TABLE_FLAG_RESET = 'EMPLOYEE_INFO_TABLE_FLAG_RESET'
const EMPLOYEE_INFO_TABLE_SUCCESS = 'EMPLOYEE_INFO_TABLE_SUCCESS'
const EMPLOYEE_INFO_TABLE_FAILURE = 'EMPLOYEE_INFO_TABLE_FAILURE'

export function employeeInfoTableResetAction () {
  return {
    type: EMPLOYEE_INFO_TABLE_RESET
  }
}

export function employeeInfoTableFlagResetAction () {
  return {
    type: EMPLOYEE_INFO_TABLE_FLAG_RESET
  }
}

export function employeeInfoTableInitialAction() {
  return {
    type: EMPLOYEE_INFO_TABLE
  }
}

export function employeeInfoTableSuccessAction(payload) {
  return {
    type: EMPLOYEE_INFO_TABLE_SUCCESS,
    payload,
  }
}

export function employeeInfoTableFailureAction(payload) {
  return {
    type: EMPLOYEE_INFO_TABLE_FAILURE,
    payload
  }
}

export function employeeInfoTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(employeeInfoTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetEmployeeInfoHeaderData',
        params: payload
      })
      dispatch(employeeInfoTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(employeeInfoTableFailureAction(error))
    }
  }
}


export function employeeInfoTableReducer(state = initialStateEmployeeInfoTable, action) {
  switch (action.type) {
    case EMPLOYEE_INFO_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_INFO_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_INFO_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case EMPLOYEE_INFO_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case EMPLOYEE_INFO_TABLE_FAILURE:
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

/* save employeeInfo table data */

const initialStateEmployeeInfoTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_EMPLOYEE_INFO_TABLE = 'SAVE_EMPLOYEE_INFO_TABLE'
const SAVE_EMPLOYEE_INFO_TABLE_RESET = 'SAVE_EMPLOYEE_INFO_TABLE_RESET'
const SAVE_EMPLOYEE_INFO_TABLE_SUCCESS = 'SAVE_EMPLOYEE_INFO_TABLE_SUCCESS'
const SAVE_EMPLOYEE_INFO_TABLE_FAILURE = 'SAVE_EMPLOYEE_INFO_TABLE_FAILURE'

export function saveEmployeeInfoTableResetAction () {
  return {
    type: SAVE_EMPLOYEE_INFO_TABLE_RESET
  }
}

export function saveEmployeeInfoTableInitialAction() {
  return {
    type: SAVE_EMPLOYEE_INFO_TABLE
  }
}

export function saveEmployeeInfoTableSuccessAction(payload) {
  return {
    type: SAVE_EMPLOYEE_INFO_TABLE_SUCCESS,
    payload,
  }
}

export function saveEmployeeInfoTableFailureAction(payload) {
  return {
    type: SAVE_EMPLOYEE_INFO_TABLE_FAILURE,
    payload
  }
}

export function saveEmployeeInfoTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveEmployeeInfoTableInitialAction())
      const { U, I } = payload
      if (U.infoData?.length) {
        await apiCall({
          method: 'put',
          url: '/UpdateEmployeeInfo',
          data: payload.U
        })
      }
      if (I.infoData?.length) {
        await apiCall({
          method: 'post',
          url: '/InsertEmployeeInfo',
          data: payload.I
        })
      }
      dispatch(saveEmployeeInfoTableSuccessAction({}))
    } catch (error) {
      dispatch(saveEmployeeInfoTableFailureAction(error))
    }
  }
}


export function saveEmployeeInfoTableReducer(state = initialStateEmployeeInfoTableSave, action) {
  switch (action.type) {
    case SAVE_EMPLOYEE_INFO_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_EMPLOYEE_INFO_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_EMPLOYEE_INFO_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_EMPLOYEE_INFO_TABLE_FAILURE:
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


/* get billing title dropdown options */

const initialStateBillingTitleDropdown = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN = 'EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN'
const EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_RESET = 'EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_RESET'
const EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FLAG_RESET = 'EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FLAG_RESET'
const EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_SUCCESS = 'EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_SUCCESS'
const EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FAILURE = 'EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FAILURE'

export function employeeInfoBillingTitleDropdownResetAction () {
  return {
    type: EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_RESET
  }
}

export function employeeInfoBillingTitleDropdownFlagResetAction () {
  return {
    type: EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FLAG_RESET
  }
}

export function employeeInfoBillingTitleDropdownInitialAction() {
  return {
    type: EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN
  }
}

export function employeeInfoBillingTitleDropdownSuccessAction(payload) {
  return {
    type: EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_SUCCESS,
    payload,
  }
}

export function employeeInfoBillingTitleDropdownFailureAction(payload) {
  return {
    type: EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FAILURE,
    payload
  }
}

export function employeeInfoBillingTitleDropdownAction (payload = {}) {
  return async (dispatch) => {
    try {
      dispatch(employeeInfoBillingTitleDropdownInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBillingTitleCode',
        params: payload,
      })
      dispatch(employeeInfoBillingTitleDropdownSuccessAction(response.map(d => d.Billing_Title_Code)))
    } catch (error) {
      dispatch(employeeInfoBillingTitleDropdownFailureAction(error))
    }
  }
}


export function employeeInfoBillingTitleDropdownReducer(state = initialStateBillingTitleDropdown, action) {
  switch (action.type) {
    case EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case EMPLOYEE_INFO_BILLING_TITLE_DROPDOWN_FAILURE:
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


/* get Subcontractor dropdown options */

const initialStateSubcontractorDropdown = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN = 'EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN'
const EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_RESET = 'EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_RESET'
const EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FLAG_RESET = 'EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FLAG_RESET'
const EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_SUCCESS = 'EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_SUCCESS'
const EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FAILURE = 'EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FAILURE'

export function employeeInfoSubcontractorDropdownResetAction () {
  return {
    type: EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_RESET
  }
}

export function employeeInfoSubcontractorDropdownFlagResetAction () {
  return {
    type: EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FLAG_RESET
  }
}

export function employeeInfoSubcontractorDropdownInitialAction() {
  return {
    type: EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN
  }
}

export function employeeInfoSubcontractorDropdownSuccessAction(payload) {
  return {
    type: EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_SUCCESS,
    payload,
  }
}

export function employeeInfoSubcontractorDropdownFailureAction(payload) {
  return {
    type: EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FAILURE,
    payload
  }
}

export function employeeInfoSubcontractorDropdownAction () {
  return async (dispatch) => {
    try {
      dispatch(employeeInfoSubcontractorDropdownInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBillingSubcontractor'
      })
      dispatch(employeeInfoSubcontractorDropdownSuccessAction(response.map(d => ({ id: d.seQ_NUM, description: d.level }))))
    } catch (error) {
      dispatch(employeeInfoSubcontractorDropdownFailureAction(error))
    }
  }
}


export function employeeInfoSubcontractorDropdownReducer(state = initialStateSubcontractorDropdown, action) {
  switch (action.type) {
    case EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case EMPLOYEE_INFO_SUBCONTRACTOR_DROPDOWN_FAILURE:
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


const initialDeleteEmployeeInfo = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const DELETE_EMPLOYEE_INFO = 'DELETE_EMPLOYEE_INFO'
const DELETE_EMPLOYEE_INFO_RESET = 'DELETE_EMPLOYEE_INFO_RESET'
const DELETE_EMPLOYEE_INFO_SUCCESS = 'DELETE_EMPLOYEE_INFO_SUCCESS'
const DELETE_EMPLOYEE_INFO_FAILURE = 'DELETE_EMPLOYEE_INFO_FAILURE'

export function deleteEmployeeInfoResetAction () {
  return {
    type: DELETE_EMPLOYEE_INFO_RESET
  }
}

export function deleteEmployeeInfoInitialAction() {
  return {
    type: DELETE_EMPLOYEE_INFO
  }
}

export function deleteEmployeeInfoSuccessAction(payload) {
  return {
    type: DELETE_EMPLOYEE_INFO_SUCCESS,
    payload,
  }
}

export function deleteEmployeeInfoFailureAction(payload) {
  return {
    type: DELETE_EMPLOYEE_INFO_FAILURE,
    payload
  }
}

export function deleteEmployeeInfoAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteEmployeeInfoInitialAction())
      const response = await apiCall({
        method: 'delete',
        url: '/DeleteEmployeeInfo',
        data: payload
      })
      dispatch(deleteEmployeeInfoSuccessAction({}))
    } catch (error) {
      dispatch(deleteEmployeeInfoFailureAction(error))
    }
  }
}


export function deleteEmployeeInfoReducer(state = initialDeleteEmployeeInfo, action) {
  switch (action.type) {
    case DELETE_EMPLOYEE_INFO:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_EMPLOYEE_INFO_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_EMPLOYEE_INFO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_EMPLOYEE_INFO_FAILURE:
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