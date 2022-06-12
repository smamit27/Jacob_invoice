import { apiCall } from "../../../services/httpService"
import { generateRandomString, jsonStringParse } from "../../../helpers"
/* Contractor Ceiling Fields modal open close logic */

const CONTRACTOR_CEILING_FIELDS_MODAL_OPEN = 'CONTRACTOR_CEILING_FIELDS_MODAL_OPEN'
const CONTRACTOR_CEILING_FIELDS_MODAL_CLOSE = 'CONTRACTOR_CEILING_FIELDS_MODAL_CLOSE'

const initialStateModal = {
  open: false,
  data: {}
}

export function contractorCeilingFieldsModalOpenAction (payload = {}) {
  return {
    type: CONTRACTOR_CEILING_FIELDS_MODAL_OPEN,
    payload
  }
}

export function contractorCeilingFieldsModalCloseAction () {
  return {
    type: CONTRACTOR_CEILING_FIELDS_MODAL_CLOSE,
  }
}


export function contractorCeilingFieldsModalReducer (state = initialStateModal, action) {
  switch (action.type) {
    case CONTRACTOR_CEILING_FIELDS_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case CONTRACTOR_CEILING_FIELDS_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* GET all Contractor Ceiling Fields */

const initialAllContractorCeiling = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALL_CONTRACTOR_CEILING = 'GET_ALL_CONTRACTOR_CEILING'
const GET_ALL_CONTRACTOR_CEILING_FLAG_RESET = 'GET_ALL_CONTRACTOR_CEILING_FLAG_RESET'
const GET_ALL_CONTRACTOR_CEILING_RESET = 'GET_ALL_CONTRACTOR_CEILING_RESET'
const GET_ALL_CONTRACTOR_CEILING_SUCCESS = 'GET_ALL_CONTRACTOR_CEILING_SUCCESS'
const GET_ALL_CONTRACTOR_CEILING_FAILURE = 'GET_ALL_CONTRACTOR_CEILING_FAILURE'

export function getAllContractorCeilingResetAction () {
  return {
    type: GET_ALL_CONTRACTOR_CEILING_RESET
  }
}

export function getAllContractorCeilingFlagResetAction () {
  return {
    type: GET_ALL_CONTRACTOR_CEILING_FLAG_RESET
  }
}

export function getAllContractorCeilingInitialAction() {
  return {
    type: GET_ALL_CONTRACTOR_CEILING
  }
}

export function getAllContractorCeilingSuccessAction(payload) {
  return {
    type: GET_ALL_CONTRACTOR_CEILING_SUCCESS,
    payload,
  }
}

export function getAllContractorCeilingFailureAction(payload) {
  return {
    type: GET_ALL_CONTRACTOR_CEILING_FAILURE,
    payload
  }
}

export function getAllContractorCeilingAction (payload,isCollectionExist) {
  return async (dispatch) => {
    try {
      dispatch(getAllContractorCeilingInitialAction())
      const response = await apiCall({
        method: 'get',
        url: isCollectionExist ? '/GetContractCeilingData' : '/GETContractCeilingTempData',
        params: payload
      })
      dispatch(getAllContractorCeilingSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString()}))))
    } catch (error) {
      dispatch(getAllContractorCeilingFailureAction())
    }
  }
}


export function getAllContractorCeilingReducer(state = initialAllContractorCeiling, action) {
  switch (action.type) {
    case GET_ALL_CONTRACTOR_CEILING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_CONTRACTOR_CEILING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_CONTRACTOR_CEILING_FLAG_RESET:
      return {
        ...state,
        flag: false
      }
    case GET_ALL_CONTRACTOR_CEILING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALL_CONTRACTOR_CEILING_FAILURE:
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



/* Delete Contractor Ceiling Field */

const initialDeleteContractorCeiling = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const DELETE_CONTRACTOR_CEILING = 'DELETE_CONTRACTOR_CEILING'
const DELETE_CONTRACTOR_CEILING_RESET = 'DELETE_CONTRACTOR_CEILING_RESET'
const DELETE_CONTRACTOR_CEILING_SUCCESS = 'DELETE_CONTRACTOR_CEILING_SUCCESS'
const DELETE_CONTRACTOR_CEILING_FAILURE = 'DELETE_CONTRACTOR_CEILING_FAILURE'

export function deleteContractorCeilingFieldsResetAction () {
  return {
    type: DELETE_CONTRACTOR_CEILING_RESET
  }
}

export function deleteContractorCeilingFieldsInitialAction() {
  return {
    type: DELETE_CONTRACTOR_CEILING
  }
}

export function deleteContractorCeilingFieldsSuccessAction(payload) {
  return {
    type: DELETE_CONTRACTOR_CEILING_SUCCESS,
    payload,
  }
}

export function deleteContractorCeilingFieldsFailureAction(payload) {
  return {
    type: DELETE_CONTRACTOR_CEILING_FAILURE,
    payload
  }
}

export function deleteContractorCeilingFieldsAction (payload,isCollectionExist) {
  return async (dispatch) => {
    try {
      dispatch(deleteContractorCeilingFieldsInitialAction())
      const response = await apiCall({
        method: 'delete',
        url: isCollectionExist ? '/DeletecontractCeilingData': '/DeleteContractCeilingTempData',
        params: payload
      })
      dispatch(deleteContractorCeilingFieldsSuccessAction(response))
    } catch (error) {
      dispatch(deleteContractorCeilingFieldsFailureAction())
    }
  }
}


export function deleteContractorCeilingFieldsReducer(state = initialDeleteContractorCeiling, action) {
  switch (action.type) {
    case DELETE_CONTRACTOR_CEILING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_CONTRACTOR_CEILING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_CONTRACTOR_CEILING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_CONTRACTOR_CEILING_FAILURE:
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


/* Create/Edit/View Contractor Ceiling Field modal open close logic */

const CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_OPEN = 'CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_OPEN'
const CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_CLOSE = 'CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_CLOSE'

export function createEditContractorCeilingFieldModalOpenAction (payload = {}) {
  return {
    type: CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_OPEN,
    payload
  }
}

export function createEditContractorCeilingFieldModalCloseAction () {
  return {
    type: CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_CLOSE,
  }
}


export function createEditContractorCeilingFieldModalReducer (state = initialStateModal, action) {
  switch (action.type) {
    case CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case CREATE_EDIT_CONTRACTOR_CEILING_FIELD_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* Create Edit Contractor Ceiling Field */

const initialStateFormData = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const CREATE_EDIT_CONTRACTOR_CEILING_FIELD = 'CREATE_EDIT_CONTRACTOR_CEILING_FIELD'
const CREATE_EDIT_CONTRACTOR_CEILING_FIELD_RESET = 'CREATE_EDIT_CONTRACTOR_CEILING_FIELD_RESET'
const CREATE_EDIT_CONTRACTOR_CEILING_FIELD_SUCCESS = 'CREATE_EDIT_CONTRACTOR_CEILING_FIELD_SUCCESS'
const CREATE_EDIT_CONTRACTOR_CEILING_FIELD_FAILURE = 'CREATE_EDIT_CONTRACTOR_CEILING_FIELD_FAILURE'

export function createEditContractorCeilingFieldInitialAction() {
  return {
    type: CREATE_EDIT_CONTRACTOR_CEILING_FIELD
  }
}

export function createEditContractorCeilingFieldResetAction () {
  return {
    type: CREATE_EDIT_CONTRACTOR_CEILING_FIELD_RESET
  }
}

export function createEditContractorCeilingFieldsuccessAction(payload) {
  return {
    type: CREATE_EDIT_CONTRACTOR_CEILING_FIELD_SUCCESS,
    payload,
  }
}

export function createEditContractorCeilingFieldFailureAction(payload) {
  return {
    type: CREATE_EDIT_CONTRACTOR_CEILING_FIELD_FAILURE,
    payload
  }
}

export function createEditContractorCeilingFieldAction (payload,isCollectionExist) {
  return async (dispatch) => {
    try {
      dispatch(createEditContractorCeilingFieldInitialAction())
       const response =  await apiCall({
          method: 'post',
          url: isCollectionExist ? '/SaveContractCeiling': '/SaveContractCeilingTempDetails',
          data: payload
        })

      dispatch(createEditContractorCeilingFieldsuccessAction(response))
    } catch (error) {
      dispatch(createEditContractorCeilingFieldFailureAction())
    }
  }
}


export function createEditContractorCeilingFieldReducer(state = initialStateFormData, action) {
  switch (action.type) {
    case CREATE_EDIT_CONTRACTOR_CEILING_FIELD:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_CONTRACTOR_CEILING_FIELD_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_CONTRACTOR_CEILING_FIELD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case CREATE_EDIT_CONTRACTOR_CEILING_FIELD_FAILURE:
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


/* Summary Total */

const initialStateContractCeilingSummaryTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_CONTRACT_CEILING_SUMMARY_TOTAL = 'GET_CONTRACT_CEILING_SUMMARY_TOTAL'
const GET_CONTRACT_CEILING_SUMMARY_TOTAL_RESET = 'GET_CONTRACT_CEILING_SUMMARY_TOTAL_RESET'
const GET_CONTRACT_CEILING_SUMMARY_TOTAL_FLAG_RESET = 'GET_CONTRACT_CEILING_SUMMARY_TOTAL_FLAG_RESET'
const GET_CONTRACT_CEILING_SUMMARY_TOTAL_SUCCESS = 'GET_CONTRACT_CEILING_SUMMARY_TOTAL_SUCCESS'
const GET_CONTRACT_CEILING_SUMMARY_TOTAL_FAILURE = 'GET_CONTRACT_CEILING_SUMMARY_TOTAL_FAILURE'

export function getContractCeilingSummaryTotalResetAction () {
  return {
    type: GET_CONTRACT_CEILING_SUMMARY_TOTAL_RESET
  }
}

export function getContractCeilingSummaryTotalFlagResetAction () {
  return {
    type: GET_CONTRACT_CEILING_SUMMARY_TOTAL_FLAG_RESET
  }
}

export function getContractCeilingSummaryTotalInitialAction() {
  return {
    type: GET_CONTRACT_CEILING_SUMMARY_TOTAL
  }
}

export function getContractCeilingSummaryTotalSuccessAction(payload) {
  return {
    type: GET_CONTRACT_CEILING_SUMMARY_TOTAL_SUCCESS,
    payload,
  }
}

export function getContractCeilingSummaryTotalFailureAction(payload) {
  return {
    type: GET_CONTRACT_CEILING_SUMMARY_TOTAL_FAILURE,
    payload
  }
}

export function getContractCeilingSummaryTotalAction (payload,isCollectionExist) {
  return async (dispatch) => {
    try {
      dispatch(getContractCeilingSummaryTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: isCollectionExist ? '/GetContractCeilingDataSummary': '/GetContractCeilingDataSummaryTemp',
        params: payload
      })
      dispatch(getContractCeilingSummaryTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Totals' : 'Collection Totals' }))))
    } catch (error) {
      dispatch(getContractCeilingSummaryTotalFailureAction(error))
    }
  }
}


export function getContractCeilingSummaryTotalReducer(state = initialStateContractCeilingSummaryTotal, action) {
  switch (action.type) {
    case GET_CONTRACT_CEILING_SUMMARY_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_CONTRACT_CEILING_SUMMARY_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_CONTRACT_CEILING_SUMMARY_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_CONTRACT_CEILING_SUMMARY_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_CONTRACT_CEILING_SUMMARY_TOTAL_FAILURE:
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



/*Summary Total */
