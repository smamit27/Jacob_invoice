import { generateRandomString } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

/* Get travel table data */

const initialStateTravelTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const TRAVEL_TABLE = 'TRAVEL_TABLE'
const TRAVEL_TABLE_RESET = 'TRAVEL_TABLE_RESET'
const TRAVEL_TABLE_FLAG_RESET = 'TRAVEL_TABLE_FLAG_RESET'
const TRAVEL_TABLE_SUCCESS = 'TRAVEL_TABLE_SUCCESS'
const TRAVEL_TABLE_FAILURE = 'TRAVEL_TABLE_FAILURE'

export function travelTableResetAction () {
  return {
    type: TRAVEL_TABLE_RESET
  }
}

export function travelTableFlagResetAction () {
  return {
    type: TRAVEL_TABLE_FLAG_RESET
  }
}

export function travelTableInitialAction() {
  return {
    type: TRAVEL_TABLE
  }
}

export function travelTableSuccessAction(payload) {
  return {
    type: TRAVEL_TABLE_SUCCESS,
    payload,
  }
}

export function travelTableFailureAction(payload) {
  return {
    type: TRAVEL_TABLE_FAILURE,
    payload
  }
}

export function travelTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(travelTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetTravelDetails',
        params: payload
      })
      dispatch(travelTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1 }))))
    } catch (error) {
      dispatch(travelTableFailureAction(error))
    }
  }
}


export function travelTableReducer(state = initialStateTravelTable, action) {
  switch (action.type) {
    case TRAVEL_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case TRAVEL_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case TRAVEL_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case TRAVEL_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case TRAVEL_TABLE_FAILURE:
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

/* save travel table data */

const initialStateTravelTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_TRAVEL_TABLE = 'SAVE_TRAVEL_TABLE'
const SAVE_TRAVEL_TABLE_RESET = 'SAVE_TRAVEL_TABLE_RESET'
const SAVE_TRAVEL_TABLE_SUCCESS = 'SAVE_TRAVEL_TABLE_SUCCESS'
const SAVE_TRAVEL_TABLE_FAILURE = 'SAVE_TRAVEL_TABLE_FAILURE'

export function saveTravelTableResetAction () {
  return {
    type: SAVE_TRAVEL_TABLE_RESET
  }
}

export function saveTravelTableInitialAction() {
  return {
    type: SAVE_TRAVEL_TABLE
  }
}

export function saveTravelTableSuccessAction(payload) {
  return {
    type: SAVE_TRAVEL_TABLE_SUCCESS,
    payload,
    message: 'Travels table updated successfully.',
    showNotification: true
  }
}

export function saveTravelTableFailureAction(payload) {
  return {
    type: SAVE_TRAVEL_TABLE_FAILURE,
    payload
  }
}

export function saveTravelTableAction (payload, params) {
  return async (dispatch) => {
    try {
      dispatch(saveTravelTableInitialAction())
        await apiCall({
          method: 'post',
          url: '/SaveTravelDetails',
          data: payload,
          params
        })
      dispatch(saveTravelTableSuccessAction({}))
    } catch (error) {
      dispatch(saveTravelTableFailureAction(error))
    }
  }
}


export function saveTravelTableReducer(state = initialStateTravelTableSave, action) {
  switch (action.type) {
    case SAVE_TRAVEL_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_TRAVEL_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_TRAVEL_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_TRAVEL_TABLE_FAILURE:
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


/* delete travel table data */

const initialStateTravelTableDelete = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const DELETE_TRAVEL_TABLE = 'DELETE_TRAVEL_TABLE'
const DELETE_TRAVEL_TABLE_RESET = 'DELETE_TRAVEL_TABLE_RESET'
const DELETE_TRAVEL_TABLE_SUCCESS = 'DELETE_TRAVEL_TABLE_SUCCESS'
const DELETE_TRAVEL_TABLE_FAILURE = 'DELETE_TRAVEL_TABLE_FAILURE'

export function deleteTravelTableResetAction () {
  return {
    type: DELETE_TRAVEL_TABLE_RESET
  }
}

export function deleteTravelTableInitialAction() {
  return {
    type: DELETE_TRAVEL_TABLE
  }
}

export function deleteTravelTableSuccessAction(payload) {
  return {
    type: DELETE_TRAVEL_TABLE_SUCCESS,
    payload,
    message: "The selected record's deleted successfully.",
    showNotification: true
  }
}

export function deleteTravelTableFailureAction(payload) {
  return {
    type: DELETE_TRAVEL_TABLE_FAILURE,
    payload
  }
}

export function deleteTravelTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteTravelTableInitialAction())
        await apiCall({
          method: 'DELETE',
          url: '/DeleteTripDetail',
          data: payload?.data,
          params: payload?.params
        })
      dispatch(deleteTravelTableSuccessAction({}))
    } catch (error) {
      dispatch(deleteTravelTableFailureAction(error))
    }
  }
}


export function deleteTravelTableReducer(state = initialStateTravelTableDelete, action) {
  switch (action.type) {
    case DELETE_TRAVEL_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_TRAVEL_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_TRAVEL_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_TRAVEL_TABLE_FAILURE:
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