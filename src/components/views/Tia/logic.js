import { apiCall } from "../../../services/httpService"
import { generateRandomString } from "../../../helpers"

const TIA_SUBCONPO_MODAL_OPEN = 'TIA_SUBCONPO_MODAL_OPEN'
const TIA_SUBCONPO_MODAL_CLOSE = 'TIA_SUBCONPO_MODAL_CLOSE'

const initialStateTiaSubconpoModal = {
  open: false,
  data: {}
}

export function tiaSubconpoModalOpenAction (payload = {}) {
  return {
    type: TIA_SUBCONPO_MODAL_OPEN,
    payload
  }
}

export function tiaSubconpoModalCloseAction () {
  return {
    type: TIA_SUBCONPO_MODAL_CLOSE,
  }
}


export function tiaSubconpoModalReducer (state = initialStateTiaSubconpoModal, action) {
  switch (action.type) {
    case TIA_SUBCONPO_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case TIA_SUBCONPO_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* Get Tia subcon po details */

const initialStateGetTiaSubconpoTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_TIA_SUBCONPO_TABLE = 'GET_TIA_SUBCONPO_TABLE'
const GET_TIA_SUBCONPO_TABLE_RESET = 'GET_TIA_SUBCONPO_TABLE_RESET'
const GET_TIA_SUBCONPO_TABLE_FLAG_RESET = 'GET_TIA_SUBCONPO_TABLE_FLAG_RESET'
const GET_TIA_SUBCONPO_TABLE_SUCCESS = 'GET_TIA_SUBCONPO_TABLE_SUCCESS'
const GET_TIA_SUBCONPO_TABLE_FAILURE = 'GET_TIA_SUBCONPO_TABLE_FAILURE'

export function getTiaSubconpoTableResetAction () {
  return {
    type: GET_TIA_SUBCONPO_TABLE_RESET
  }
}

export function getTiaSubconpoTableFlagResetAction () {
  return {
    type: GET_TIA_SUBCONPO_TABLE_FLAG_RESET
  }
}

export function getTiaSubconpoTableInitialAction() {
  return {
    type: GET_TIA_SUBCONPO_TABLE
  }
}

export function getTiaSubconpoTableSuccessAction(payload) {
  return {
    type: GET_TIA_SUBCONPO_TABLE_SUCCESS,
    payload,
  }
}

export function getTiaSubconpoTableFailureAction(payload) {
  return {
    type: GET_TIA_SUBCONPO_TABLE_FAILURE,
    payload
  }
}

export function getTiaSubconpoTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getTiaSubconpoTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetSubcontractPODetails',
        params: payload
      })
      dispatch(getTiaSubconpoTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString() }))))
    } catch (error) {
      dispatch(getTiaSubconpoTableFailureAction(error))
    }
  }
}


export function getTiaSubconpoTableReducer(state = initialStateGetTiaSubconpoTable, action) {
  switch (action.type) {
    case GET_TIA_SUBCONPO_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_TIA_SUBCONPO_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_TIA_SUBCONPO_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_TIA_SUBCONPO_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_TIA_SUBCONPO_TABLE_FAILURE:
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

const TIA_SUBCONPO_DETAIL_MODAL_OPEN = 'TIA_SUBCONPO_DETAIL_MODAL_OPEN'
const TIA_SUBCONPO_DETAIL_MODAL_CLOSE = 'TIA_SUBCONPO_DETAIL_MODAL_CLOSE'

const initialStateTiaSubconpoDetailModal = {
  open: false,
  data: {}
}

export function tiaSubconpoDetailModalOpenAction (payload = {}) {
  return {
    type: TIA_SUBCONPO_DETAIL_MODAL_OPEN,
    payload
  }
}

export function tiaSubconpoDetailModalCloseAction () {
  return {
    type: TIA_SUBCONPO_DETAIL_MODAL_CLOSE,
  }
}


export function tiaSubconpoDetailModalReducer (state = initialStateTiaSubconpoDetailModal, action) {
  switch (action.type) {
    case TIA_SUBCONPO_DETAIL_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case TIA_SUBCONPO_DETAIL_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* Get  Tia subcon po details */

const initialStateGetTiaSubconpoDetailTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_TIA_SUBCONPO_DETAIL_TABLE = 'GET_TIA_SUBCONPO_DETAIL_TABLE'
const GET_TIA_SUBCONPO_DETAIL_TABLE_RESET = 'GET_TIA_SUBCONPO_DETAIL_TABLE_RESET'
const GET_TIA_SUBCONPO_DETAIL_TABLE_FLAG_RESET = 'GET_TIA_SUBCONPO_DETAIL_TABLE_FLAG_RESET'
const GET_TIA_SUBCONPO_DETAIL_TABLE_SUCCESS = 'GET_TIA_SUBCONPO_DETAIL_TABLE_SUCCESS'
const GET_TIA_SUBCONPO_DETAIL_TABLE_FAILURE = 'GET_TIA_SUBCONPO_DETAIL_TABLE_FAILURE'

export function getTiaSubconpoDetailTableResetAction () {
  return {
    type: GET_TIA_SUBCONPO_DETAIL_TABLE_RESET
  }
}

export function getTiaSubconpoDetailTableFlagResetAction () {
  return {
    type: GET_TIA_SUBCONPO_DETAIL_TABLE_FLAG_RESET
  }
}

export function getTiaSubconpoDetailTableInitialAction() {
  return {
    type: GET_TIA_SUBCONPO_DETAIL_TABLE
  }
}

export function getTiaSubconpoDetailTableSuccessAction(payload) {
  return {
    type: GET_TIA_SUBCONPO_DETAIL_TABLE_SUCCESS,
    payload,
  }
}

export function getTiaSubconpoDetailTableFailureAction(payload) {
  return {
    type: GET_TIA_SUBCONPO_DETAIL_TABLE_FAILURE,
    payload
  }
}

export function getTiaSubconpoDetailTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getTiaSubconpoDetailTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetSubContractPoData',
        params: payload
      })
      dispatch(getTiaSubconpoDetailTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString() }))))
    } catch (error) {
      dispatch(getTiaSubconpoDetailTableFailureAction(error))
    }
  }
}


export function getTiaSubconpoDetailTableReducer(state = initialStateGetTiaSubconpoDetailTable, action) {
  switch (action.type) {
    case GET_TIA_SUBCONPO_DETAIL_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_TIA_SUBCONPO_DETAIL_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_TIA_SUBCONPO_DETAIL_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_TIA_SUBCONPO_DETAIL_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_TIA_SUBCONPO_DETAIL_TABLE_FAILURE:
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
