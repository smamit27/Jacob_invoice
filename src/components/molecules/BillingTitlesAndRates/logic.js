import { generateRandomString, jsonStringParse } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

/* Get billingTitlesAndRates table data */

const initialStateBillingTitlesAndRatesTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BILLING_TITLES_AND_RATES_TABLE = 'BILLING_TITLES_AND_RATES_TABLE'
const BILLING_TITLES_AND_RATES_TABLE_RESET = 'BILLING_TITLES_AND_RATES_TABLE_RESET'
const BILLING_TITLES_AND_RATES_TABLE_FLAG_RESET = 'BILLING_TITLES_AND_RATES_TABLE_FLAG_RESET'
const BILLING_TITLES_AND_RATES_TABLE_SUCCESS = 'BILLING_TITLES_AND_RATES_TABLE_SUCCESS'
const BILLING_TITLES_AND_RATES_TABLE_FAILURE = 'BILLING_TITLES_AND_RATES_TABLE_FAILURE'

export function billingTitlesAndRatesTableResetAction () {
  return {
    type: BILLING_TITLES_AND_RATES_TABLE_RESET
  }
}

export function billingTitlesAndRatesTableFlagResetAction () {
  return {
    type: BILLING_TITLES_AND_RATES_TABLE_FLAG_RESET
  }
}

export function billingTitlesAndRatesTableInitialAction() {
  return {
    type: BILLING_TITLES_AND_RATES_TABLE
  }
}

export function billingTitlesAndRatesTableSuccessAction(payload) {
  return {
    type: BILLING_TITLES_AND_RATES_TABLE_SUCCESS,
    payload,
  }
}

export function billingTitlesAndRatesTableFailureAction(payload) {
  return {
    type: BILLING_TITLES_AND_RATES_TABLE_FAILURE,
    payload
  }
}

export function billingTitlesAndRatesTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(billingTitlesAndRatesTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBillingHeaderData',
        params: payload
      })
      dispatch(billingTitlesAndRatesTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(billingTitlesAndRatesTableFailureAction(error))
    }
  }
}


export function billingTitlesAndRatesTableReducer(state = initialStateBillingTitlesAndRatesTable, action) {
  switch (action.type) {
    case BILLING_TITLES_AND_RATES_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_TITLES_AND_RATES_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_TITLES_AND_RATES_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BILLING_TITLES_AND_RATES_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BILLING_TITLES_AND_RATES_TABLE_FAILURE:
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

/* save billingTitlesAndRates table data */

const initialStateBillingTitlesAndRatesTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_BILLING_TITLES_AND_RATES_TABLE = 'SAVE_BILLING_TITLES_AND_RATES_TABLE'
const SAVE_BILLING_TITLES_AND_RATES_TABLE_RESET = 'SAVE_BILLING_TITLES_AND_RATES_TABLE_RESET'
const SAVE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS = 'SAVE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS'
const SAVE_BILLING_TITLES_AND_RATES_TABLE_FAILURE = 'SAVE_BILLING_TITLES_AND_RATES_TABLE_FAILURE'

export function saveBillingTitlesAndRatesTableResetAction () {
  return {
    type: SAVE_BILLING_TITLES_AND_RATES_TABLE_RESET
  }
}

export function saveBillingTitlesAndRatesTableInitialAction() {
  return {
    type: SAVE_BILLING_TITLES_AND_RATES_TABLE
  }
}

export function saveBillingTitlesAndRatesTableSuccessAction(payload) {
  return {
    type: SAVE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS,
    payload,
    message: 'Billing Titles and Rates table updated successfully.',
    showNotification: true
  }
}

export function saveBillingTitlesAndRatesTableFailureAction(payload) {
  return {
    type: SAVE_BILLING_TITLES_AND_RATES_TABLE_FAILURE,
    payload
  }
}

export function saveBillingTitlesAndRatesTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveBillingTitlesAndRatesTableInitialAction())
      const { U, I } = payload
      if (U.billingData?.length) {
        await apiCall({
          method: 'put',
          url: '/UpdateBillingTitleRates',
          data: payload.U
        })
      }
      if (I.billingData?.length) {
        await apiCall({
          method: 'post',
          url: '/InsertBillingTitleRates',
          data: payload.I
        })
      }
      dispatch(saveBillingTitlesAndRatesTableSuccessAction({}))
    } catch (error) {
      dispatch(saveBillingTitlesAndRatesTableFailureAction(error))
    }
  }
}


export function saveBillingTitlesAndRatesTableReducer(state = initialStateBillingTitlesAndRatesTableSave, action) {
  switch (action.type) {
    case SAVE_BILLING_TITLES_AND_RATES_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_BILLING_TITLES_AND_RATES_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_BILLING_TITLES_AND_RATES_TABLE_FAILURE:
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

/* delete billingTitlesAndRates table data */

const initialStateBillingTitlesAndRatesTableDelete = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const DELETE_BILLING_TITLES_AND_RATES_TABLE = 'DELETE_BILLING_TITLES_AND_RATES_TABLE'
const DELETE_BILLING_TITLES_AND_RATES_TABLE_RESET = 'DELETE_BILLING_TITLES_AND_RATES_TABLE_RESET'
const DELETE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS = 'DELETE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS'
const DELETE_BILLING_TITLES_AND_RATES_TABLE_FAILURE = 'DELETE_BILLING_TITLES_AND_RATES_TABLE_FAILURE'

export function deleteBillingTitlesAndRatesTableResetAction () {
  return {
    type: DELETE_BILLING_TITLES_AND_RATES_TABLE_RESET
  }
}

export function deleteBillingTitlesAndRatesTableInitialAction() {
  return {
    type: DELETE_BILLING_TITLES_AND_RATES_TABLE
  }
}

export function deleteBillingTitlesAndRatesTableSuccessAction(payload) {
  return {
    type: DELETE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS,
    payload,
    message: "The selected record's deleted successfully.",
    showNotification: true
  }
}

export function deleteBillingTitlesAndRatesTableFailureAction(payload) {
  return {
    type: DELETE_BILLING_TITLES_AND_RATES_TABLE_FAILURE,
    payload
  }
}

export function deleteBillingTitlesAndRatesTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteBillingTitlesAndRatesTableInitialAction())
      await apiCall({
        method: 'DELETE',
        url: '/DeleteBillingHeaderData',
        params: payload
      })
      dispatch(deleteBillingTitlesAndRatesTableSuccessAction({}))
    } catch (error) {
      dispatch(deleteBillingTitlesAndRatesTableFailureAction(error))
    }
  }
}


export function deleteBillingTitlesAndRatesTableReducer(state = initialStateBillingTitlesAndRatesTableDelete, action) {
  switch (action.type) {
    case DELETE_BILLING_TITLES_AND_RATES_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_BILLING_TITLES_AND_RATES_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_BILLING_TITLES_AND_RATES_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_BILLING_TITLES_AND_RATES_TABLE_FAILURE:
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
