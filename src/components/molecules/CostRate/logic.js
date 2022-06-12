import { generateRandomString } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

/* Get costRate table data */

const initialStateCostRateTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const COST_RATE_TABLE = 'COST_RATE_TABLE'
const COST_RATE_TABLE_RESET = 'COST_RATE_TABLE_RESET'
const COST_RATE_TABLE_FLAG_RESET = 'COST_RATE_TABLE_FLAG_RESET'
const COST_RATE_TABLE_SUCCESS = 'COST_RATE_TABLE_SUCCESS'
const COST_RATE_TABLE_FAILURE = 'COST_RATE_TABLE_FAILURE'

export function costRateTableResetAction () {
  return {
    type: COST_RATE_TABLE_RESET
  }
}

export function costRateTableFlagResetAction () {
  return {
    type: COST_RATE_TABLE_FLAG_RESET
  }
}

export function costRateTableInitialAction() {
  return {
    type: COST_RATE_TABLE
  }
}

export function costRateTableSuccessAction(payload) {
  return {
    type: COST_RATE_TABLE_SUCCESS,
    payload,
  }
}

export function costRateTableFailureAction(payload) {
  return {
    type: COST_RATE_TABLE_FAILURE,
    payload
  }
}

export function costRateTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(costRateTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetCostRatesHeaderData',
        params: payload
      })
      dispatch(costRateTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(costRateTableFailureAction(error))
    }
  }
}


export function costRateTableReducer(state = initialStateCostRateTable, action) {
  switch (action.type) {
    case COST_RATE_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case COST_RATE_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case COST_RATE_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case COST_RATE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case COST_RATE_TABLE_FAILURE:
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

/* save costRate table data */

const initialStateCostRateTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_COST_RATE_TABLE = 'SAVE_COST_RATE_TABLE'
const SAVE_COST_RATE_TABLE_RESET = 'SAVE_COST_RATE_TABLE_RESET'
const SAVE_COST_RATE_TABLE_SUCCESS = 'SAVE_COST_RATE_TABLE_SUCCESS'
const SAVE_COST_RATE_TABLE_FAILURE = 'SAVE_COST_RATE_TABLE_FAILURE'

export function saveCostRateTableResetAction () {
  return {
    type: SAVE_COST_RATE_TABLE_RESET
  }
}

export function saveCostRateTableInitialAction() {
  return {
    type: SAVE_COST_RATE_TABLE
  }
}

export function saveCostRateTableSuccessAction(payload) {
  return {
    type: SAVE_COST_RATE_TABLE_SUCCESS,
    payload,
  }
}

export function saveCostRateTableFailureAction(payload) {
  return {
    type: SAVE_COST_RATE_TABLE_FAILURE,
    payload
  }
}

export function saveCostRateTableAction (payload, collectionId) {
  return async (dispatch) => {
    try {
      dispatch(saveCostRateTableInitialAction())
      await apiCall({
        method: 'post',
        url: '/InsertCostRate',
        data: payload,
        params: {
          collectionId
        }
      })
      dispatch(saveCostRateTableSuccessAction({}))
    } catch (error) {
      dispatch(saveCostRateTableFailureAction(error))
    }
  }
}


export function saveCostRateTableReducer(state = initialStateCostRateTableSave, action) {
  switch (action.type) {
    case SAVE_COST_RATE_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_COST_RATE_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_COST_RATE_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_COST_RATE_TABLE_FAILURE:
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


const initialDeleteCostRates = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const DELETE_COST_RATES = 'DELETE_COST_RATES'
const DELETE_COST_RATES_RESET = 'DELETE_COST_RATES_RESET'
const DELETE_COST_RATES_SUCCESS = 'DELETE_COST_RATES_SUCCESS'
const DELETE_COST_RATES_FAILURE = 'DELETE_COST_RATES_FAILURE'

export function deleteCostRatesResetAction () {
  return {
    type: DELETE_COST_RATES_RESET
  }
}

export function deleteCostRatesInitialAction() {
  return {
    type: DELETE_COST_RATES
  }
}

export function deleteCostRatesSuccessAction(payload) {
  return {
    type: DELETE_COST_RATES_SUCCESS,
    payload,
  }
}

export function deleteCostRatesFailureAction(payload) {
  return {
    type: DELETE_COST_RATES_FAILURE,
    payload
  }
}

export function deleteCostRatesAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteCostRatesInitialAction())
      const response = await apiCall({
        method: 'delete',
        url: '/DeleteCostRate',
        data: payload.data,
        params: payload.params
      })
      dispatch(deleteCostRatesSuccessAction({}))
    } catch (error) {
      dispatch(deleteCostRatesFailureAction(error))
    }
  }
}


export function deleteCostRatesReducer(state = initialDeleteCostRates, action) {
  switch (action.type) {
    case DELETE_COST_RATES:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_COST_RATES_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_COST_RATES_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_COST_RATES_FAILURE:
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