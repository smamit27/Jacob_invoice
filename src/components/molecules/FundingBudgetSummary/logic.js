import { apiCall } from "../../../services/httpService"
import { generateRandomString } from "../../../helpers"

const FUNDING_BUDGET_SUMMARY_MODAL_OPEN = 'FUNDING_BUDGET_SUMMARY_MODAL_OPEN'
const FUNDING_BUDGET_SUMMARY_MODAL_CLOSE = 'FUNDING_BUDGET_SUMMARY_MODAL_CLOSE'

const initialStateFundingBudgetSummaryModal = {
  open: false,
  data: {}
}

export function fundingBudgetSummaryModalOpenAction (payload = {}) {
  return {
    type: FUNDING_BUDGET_SUMMARY_MODAL_OPEN,
    payload
  }
}

export function fundingBudgetSummaryModalCloseAction () {
  return {
    type: FUNDING_BUDGET_SUMMARY_MODAL_CLOSE,
  }
}


export function fundingBudgetSummaryModalReducer (state = initialStateFundingBudgetSummaryModal, action) {
  switch (action.type) {
    case FUNDING_BUDGET_SUMMARY_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case FUNDING_BUDGET_SUMMARY_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* Get allocate to task list */

const initialStateGetFundingBudgetSummaryTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_FUNDING_BUDGET_SUMMARY_TABLE = 'GET_FUNDING_BUDGET_SUMMARY_TABLE'
const GET_FUNDING_BUDGET_SUMMARY_TABLE_RESET = 'GET_FUNDING_BUDGET_SUMMARY_TABLE_RESET'
const GET_FUNDING_BUDGET_SUMMARY_TABLE_FLAG_RESET = 'GET_FUNDING_BUDGET_SUMMARY_TABLE_FLAG_RESET'
const GET_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS = 'GET_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS'
const GET_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE = 'GET_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE'

export function getFundingBudgetSummaryTableResetAction () {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TABLE_RESET
  }
}

export function getFundingBudgetSummaryTableFlagResetAction () {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TABLE_FLAG_RESET
  }
}

export function getFundingBudgetSummaryTableInitialAction() {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TABLE
  }
}

export function getFundingBudgetSummaryTableSuccessAction(payload) {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS,
    payload,
  }
}

export function getFundingBudgetSummaryTableFailureAction(payload) {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE,
    payload
  }
}

export function getFundingBudgetSummaryTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getFundingBudgetSummaryTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: payload.url,
        params: payload.params
      })
      dispatch(getFundingBudgetSummaryTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString() }))))
    } catch (error) {
      dispatch(getFundingBudgetSummaryTableFailureAction(error))
    }
  }
}


export function getFundingBudgetSummaryTableReducer(state = initialStateGetFundingBudgetSummaryTable, action) {
  switch (action.type) {
    case GET_FUNDING_BUDGET_SUMMARY_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_FUNDING_BUDGET_SUMMARY_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_FUNDING_BUDGET_SUMMARY_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE:
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

/* save funding budget summary table data */

const initialStateSummaryTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_FUNDING_BUDGET_SUMMARY_TABLE = 'SAVE_FUNDING_BUDGET_SUMMARY_TABLE'
const SAVE_FUNDING_BUDGET_SUMMARY_TABLE_RESET = 'SAVE_FUNDING_BUDGET_SUMMARY_TABLE_RESET'
const SAVE_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS = 'SAVE_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS'
const SAVE_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE = 'SAVE_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE'

export function saveFundingBudgetSummaryTableResetAction () {
  return {
    type: SAVE_FUNDING_BUDGET_SUMMARY_TABLE_RESET
  }
}

export function saveFundingBudgetSummaryTableInitialAction() {
  return {
    type: SAVE_FUNDING_BUDGET_SUMMARY_TABLE
  }
}

export function saveFundingBudgetSummaryTableSuccessAction(payload) {
  return {
    type: SAVE_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS,
    payload,
    message: 'Summary updated successfully.',
    showNotification: true
  }
}

export function saveFundingBudgetSummaryTableFailureAction(payload) {
  return {
    type: SAVE_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE,
    payload
  }
}

export function saveFundingBudgetSummaryTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveFundingBudgetSummaryTableInitialAction())
      const response = await apiCall({
        method: 'post',
        url: payload.url,
        data: payload.data,
        params: payload.params
      })
      dispatch(saveFundingBudgetSummaryTableSuccessAction(response))
    } catch (error) {
      dispatch(saveFundingBudgetSummaryTableFailureAction())
    }
  }
}


export function saveFundingBudgetSummaryTableReducer(state = initialStateSummaryTableSave, action) {
  switch (action.type) {
    case SAVE_FUNDING_BUDGET_SUMMARY_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_FUNDING_BUDGET_SUMMARY_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_FUNDING_BUDGET_SUMMARY_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_FUNDING_BUDGET_SUMMARY_TABLE_FAILURE:
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

/* Get funding budget summary total */

const initialStateGetFundingBudgetSummaryTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_FUNDING_BUDGET_SUMMARY_TOTAL = 'GET_FUNDING_BUDGET_SUMMARY_TOTAL'
const GET_FUNDING_BUDGET_SUMMARY_TOTAL_RESET = 'GET_FUNDING_BUDGET_SUMMARY_TOTAL_RESET'
const GET_FUNDING_BUDGET_SUMMARY_TOTAL_FLAG_RESET = 'GET_FUNDING_BUDGET_SUMMARY_TOTAL_FLAG_RESET'
const GET_FUNDING_BUDGET_SUMMARY_TOTAL_SUCCESS = 'GET_FUNDING_BUDGET_SUMMARY_TOTAL_SUCCESS'
const GET_FUNDING_BUDGET_SUMMARY_TOTAL_FAILURE = 'GET_FUNDING_BUDGET_SUMMARY_TOTAL_FAILURE'

export function getFundingBudgetSummaryTotalResetAction () {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TOTAL_RESET
  }
}

export function getFundingBudgetSummaryTotalFlagResetAction () {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TOTAL_FLAG_RESET
  }
}

export function getFundingBudgetSummaryTotalInitialAction() {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TOTAL
  }
}

export function getFundingBudgetSummaryTotalSuccessAction(payload) {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TOTAL_SUCCESS,
    payload,
  }
}

export function getFundingBudgetSummaryTotalFailureAction(payload) {
  return {
    type: GET_FUNDING_BUDGET_SUMMARY_TOTAL_FAILURE,
    payload
  }
}

export function getFundingBudgetSummaryTotalAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getFundingBudgetSummaryTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: payload.url,
        params: payload.params
      })
      dispatch(getFundingBudgetSummaryTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Totals' : 'Collection Totals' }))))
    } catch (error) {
      dispatch(getFundingBudgetSummaryTotalFailureAction(error))
    }
  }
}


export function getFundingBudgetSummaryTotalReducer(state = initialStateGetFundingBudgetSummaryTotal, action) {
  switch (action.type) {
    case GET_FUNDING_BUDGET_SUMMARY_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_FUNDING_BUDGET_SUMMARY_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_FUNDING_BUDGET_SUMMARY_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_FUNDING_BUDGET_SUMMARY_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_FUNDING_BUDGET_SUMMARY_TOTAL_FAILURE:
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
