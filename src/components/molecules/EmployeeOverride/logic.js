import { generateRandomString } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

/* Get employeeOverride table data */

const initialStateEmployeeOverrideTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const EMPLOYEE_OVERRIDE_TABLE = 'EMPLOYEE_OVERRIDE_TABLE'
const EMPLOYEE_OVERRIDE_TABLE_RESET = 'EMPLOYEE_OVERRIDE_TABLE_RESET'
const EMPLOYEE_OVERRIDE_TABLE_FLAG_RESET = 'EMPLOYEE_OVERRIDE_TABLE_FLAG_RESET'
const EMPLOYEE_OVERRIDE_TABLE_SUCCESS = 'EMPLOYEE_OVERRIDE_TABLE_SUCCESS'
const EMPLOYEE_OVERRIDE_TABLE_FAILURE = 'EMPLOYEE_OVERRIDE_TABLE_FAILURE'

export function employeeOverrideTableResetAction () {
  return {
    type: EMPLOYEE_OVERRIDE_TABLE_RESET
  }
}

export function employeeOverrideTableFlagResetAction () {
  return {
    type: EMPLOYEE_OVERRIDE_TABLE_FLAG_RESET
  }
}

export function employeeOverrideTableInitialAction() {
  return {
    type: EMPLOYEE_OVERRIDE_TABLE
  }
}

export function employeeOverrideTableSuccessAction(payload) {
  return {
    type: EMPLOYEE_OVERRIDE_TABLE_SUCCESS,
    payload,
  }
}

export function employeeOverrideTableFailureAction(payload) {
  return {
    type: EMPLOYEE_OVERRIDE_TABLE_FAILURE,
    payload
  }
}

export function employeeOverrideTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(employeeOverrideTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetEmployeeOverrideHeaderData',
        params: payload
      })
      dispatch(employeeOverrideTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(employeeOverrideTableFailureAction(error))
    }
  }
}


export function employeeOverrideTableReducer(state = initialStateEmployeeOverrideTable, action) {
  switch (action.type) {
    case EMPLOYEE_OVERRIDE_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_OVERRIDE_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_OVERRIDE_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case EMPLOYEE_OVERRIDE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case EMPLOYEE_OVERRIDE_TABLE_FAILURE:
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

/* save employeeOverride table data */

const initialStateEmployeeOverrideTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_EMPLOYEE_OVERRIDE_TABLE = 'SAVE_EMPLOYEE_OVERRIDE_TABLE'
const SAVE_EMPLOYEE_OVERRIDE_TABLE_RESET = 'SAVE_EMPLOYEE_OVERRIDE_TABLE_RESET'
const SAVE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS = 'SAVE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS'
const SAVE_EMPLOYEE_OVERRIDE_TABLE_FAILURE = 'SAVE_EMPLOYEE_OVERRIDE_TABLE_FAILURE'

export function saveEmployeeOverrideTableResetAction () {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE_TABLE_RESET
  }
}

export function saveEmployeeOverrideTableInitialAction() {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE_TABLE
  }
}

export function saveEmployeeOverrideTableSuccessAction(payload) {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS,
    payload,
    message: 'Employee Overrides table updated successfully.',
    showNotification: true
  }
}

export function saveEmployeeOverrideTableFailureAction(payload) {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE_TABLE_FAILURE,
    payload
  }
}

export function saveEmployeeOverrideTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveEmployeeOverrideTableInitialAction())
      const { U, I } = payload
      if (U.EmployeeList?.length) {
        await apiCall({
          method: 'put',
          url: '/UpdateEmployeeOverride',
          data: payload.U
        })
      }
      if (I.EmployeeList?.length) {
        await apiCall({
          method: 'post',
          url: '/InsertEmployeeOverride',
          data: payload.I
        })
      }
      dispatch(saveEmployeeOverrideTableSuccessAction({}))
    } catch (error) {
      dispatch(saveEmployeeOverrideTableFailureAction(error))
    }
  }
}


export function saveEmployeeOverrideTableReducer(state = initialStateEmployeeOverrideTableSave, action) {
  switch (action.type) {
    case SAVE_EMPLOYEE_OVERRIDE_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_EMPLOYEE_OVERRIDE_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_EMPLOYEE_OVERRIDE_TABLE_FAILURE:
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

const EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN = 'EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN'
const EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_RESET = 'EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_RESET'
const EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FLAG_RESET = 'EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FLAG_RESET'
const EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_SUCCESS = 'EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_SUCCESS'
const EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FAILURE = 'EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FAILURE'

export function employeeOverrideBillingTitleDropdownResetAction () {
  return {
    type: EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_RESET
  }
}

export function employeeOverrideBillingTitleDropdownFlagResetAction () {
  return {
    type: EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FLAG_RESET
  }
}

export function employeeOverrideBillingTitleDropdownInitialAction() {
  return {
    type: EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN
  }
}

export function employeeOverrideBillingTitleDropdownSuccessAction(payload) {
  return {
    type: EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_SUCCESS,
    payload,
  }
}

export function employeeOverrideBillingTitleDropdownFailureAction(payload) {
  return {
    type: EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FAILURE,
    payload
  }
}

export function employeeOverrideBillingTitleDropdownAction (payload = {}) {
  return async (dispatch) => {
    try {
      dispatch(employeeOverrideBillingTitleDropdownInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBillingTitleCode',
        params: payload
      })
      dispatch(employeeOverrideBillingTitleDropdownSuccessAction(response.map(d => ({ id: d.BTR_ID, description: d.BILLING_TITLE_CODE }))))
    } catch (error) {
      dispatch(employeeOverrideBillingTitleDropdownFailureAction(error))
    }
  }
}


export function employeeOverrideBillingTitleDropdownReducer(state = initialStateBillingTitleDropdown, action) {
  switch (action.type) {
    case EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case EMPLOYEE_OVERRIDE_BILLING_TITLE_DROPDOWN_FAILURE:
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


/* get Level dropdown options */

const initialStateLevelDropdown = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN = 'EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN'
const EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_RESET = 'EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_RESET'
const EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FLAG_RESET = 'EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FLAG_RESET'
const EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_SUCCESS = 'EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_SUCCESS'
const EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FAILURE = 'EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FAILURE'

export function employeeOverrideLevelDropdownResetAction () {
  return {
    type: EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_RESET
  }
}

export function employeeOverrideLevelDropdownFlagResetAction () {
  return {
    type: EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FLAG_RESET
  }
}

export function employeeOverrideLevelDropdownInitialAction() {
  return {
    type: EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN
  }
}

export function employeeOverrideLevelDropdownSuccessAction(payload) {
  return {
    type: EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_SUCCESS,
    payload,
  }
}

export function employeeOverrideLevelDropdownFailureAction(payload) {
  return {
    type: EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FAILURE,
    payload
  }
}

export function employeeOverrideLevelDropdownAction () {
  return async (dispatch) => {
    try {
      dispatch(employeeOverrideLevelDropdownInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBillingLevel'
      })
      dispatch(employeeOverrideLevelDropdownSuccessAction(response.map(d => ({ id: d.SEQ_NUM, description: d.LEVEL }))))
    } catch (error) {
      dispatch(employeeOverrideLevelDropdownFailureAction(error))
    }
  }
}


export function employeeOverrideLevelDropdownReducer(state = initialStateLevelDropdown, action) {
  switch (action.type) {
    case EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case EMPLOYEE_OVERRIDE_LEVEL_DROPDOWN_FAILURE:
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


/* Get search Employees */

const initialStateSearchEmployee = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const SEARCH_EMPLOYEES = 'SEARCH_EMPLOYEES'
const SEARCH_EMPLOYEES_RESET = 'SEARCH_EMPLOYEES_RESET'
const SEARCH_EMPLOYEES_FLAG_RESET = 'SEARCH_EMPLOYEES_FLAG_RESET'
const SEARCH_EMPLOYEES_SUCCESS = 'SEARCH_EMPLOYEES_SUCCESS'
const SEARCH_EMPLOYEES_FAILURE = 'SEARCH_EMPLOYEES_FAILURE'

export function searchEmployeesResetAction () {
  return {
    type: SEARCH_EMPLOYEES_RESET
  }
}

export function searchEmployeesFlagResetAction () {
  return {
    type: SEARCH_EMPLOYEES_FLAG_RESET
  }
}

export function searchEmployeesInitialAction() {
  return {
    type: SEARCH_EMPLOYEES
  }
}

export function searchEmployeesSuccessAction(payload) {
  return {
    type: SEARCH_EMPLOYEES_SUCCESS,
    payload,
  }
}

export function searchEmployeesFailureAction(payload) {
  return {
    type: SEARCH_EMPLOYEES_FAILURE,
    payload
  }
}

export function searchEmployeesAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(searchEmployeesInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetEmployeeList',
        // url: '/GetContractAdministartorDetails',
        params: payload
      })
      dispatch(searchEmployeesSuccessAction(response))
    } catch (error) {
      dispatch(searchEmployeesFailureAction(error))
    }
  }
}


export function searchEmployeesReducer(state = initialStateSearchEmployee, action) {
  switch (action.type) {
    case SEARCH_EMPLOYEES:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SEARCH_EMPLOYEES_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case SEARCH_EMPLOYEES_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case SEARCH_EMPLOYEES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SEARCH_EMPLOYEES_FAILURE:
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

/* delete employeeOverride table data */

const initialStateEmployeeOverrideTableDelete = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const DELETE_EMPLOYEE_OVERRIDE_TABLE = 'DELETE_EMPLOYEE_OVERRIDE_TABLE'
const DELETE_EMPLOYEE_OVERRIDE_TABLE_RESET = 'DELETE_EMPLOYEE_OVERRIDE_TABLE_RESET'
const DELETE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS = 'DELETE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS'
const DELETE_EMPLOYEE_OVERRIDE_TABLE_FAILURE = 'DELETE_EMPLOYEE_OVERRIDE_TABLE_FAILURE'

export function deleteEmployeeOverrideTableResetAction () {
  return {
    type: DELETE_EMPLOYEE_OVERRIDE_TABLE_RESET
  }
}

export function deleteEmployeeOverrideTableInitialAction() {
  return {
    type: DELETE_EMPLOYEE_OVERRIDE_TABLE
  }
}

export function deleteEmployeeOverrideTableSuccessAction(payload) {
  return {
    type: DELETE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS,
    payload,
    message: "The selected record's deleted successfully.",
    showNotification: true
  }
}

export function deleteEmployeeOverrideTableFailureAction(payload) {
  return {
    type: DELETE_EMPLOYEE_OVERRIDE_TABLE_FAILURE,
    payload
  }
}

export function deleteEmployeeOverrideTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteEmployeeOverrideTableInitialAction())
      await apiCall({
        method: 'DELETE',
        url: '/DeleteEmployeeOverride',
        params: payload
      })
      dispatch(deleteEmployeeOverrideTableSuccessAction({}))
    } catch (error) {
      dispatch(deleteEmployeeOverrideTableFailureAction(error))
    }
  }
}


export function deleteEmployeeOverrideTableReducer(state = initialStateEmployeeOverrideTableDelete, action) {
  switch (action.type) {
    case DELETE_EMPLOYEE_OVERRIDE_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_EMPLOYEE_OVERRIDE_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_EMPLOYEE_OVERRIDE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_EMPLOYEE_OVERRIDE_TABLE_FAILURE:
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