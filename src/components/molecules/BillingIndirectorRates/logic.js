import { generateRandomString, jsonStringParse } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

const temp = {
  "EMPLOYEE_NAME": generateRandomString(),
  "BILLING_TITLE_CODE": 'E1',
  "BILLING_TITLE_DESC": 'This is E1',
  "CLIENT_BILLING_RATE": 51.27,
  "CAPPED_RATE": 50.27,
  "MINIMUM_RATE": 53.27,
  "CURRENCY": 'USD',
  "EFFECTIVE_DATE": '02-Nov-2021',
  "END_DATE": '02-Nov-2022',
  "ADDED_DATE": '02-Nov-2022',
  "ADDED_BY": 'KV',
  "UPDATED_DATE": '02-Nov-2022',
  "UPDATED_BY": 'KV',
  "FLAG_IS": 'N'
}

/* Get employeeOverride table data */

const initialStateIndirectRatesTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const INDIRECT_RATES_TABLE = 'INDIRECT_RATES_TABLE'
const INDIRECT_RATES_TABLE_RESET = 'INDIRECT_RATES_TABLE_RESET'
const INDIRECT_RATES_TABLE_FLAG_RESET = 'INDIRECT_RATES_TABLE_FLAG_RESET'
const INDIRECT_RATES_TABLE_SUCCESS = 'INDIRECT_RATES_TABLE_SUCCESS'
const INDIRECT_RATES_TABLE_FAILURE = 'INDIRECT_RATES_TABLE_FAILURE'

export function indirectRatesTableResetAction () {
  return {
    type: INDIRECT_RATES_TABLE_RESET
  }
}

export function indirectRatesTableFlagResetAction () {
  return {
    type: INDIRECT_RATES_TABLE_FLAG_RESET
  }
}

export function indirectRatesTableInitialAction() {
  return {
    type: INDIRECT_RATES_TABLE
  }
}

export function indirectRatesTableSuccessAction(payload) {
  return {
    type: INDIRECT_RATES_TABLE_SUCCESS,
    payload,
  }
}

export function indirectRatesTableFailureAction(payload) {
  return {
    type: INDIRECT_RATES_TABLE_FAILURE,
    payload
  }
}

export function indirectRatesTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(indirectRatesTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetIndirectRateMainGrid',
        params: payload
      })
      dispatch(indirectRatesTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(indirectRatesTableFailureAction(error))
    }
  }
}


export function indirectRatesTableReducer(state = initialStateIndirectRatesTable, action) {
  switch (action.type) {
    case INDIRECT_RATES_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case INDIRECT_RATES_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case INDIRECT_RATES_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case INDIRECT_RATES_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case INDIRECT_RATES_TABLE_FAILURE:
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

/* save indirectRates table data */

const initialStateIndirectRatesTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_INDIRECT_RATES_TABLE = 'SAVE_INDIRECT_RATES_TABLE'
const SAVE_INDIRECT_RATES_TABLE_RESET = 'SAVE_INDIRECT_RATES_TABLE_RESET'
const SAVE_INDIRECT_RATES_TABLE_SUCCESS = 'SAVE_INDIRECT_RATES_TABLE_SUCCESS'
const SAVE_INDIRECT_RATES_TABLE_FAILURE = 'SAVE_INDIRECT_RATES_TABLE_FAILURE'

export function saveIndirectRatesTableResetAction () {
  return {
    type: SAVE_INDIRECT_RATES_TABLE_RESET
  }
}

export function saveIndirectRatesTableInitialAction() {
  return {
    type: SAVE_INDIRECT_RATES_TABLE
  }
}

export function saveIndirectRatesTableSuccessAction(payload) {
  return {
    type: SAVE_INDIRECT_RATES_TABLE_SUCCESS,
    payload,
  }
}

export function saveIndirectRatesTableFailureAction(payload) {
  return {
    type: SAVE_INDIRECT_RATES_TABLE_FAILURE,
    payload
  }
}

export function saveIndirectRatesTableAction (payload,collectionId) {
  return async (dispatch) => {
    try {
      dispatch(saveIndirectRatesTableInitialAction())

        await apiCall({
          method: 'post',
          url: '/SaveIndirectRates',
          params:{collectionId: collectionId},
          data: payload
        })
      dispatch(saveIndirectRatesTableSuccessAction({}))
    } catch (error) {
      dispatch(saveIndirectRatesTableFailureAction(error))
    }
  }
}


export function saveIndirectRatesTableReducer(state = initialStateIndirectRatesTableSave, action) {
  switch (action.type) {
    case SAVE_INDIRECT_RATES_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_INDIRECT_RATES_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_INDIRECT_RATES_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_INDIRECT_RATES_TABLE_FAILURE:
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


/* get search Employee Data options */

const initialStateSearchEmployeeId = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const SEARCH_EMPLOYEE_ID = 'SEARCH_EMPLOYEE_ID'
const SEARCH_EMPLOYEE_ID_RESET = 'SEARCH_EMPLOYEE_ID_RESET'
const SEARCH_EMPLOYEE_ID_FLAG_RESET = 'SEARCH_EMPLOYEE_ID_FLAG_RESET'
const SEARCH_EMPLOYEE_ID_SUCCESS = 'SEARCH_EMPLOYEE_ID_SUCCESS'
const SEARCH_EMPLOYEE_ID_FAILURE = 'SEARCH_EMPLOYEE_ID_FAILURE'

export function searchEmployeeIdResetAction () {
  return {
    type: SEARCH_EMPLOYEE_ID_RESET
  }
}

export function searchEmployeeIdFlagResetAction () {
  return {
    type: SEARCH_EMPLOYEE_ID_FLAG_RESET
  }
}

export function searchEmployeeIdInitialAction() {
  return {
    type: SEARCH_EMPLOYEE_ID
  }
}

export function searchEmployeeIdSuccessAction(payload) {
  return {
    type: SEARCH_EMPLOYEE_ID_SUCCESS,
    payload,
  }
}

export function searchEmployeeIdFailureAction(payload) {
  return {
    type: SEARCH_EMPLOYEE_ID_FAILURE,
    payload
  }
}

export function searchEmployeeIdAction (payload = {}) {
  return async (dispatch) => {
    try {
      dispatch(searchEmployeeIdInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetEmployeeDetails',
        params: payload
      })
      dispatch(searchEmployeeIdSuccessAction(response))
    } catch (error) {
      dispatch(searchEmployeeIdFailureAction(error))
    }
  }
}


export function searchEmployeeIdReducer(state = initialStateSearchEmployeeId, action) {
  switch (action.type) {
    case SEARCH_EMPLOYEE_ID:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SEARCH_EMPLOYEE_ID_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case SEARCH_EMPLOYEE_ID_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case SEARCH_EMPLOYEE_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SEARCH_EMPLOYEE_ID_FAILURE:
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


/* get /api/GetEmployeeRateGroup  options */

const initialStateEmployeeGroup = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_EMPLOYEE_RATE_GROUP = 'GET_EMPLOYEE_RATE_GROUP'
const GET_EMPLOYEE_RATE_GROUP_RESET = 'GET_EMPLOYEE_RATE_GROUP_RESET'
const GET_EMPLOYEE_RATE_GROUP_FLAG_RESET = 'GET_EMPLOYEE_RATE_GROUP_FLAG_RESET'
const GET_EMPLOYEE_RATE_GROUP_SUCCESS = 'GET_EMPLOYEE_RATE_GROUP_SUCCESS'
const GET_EMPLOYEE_RATE_GROUP_FAILURE = 'GET_EMPLOYEE_RATE_GROUP_FAILURE'

export function getEmployeeRateGroupResetAction () {
  return {
    type: GET_EMPLOYEE_RATE_GROUP_RESET
  }
}

export function getEmployeeRateGroupFlagResetAction () {
  return {
    type: GET_EMPLOYEE_RATE_GROUP_FLAG_RESET
  }
}

export function getEmployeeRateGroupInitialAction() {
  return {
    type: GET_EMPLOYEE_RATE_GROUP
  }
}

export function getEmployeeRateGroupSuccessAction(payload) {
  return {
    type: GET_EMPLOYEE_RATE_GROUP_SUCCESS,
    payload,
  }
}

export function getEmployeeRateGroupFailureAction(payload) {
  return {
    type: GET_EMPLOYEE_RATE_GROUP_FAILURE,
    payload
  }
}

export function getEmployeeRateGroupAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getEmployeeRateGroupInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetEmployeeRateGroup',
        params: payload
      })
      dispatch(getEmployeeRateGroupSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(getEmployeeRateGroupFailureAction(error))
    }
  }
}


export function getEmployeeRateGroupReducer(state = initialStateEmployeeGroup, action) {
  switch (action.type) {
    case GET_EMPLOYEE_RATE_GROUP:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_EMPLOYEE_RATE_GROUP_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_EMPLOYEE_RATE_GROUP_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_EMPLOYEE_RATE_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_EMPLOYEE_RATE_GROUP_FAILURE:
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

const initialStateEmployeeOverrideSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_EMPLOYEE_OVERRIDE = 'SAVE_EMPLOYEE_OVERRIDE'
const SAVE_EMPLOYEE_OVERRIDE_RESET = 'SAVE_EMPLOYEE_OVERRIDE_RESET'
const SAVE_EMPLOYEE_OVERRIDE_SUCCESS = 'SAVE_EMPLOYEE_OVERRIDE_SUCCESS'
const SAVE_EMPLOYEE_OVERRIDE_FAILURE = 'SAVE_EMPLOYEE_OVERRIDE_FAILURE'

export function saveEmployeeOverrideResetAction () {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE_RESET
  }
}

export function saveEmployeeOverrideInitialAction() {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE
  }
}

export function saveEmployeeOverrideSuccessAction(payload) {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE_SUCCESS,
    payload,
  }
}

export function saveEmployeeOverrideFailureAction(payload) {
  return {
    type: SAVE_EMPLOYEE_OVERRIDE_FAILURE,
    payload
  }
}

export function saveEmployeeOverrideAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveEmployeeOverrideInitialAction())
      const { U, I } = payload
      if (U.groupData?.length) {
        await apiCall({
          method: 'put',
          url: '/UpdateEmployeeRateGroupOverride',
          data: payload.U
        })
      }
      if (I.groupData?.length) {
        await apiCall({
          method: 'post',
          url: '/InsertEmployeeRateGroupOverride',
          data: payload.I
        })
      }
      dispatch(saveEmployeeOverrideSuccessAction({}))
    } catch (error) {
      dispatch(saveEmployeeOverrideFailureAction(error))
    }
  }
}


export function saveEmployeeOverrideReducer(state = initialStateEmployeeOverrideSave, action) {
  switch (action.type) {
    case SAVE_EMPLOYEE_OVERRIDE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_EMPLOYEE_OVERRIDE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_EMPLOYEE_OVERRIDE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_EMPLOYEE_OVERRIDE_FAILURE:
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
