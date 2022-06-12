import { generateRandomString, jsonStringParse } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

const temp = {
  "PU_NAME": 'E1',
  "PU_NUMBER": '02-Nov-2021',
  "PU_DESC": '02-Nov-2021',
  "RATE_GROUP_NAME": '',
  "DATE_FROM": '',
  "DATE_TO": '',
  "ADDED_DATE": '02-Nov-2022',
  "ADDED_BY": 'KV',
  "UPDATED_DATE": '02-Nov-2022',
  "UPDATED_BY": 'KV',
}

/* Get PuMapping table data */

const initialStatePuMappingTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const PU_MAPPING_TABLE = 'PU_MAPPING_TABLE'
const PU_MAPPING_TABLE_RESET = 'PU_MAPPING_TABLE_RESET'
const PU_MAPPING_TABLE_FLAG_RESET = 'PU_MAPPING_TABLE_FLAG_RESET'
const PU_MAPPING_TABLE_SUCCESS = 'PU_MAPPING_TABLE_SUCCESS'
const PU_MAPPING_TABLE_FAILURE = 'PU_MAPPING_TABLE_FAILURE'

export function puMappingTableResetAction () {
  return {
    type: PU_MAPPING_TABLE_RESET
  }
}

export function puMappingTableFlagResetAction () {
  return {
    type: PU_MAPPING_TABLE_FLAG_RESET
  }
}

export function puMappingTableInitialAction() {
  return {
    type: PU_MAPPING_TABLE
  }
}

export function puMappingTableSuccessAction(payload) {
  return {
    type: PU_MAPPING_TABLE_SUCCESS,
    payload,
  }
}

export function puMappingTableFailureAction(payload) {
  return {
    type: PU_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function puMappingTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(puMappingTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetPuMappingData',
        params: payload
      })
      dispatch(puMappingTableSuccessAction([...response].map((d, i) => ({ ...d, tableRowId: generateRandomString(), level: 1,FLAG_IS: (d.PU_SR_NO === null || d.PU_SR_NO === 0) ? 'Y' : 'N' }))))
    } catch (error) {
      dispatch(puMappingTableSuccessAction([temp]))
      dispatch(puMappingTableFailureAction())
    }
  }
}


export function puMappingTableReducer(state = initialStatePuMappingTable, action) {
  switch (action.type) {
    case PU_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case PU_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case PU_MAPPING_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case PU_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case PU_MAPPING_TABLE_FAILURE:
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

/* save PuMapping table data */

const initialStatePuMappingTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: []
}
  
  
const SAVE_PU_MAPPING_TABLE = 'SAVE_PU_MAPPING_TABLE'
const SAVE_PU_MAPPING_TABLE_RESET = 'SAVE_PU_MAPPING_TABLE_RESET'
const SAVE_PU_MAPPING_TABLE_SUCCESS = 'SAVE_PU_MAPPING_TABLE_SUCCESS'
const SAVE_PU_MAPPING_TABLE_FAILURE = 'SAVE_PU_MAPPING_TABLE_FAILURE'

export function savePuMappingTableResetAction () {
  return {
    type: SAVE_PU_MAPPING_TABLE_RESET
  }
}

export function savePuMappingTableInitialAction() {
  return {
    type: SAVE_PU_MAPPING_TABLE
  }
}

export function savePuMappingTableSuccessAction(payload) {
  return {
    type: SAVE_PU_MAPPING_TABLE_SUCCESS,
    payload,
    message: 'PU Mapping table updated successfully.',
    showNotification: true
  }
}

export function savePuMappingTableFailureAction(payload) {
  return {
    type: SAVE_PU_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function savePuMappingTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(savePuMappingTableInitialAction())     
        const response = await apiCall({
          method: 'post',
          url: '/SavePUMappingInfo',
          data: payload
        })      
      dispatch(savePuMappingTableSuccessAction(response))
    } catch (error) {
      dispatch(savePuMappingTableFailureAction())
    }
  }
}


export function savePuMappingTableReducer(state = initialStatePuMappingTableSave, action) {
  switch (action.type) {
    case SAVE_PU_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_PU_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_PU_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_PU_MAPPING_TABLE_FAILURE:
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




/* Get RateGroup table data */

const initialStateRateGroupTable = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
  
  const RATE_GROUP_TABLE= 'RATE_GROUP_TABLE'
  const RATE_GROUP_TABLE_RESET = 'RATE_GROUP_TABLE_RESET'
  const RATE_GROUP_TABLE_FLAG_RESET = 'RATE_GROUP_TABLE_FLAG_RESET'
  const RATE_GROUP_TABLE_SUCCESS = 'RATE_GROUP_TABLE_SUCCESS'
  const RATE_GROUP_TABLE_FAILURE = 'RATE_GROUP_TABLE_FAILURE'
  
  export function rateGroupTableResetAction () {
    return {
      type: RATE_GROUP_TABLE_RESET
    }
  }
  
  export function rateGroupTableFlagResetAction () {
    return {
      type: RATE_GROUP_TABLE_FLAG_RESET
    }
  }
  
  export function rateGroupTableInitialAction() {
    return {
      type: RATE_GROUP_TABLE
    }
  }
  
  export function rateGroupTableSuccessAction(payload) {
    return {
      type: RATE_GROUP_TABLE_SUCCESS,
      payload,
    }
  }
  
  export function rateGroupTableFailureAction(payload) {
    return {
      type: RATE_GROUP_TABLE_FAILURE,
      payload
    }
  }
  
  export function rateGroupTableAction () {
    return async (dispatch) => {
      try {
        dispatch(rateGroupTableInitialAction())
        const response = await apiCall({
          method: 'get',
          url: '/GetPURateGroup',
          params: {active:'Y'}
        })
        dispatch(rateGroupTableSuccessAction(response))
      } catch (error) {
        dispatch(rateGroupTableFailureAction())
      }
    }
  }
  
  
  export function rateGroupTableReducer(state = initialStateRateGroupTable, action) {
    switch (action.type) {
      case RATE_GROUP_TABLE:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case RATE_GROUP_TABLE_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case RATE_GROUP_TABLE_FLAG_RESET:
        return {
          ...state,
          error: false,
          loading: false,
          flag: false,
        }
      case RATE_GROUP_TABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case RATE_GROUP_TABLE_FAILURE:
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


  
/* Get puMappingDelete data */

const initialStatePuMappingDelete = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const PU_MAPPING_DELETE = 'PU_MAPPING_DELETE'
const PU_MAPPING_DELETE_RESET = 'PU_MAPPING_DELETE_RESET'
const PU_MAPPING_DELETE_FLAG = 'PU_MAPPING_DELETE_FLAG'
const PU_MAPPING_DELETE_SUCCESS = 'PU_MAPPING_DELETE_SUCCESS'
const PU_MAPPING_DELETE_FAILURE = 'PU_MAPPING_DELETE_FAILURE'

export function puMappingDeleteResetAction () {
  return {
    type: PU_MAPPING_DELETE_RESET
  }
}

export function puMappingDeleteFlagAction () {
  return {
    type: PU_MAPPING_DELETE_FLAG
  }
}

export function puMappingDeleteInitialAction() {
  return {
    type: PU_MAPPING_DELETE
  }
}

export function puMappingDeleteSuccessAction(payload) {
  return {
    type: PU_MAPPING_DELETE_SUCCESS,
    payload,
    message: "The selected record's deleted successfully.",
    showNotification: true
  }
}

export function puMappingDeleteFailureAction(payload) {
  return {
    type: PU_MAPPING_DELETE_FAILURE,
    payload
  }
}


export function puMappingDeleteAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(puMappingDeleteInitialAction())
      const response = await apiCall({
        method: 'delete',
        url: '/DeletePuMappingData',
        params: payload
      })
      dispatch(puMappingDeleteSuccessAction(response))
    } catch (error) {
    dispatch(puMappingDeleteFailureAction())
    }
  }
}


export function puMappingDeleteReducer(state = initialStatePuMappingDelete, action) {
  switch (action.type) {
    case PU_MAPPING_DELETE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case PU_MAPPING_DELETE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case PU_MAPPING_DELETE_FLAG:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case PU_MAPPING_DELETE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case PU_MAPPING_DELETE_FAILURE:
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
  