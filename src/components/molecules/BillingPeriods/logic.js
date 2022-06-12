import { generateRandomString, jsonStringParse } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

const temp = {
  "BILLING_PERIOD_NAME": 'E1',
  "BILLING_START_DATE": '02-Nov-2021',
  "BILL_THROUGH_DATE": '02-Nov-2021',
  "BILLING_TYPE": '',
  "ADDED_DATE": '02-Nov-2022',
  "ADDED_BY": 'KV',
  "UPDATED_DATE": '02-Nov-2022',
  "UPDATED_BY": 'KV',
}

/* Get BillingPeriods table data */

const initialStateBillingPeriodsTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BILLING_PERIODS_TABLE = 'BILLING_PERIODS_TABLE'
const BILLING_PERIODS_TABLE_RESET = 'BILLING_PERIODS_TABLE_RESET'
const BILLING_PERIODS_TABLE_FLAG_RESET = 'BILLING_PERIODS_TABLE_FLAG_RESET'
const BILLING_PERIODS_TABLE_SUCCESS = 'BILLING_PERIODS_TABLE_SUCCESS'
const BILLING_PERIODS_TABLE_FAILURE = 'BILLING_PERIODS_TABLE_FAILURE'

export function billingPeriodsTableResetAction () {
  return {
    type: BILLING_PERIODS_TABLE_RESET
  }
}

export function billingPeriodsTableFlagResetAction () {
  return {
    type: BILLING_PERIODS_TABLE_FLAG_RESET
  }
}

export function billingPeriodsTableInitialAction() {
  return {
    type: BILLING_PERIODS_TABLE
  }
}

export function billingPeriodsTableSuccessAction(payload) {
  return {
    type: BILLING_PERIODS_TABLE_SUCCESS,
    payload,
  }
}

export function billingPeriodsTableFailureAction(payload) {
  return {
    type: BILLING_PERIODS_TABLE_FAILURE,
    payload
  }
}

export function billingPeriodsTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(billingPeriodsTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBillingMainGrid',
        params: payload
      })
      dispatch(billingPeriodsTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(billingPeriodsTableFailureAction())
    }
  }
}


export function billingPeriodsTableReducer(state = initialStateBillingPeriodsTable, action) {
  switch (action.type) {
    case BILLING_PERIODS_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_PERIODS_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_PERIODS_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BILLING_PERIODS_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BILLING_PERIODS_TABLE_FAILURE:
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

/* save BillingPeriods table data */

const initialStateBillingPeriodsTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_BILLING_PERIODS_TABLE = 'SAVE_BILLING_PERIODS_TABLE'
const SAVE_BILLING_PERIODS_TABLE_RESET = 'SAVE_BILLING_PERIODS_TABLE_RESET'
const SAVE_BILLING_PERIODS_TABLE_SUCCESS = 'SAVE_BILLING_PERIODS_TABLE_SUCCESS'
const SAVE_BILLING_PERIODS_TABLE_FAILURE = 'SAVE_BILLING_PERIODS_TABLE_FAILURE'

export function saveBillingPeriodsTableResetAction () {
  return {
    type: SAVE_BILLING_PERIODS_TABLE_RESET
  }
}

export function saveBillingPeriodsTableInitialAction() {
  return {
    type: SAVE_BILLING_PERIODS_TABLE
  }
}

export function saveBillingPeriodsTableSuccessAction(payload) {
  return {
    type: SAVE_BILLING_PERIODS_TABLE_SUCCESS,
    payload,
  }
}

export function saveBillingPeriodsTableFailureAction(payload) {
  return {
    type: SAVE_BILLING_PERIODS_TABLE_FAILURE,
    payload
  }
}

export function saveBillingPeriodsTableAction (collectionId,payload) {
  return async (dispatch) => {
    try {
      dispatch(saveBillingPeriodsTableInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SavePeriodBillingData',
        params: collectionId,
        data: payload
      })
      dispatch(saveBillingPeriodsTableSuccessAction(response))
    } catch (error) {
      dispatch(saveBillingPeriodsTableFailureAction())
    }
  }
}


export function saveBillingPeriodsTableReducer(state = initialStateBillingPeriodsTableSave, action) {
  switch (action.type) {
    case SAVE_BILLING_PERIODS_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_BILLING_PERIODS_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_BILLING_PERIODS_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_BILLING_PERIODS_TABLE_FAILURE:
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




/* Get BillingFrequency table data */

const initialStateBillingFrequencyTable = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
  
  const BILLING_FREQUENCY_TABLE= 'BILLING_FREQUENCY_TABLE'
  const BILLING_FREQUENCY_TABLE_RESET = 'BILLING_FREQUENCY_TABLE_RESET'
  const BILLING_FREQUENCY_TABLE_FLAG_RESET = 'BILLING_FREQUENCY_TABLE_FLAG_RESET'
  const BILLING_FREQUENCY_TABLE_SUCCESS = 'BILLING_FREQUENCY_TABLE_SUCCESS'
  const BILLING_FREQUENCY_TABLE_FAILURE = 'BILLING_FREQUENCY_TABLE_FAILURE'
  
  export function billingFrequencyTableResetAction () {
    return {
      type: BILLING_FREQUENCY_TABLE_RESET
    }
  }
  
  export function billingFrequencyTableFlagResetAction () {
    return {
      type: BILLING_FREQUENCY_TABLE_FLAG_RESET
    }
  }
  
  export function billingFrequencyTableInitialAction() {
    return {
      type: BILLING_FREQUENCY_TABLE
    }
  }
  
  export function billingFrequencyTableSuccessAction(payload) {
    return {
      type: BILLING_FREQUENCY_TABLE_SUCCESS,
      payload,
    }
  }
  
  export function billingFrequencyTableFailureAction(payload) {
    return {
      type: BILLING_FREQUENCY_TABLE_FAILURE,
      payload
    }
  }
  
  export function billingFrequencyTableAction () {
    return async (dispatch) => {
      try {
        dispatch(billingFrequencyTableInitialAction())
        const response = await apiCall({
          method: 'get',
          url: '/GetBillingPeriodFrequency'
        })
        dispatch(billingFrequencyTableSuccessAction(response))
      } catch (error) {
        dispatch(billingFrequencyTableFailureAction())
      }
    }
  }
  
  
  export function billingFrequencyTableReducer(state = initialStateBillingFrequencyTable, action) {
    switch (action.type) {
      case BILLING_FREQUENCY_TABLE:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case BILLING_FREQUENCY_TABLE_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case BILLING_FREQUENCY_TABLE_FLAG_RESET:
        return {
          ...state,
          error: false,
          loading: false,
          flag: false,
        }
      case BILLING_FREQUENCY_TABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case BILLING_FREQUENCY_TABLE_FAILURE:
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


  
/* Get billingThroughDate table data */

const initialStateBillingThroughDateTable = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
  
  const BILLING_THROUGH_DATE_TABLE= 'BILLING_THROUGH_DATE_TABLE'
  const BILLING_THROUGH_DATE_TABLE_RESET = 'BILLING_THROUGH_DATE_TABLE_RESET'
  const BILLING_THROUGH_DATE_TABLE_FLAG_RESET = 'BILLING_THROUGH_DATE_TABLE_FLAG_RESET'
  const BILLING_THROUGH_DATE_TABLE_SUCCESS = 'BILLING_THROUGH_DATE_TABLE_SUCCESS'
  const BILLING_THROUGH_DATE_TABLE_FAILURE = 'BILLING_THROUGH_DATE_TABLE_FAILURE'
  
  export function billingThroughDateTableResetAction () {
    return {
      type: BILLING_THROUGH_DATE_TABLE_RESET
    }
  }
  
  export function billingThroughDateTableFlagResetAction () {
    return {
      type: BILLING_THROUGH_DATE_TABLE_FLAG_RESET
    }
  }
  
  export function billingThroughDateTableInitialAction() {
    return {
      type: BILLING_THROUGH_DATE_TABLE
    }
  }
  
  export function billingThroughDateTableSuccessAction(payload) {
    return {
      type: BILLING_THROUGH_DATE_TABLE_SUCCESS,
      payload,
    }
  }
  
  export function billingThroughDateTableFailureAction(payload) {
    return {
      type: BILLING_THROUGH_DATE_TABLE_FAILURE,
      payload
    }
  }
  
  export function billingThroughDateTableAction (payload) {
    return async (dispatch) => {
      try {
        dispatch(billingThroughDateTableInitialAction())
        const response = await apiCall({
          method: 'get',
          url: '/GetBillingPeriodBillThrough',
          params: payload
        })
        dispatch(billingThroughDateTableSuccessAction(response))
      } catch (error) {
        dispatch(billingThroughDateTableFailureAction())
      }
    }
  }
  
  
  export function billingThroughDateTableReducer(state = initialStateBillingThroughDateTable, action) {
    switch (action.type) {
      case BILLING_THROUGH_DATE_TABLE:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case BILLING_THROUGH_DATE_TABLE_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case BILLING_THROUGH_DATE_TABLE_FLAG_RESET:
        return {
          ...state,
          error: false,
          loading: false,
          flag: false,
        }
      case BILLING_THROUGH_DATE_TABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case BILLING_THROUGH_DATE_TABLE_FAILURE:
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


  
/* Get billingThroughJacobsDate data */

const initialStateBillingThroughDateJacobs = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BILLING_THROUGH_DATE_JACOBS= 'BILLING_THROUGH_DATE_JACOBS'
const BILLING_THROUGH_DATE_JACOBS_RESET = 'BILLING_THROUGH_DATE_JACOBS_RESET'
const BILLING_THROUGH_DATE_JACOBS_FLAG_RESET = 'BILLING_THROUGH_DATE_JACOBS_FLAG_RESET'
const BILLING_THROUGH_DATE_JACOBS_SUCCESS = 'BILLING_THROUGH_DATE_JACOBS_SUCCESS'
const BILLING_THROUGH_DATE_JACOBS_FAILURE = 'BILLING_THROUGH_DATE_JACOBS_FAILURE'

export function billingThroughDateJacobsResetAction () {
  return {
    type: BILLING_THROUGH_DATE_JACOBS_RESET
  }
}

export function billingThroughDateJacobsFlagResetAction () {
  return {
    type: BILLING_THROUGH_DATE_JACOBS_FLAG_RESET
  }
}

export function billingThroughDateJacobsInitialAction() {
  return {
    type: BILLING_THROUGH_DATE_JACOBS
  }
}

export function billingThroughDateJacobsSuccessAction(payload) {
  return {
    type: BILLING_THROUGH_DATE_JACOBS_SUCCESS,
    payload,
  }
}

export function billingThroughDateJacobsFailureAction(payload) {
  return {
    type: BILLING_THROUGH_DATE_JACOBS_FAILURE,
    payload
  }
}

export function billingThroughDateJacobsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(billingThroughDateJacobsInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetJacobsCalenderDates',
        params: payload
      })
      dispatch(billingThroughDateJacobsSuccessAction(response))
    } catch (error) {
      dispatch(billingThroughDateJacobsFailureAction())
    }
  }
}


export function billingThroughDateJacobsReducer(state = initialStateBillingThroughDateJacobs, action) {
  switch (action.type) {
    case BILLING_THROUGH_DATE_JACOBS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_THROUGH_DATE_JACOBS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_THROUGH_DATE_JACOBS_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BILLING_THROUGH_DATE_JACOBS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BILLING_THROUGH_DATE_JACOBS_FAILURE:
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
  

 
/* Get billingGridDelete data */

const initialStateBillingGridDelete = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BILLING_GRID_DELETE = 'BILLING_GRID_DELETE'
const BILLING_GRID_DELETE_RESET = 'BILLING_GRID_DELETE_RESET'
const BILLING_GRID_DELETE_FLAG = 'BILLING_GRID_DELETE_FLAG'
const BILLING_GRID_DELETE_SUCCESS = 'BILLING_GRID_DELETE_SUCCESS'
const BILLING_GRID_DELETE_FAILURE = 'BILLING_GRID_DELETE_FAILURE'

export function billingGridDeleteResetAction () {
  return {
    type: BILLING_GRID_DELETE_RESET
  }
}

export function billingGridDeleteFlagAction () {
  return {
    type: BILLING_GRID_DELETE_FLAG
  }
}

export function billingGridDeleteInitialAction() {
  return {
    type: BILLING_GRID_DELETE
  }
}

export function billingGridDeleteSuccessAction(payload) {
  return {
    type: BILLING_GRID_DELETE_SUCCESS,
    payload,
  }
}

export function billingGridDeleteFailureAction(payload) {
  return {
    type: BILLING_GRID_DELETE_FAILURE,
    payload
  }
}


export function billingGridDeleteJacobsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(billingGridDeleteInitialAction())
      const response = await apiCall({
        method: 'delete',
        url: '/DeleteBillingPeriodsData',
        params: payload
      })
      dispatch(billingGridDeleteSuccessAction(response))
    } catch (error) {
    dispatch(billingGridDeleteFailureAction())
    }
  }
}


export function billingGridDeleteReducer(state = initialStateBillingGridDelete, action) {
  switch (action.type) {
    case BILLING_GRID_DELETE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_GRID_DELETE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BILLING_GRID_DELETE_FLAG:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BILLING_GRID_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BILLING_GRID_DELETE_FAILURE:
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
  