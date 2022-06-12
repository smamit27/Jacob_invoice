import { apiCall } from "../../../services/httpService"
import { errorStatusNotificationAction,statusNotificationAction } from '../StatusNotification/logic';
/* Get expenditure  mapping table data */

const initialStateMappingTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const EXPENDITURE_MAPPING_TABLE = 'EXPENDITURE_MAPPING_TABLE'
const EXPENDITURE_MAPPING_TABLE_RESET = 'EXPENDITURE_MAPPING_TABLE_RESET'
const EXPENDITURE_MAPPING_TABLE_FLAG_RESET = 'EXPENDITURE_MAPPING_TABLE_FLAG_RESET'
const EXPENDITURE_MAPPING_TABLE_SUCCESS = 'EXPENDITURE_MAPPING_TABLE_SUCCESS'
const EXPENDITURE_MAPPING_TABLE_FAILURE = 'EXPENDITURE_MAPPING_TABLE_FAILURE'

export function expenditureMappingTableResetAction () {
  return {
    type: EXPENDITURE_MAPPING_TABLE_RESET
  }
}
export function expenditureMappingTableFlagResetAction () {
  return {
    type: EXPENDITURE_MAPPING_TABLE_FLAG_RESET
  }
}

export function expenditureMappingTableInitialAction() {
  return {
    type: EXPENDITURE_MAPPING_TABLE
  }
}

export function expenditureMappingTableSuccessAction(payload) {
  return {
    type: EXPENDITURE_MAPPING_TABLE_SUCCESS,
    payload,
  }
}

export function expenditureMappingTableFailureAction(payload) {
  return {
    type: EXPENDITURE_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function expenditureMappingTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(expenditureMappingTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetExpenditureDetails',
        params: payload
      })
      dispatch(expenditureMappingTableSuccessAction(response))
    } catch (error) {
      dispatch(expenditureMappingTableFailureAction(error))
    }
  }
}


export function expenditureMappingTableReducer(state = initialStateMappingTable, action) {
  switch (action.type) {
    case EXPENDITURE_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case EXPENDITURE_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
      case EXPENDITURE_MAPPING_TABLE_FLAG_RESET:
        return {
          ...state,
          error: false,
          loading: false,
          flag: false,
        }
    case EXPENDITURE_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case EXPENDITURE_MAPPING_TABLE_FAILURE:
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





/* Save expenditure  mapping table data */

const initialStateByExpenditureSave = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const SAVE_EXPENDITURE_MAPPING = 'SAVE_EXPENDITURE_MAPPING'
const SAVE_EXPENDITURE_MAPPING_RESET = 'SAVE_EXPENDITURE_MAPPING_RESET'
const SAVE_EXPENDITURE_MAPPING_SUCCESS = 'SAVE_EXPENDITURE_MAPPING_SUCCESS'
const SAVE_EXPENDITURE_MAPPING_FAILURE = 'SAVE_EXPENDITURE_MAPPING_FAILURE'

export function saveExpenditureMappingResetAction () {
  return {
    type: SAVE_EXPENDITURE_MAPPING_RESET
  }
}

export function saveExpenditureMappingInitialAction() {
  return {
    type: SAVE_EXPENDITURE_MAPPING
  }
}

export function saveExpenditureMappingSuccessAction(payload) {
  return {
    type: SAVE_EXPENDITURE_MAPPING_SUCCESS,
    payload,
  }
}

export function saveExpenditureMappingFailureAction(payload) {
  return {
    type: SAVE_EXPENDITURE_MAPPING_FAILURE,
    payload
  }
}

export function saveExpenditureMappingAction (payload,data) {
  return async (dispatch) => {
    try {
      dispatch(saveExpenditureMappingInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveMapExpenditure',
        params:payload,
        data
      })
      if(response[0]?.FINAL_STATUS === "SUCCESS"){
        dispatch(statusNotificationAction({
          type: 'success',
          message: `Expenditure mapping updated.`
        }))
        
      }
      dispatch(saveExpenditureMappingSuccessAction(response))
    } catch (error) {
      dispatch(saveExpenditureMappingFailureAction(error))
    }
  }
}


export function saveExpenditureMappingReducer(state = initialStateByExpenditureSave, action) {
  switch (action.type) {
    case SAVE_EXPENDITURE_MAPPING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SAVE_EXPENDITURE_MAPPING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case SAVE_EXPENDITURE_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_EXPENDITURE_MAPPING_FAILURE:
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

