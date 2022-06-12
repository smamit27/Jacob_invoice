import { generateRandomString, jsonStringParse } from "../../../helpers"
import { apiCall } from "../../../services/httpService"


/* Project Invoice Detail Modal */
const PROJECT_INVOICE_DETAIL_MODAL_OPEN = 'PROJECT_INVOICE_DETAIL_MODAL_OPEN'
const PROJECT_INVOICE_DETAIL_MODAL_CLOSE = 'PROJECT_INVOICE_DETAIL_MODAL_CLOSE'

const initialStatePIDetailModal = {
  open: false,
  data: {}
}
export function projectInvoiceDetailModalOpen(payload = {}) {
  return {
    type: PROJECT_INVOICE_DETAIL_MODAL_OPEN,
    payload
  }
}

export function projectInvoiceDetailModalClose () {
  return {
    type: PROJECT_INVOICE_DETAIL_MODAL_CLOSE,
  }
}

export function projectInvoiceDetailModalReducer (state = initialStatePIDetailModal, action) {
  switch (action.type) {
    case PROJECT_INVOICE_DETAIL_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case PROJECT_INVOICE_DETAIL_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}
/* Project Invoice Detail Modal End*/
/* change history start*/

const tempCH = { 
              FIELD_NAME: 'Field Name 1',
              ORIGINAL_VALUE: 'Original Value',
              NEW_VALUE: '',
              OPERATION: '',
              LAST_UPDATED_BY: '',
              LAST_UPDATED_ON: ''
      }
const initialStateChangeHistory = {
  loading: false,
  error: false,
  flag: false,
  data: {  
  }
}



const CHANGE_HISTORY = 'CHANGE_HISTORY'
const CHANGE_HISTORY_RESET = 'CHANGE_HISTORY_RESET'
const CHANGE_HISTORY_SUCCESS = 'CHANGE_HISTORY_SUCCESS'
const CHANGE_HISTORY_FAILURE = 'CHANGE_HISTORY_FAILURE'

export function changeHistoryReset () {
  return {
    type: CHANGE_HISTORY_RESET
  }
}

export function changeHistoryInitial() {
  return {
    type: CHANGE_HISTORY
  }
}

export function changeHistorySuccess(payload) {
  return {
    type: CHANGE_HISTORY_SUCCESS,
    payload,
  }
}

export function changeHistoryFailure(payload) {
  return {
    type: CHANGE_HISTORY_FAILURE,
    payload
  }
}

export function changeHistoryAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(changeHistoryInitial())
      const response = await apiCall({
        method: 'get',
        url: `/GetProjectWiseInvoices`,
        params: payload
      })
    //  dispatch(changeHistorySuccess(response.map((d, i) => ({ ...d, tableRowId: generateRandomString()}))))
      dispatch(changeHistorySuccess([tempCH]))
  } catch (error) {
      dispatch(changeHistoryFailure(error))
    }
  }
}


export function changeHistoryReducer(state = initialStateChangeHistory, action) {
  switch (action.type) {
    case CHANGE_HISTORY:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case CHANGE_HISTORY_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          
        }
      }
    case CHANGE_HISTORY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case CHANGE_HISTORY_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: {
          
        }
      }
    default:
      return state
  }
}

/* change history end*/



/* Main grid when item billed */


const initialStateGetItemBilled = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_ITEM_BILLED_HEADER = 'GET_ITEM_BILLED_HEADER'
const GET_ITEM_BILLED_HEADER_RESET = 'GET_ITEM_BILLED_HEADER_RESET'
const GET_ITEM_BILLED_HEADER_FLAG_RESET = 'GET_ITEM_BILLED_HEADER_FLAG_RESET'
const GET_ITEM_BILLED_HEADER_SUCCESS = 'GET_ITEM_BILLED_HEADER_SUCCESS'
const GET_ITEM_BILLED_HEADER_FAILURE = 'GET_ITEM_BILLED_HEADER_FAILURE'

export function getItemBilledHeaderResetAction () {
  return {
    type: GET_ITEM_BILLED_HEADER_RESET
  }
}

export function getItemBilledHeaderFlagResetAction () {
  return {
    type: GET_ITEM_BILLED_HEADER_FLAG_RESET
  }
}

export function getItemBilledHeaderInitialAction() {
  return {
    type: GET_ITEM_BILLED_HEADER
  }
}

export function getItemBilledHeaderSuccessAction(payload) {
  return {
    type: GET_ITEM_BILLED_HEADER_SUCCESS,
    payload,
  }
}

export function getItemBilledHeaderFailureAction(payload) {
  return {
    type: GET_ITEM_BILLED_HEADER_FAILURE,
    payload
  }
}

export function getItemBilledHeaderAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getItemBilledHeaderInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetItemsBilledHeaderDetails',
        params: payload
      })
      dispatch(getItemBilledHeaderSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(),isExpanded: false,IS_GROUP: 'Y'}))))
    } catch (error) {
      dispatch(getItemBilledHeaderFailureAction())
    }
  }
}


export function getItemBilledHeaderReducer(state = initialStateGetItemBilled, action) {
  switch (action.type) {
    case GET_ITEM_BILLED_HEADER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_BILLED_HEADER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_BILLED_HEADER_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_ITEM_BILLED_HEADER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ITEM_BILLED_HEADER_FAILURE:
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
/* Main grid when item billed end*/
/* Main grid when item not billed */

const initialStateGetItemNotBilled = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_ITEM_NOT_BILLED_HEADER = 'GET_ITEM_NOT_BILLED_HEADER'
const GET_ITEM_NOT_BILLED_HEADER_RESET = 'GET_ITEM_NOT_BILLED_HEADER_RESET'
const GET_ITEM_NOT_BILLED_HEADER_FLAG_RESET = 'GET_ITEM_NOT_BILLED_HEADER_FLAG_RESET'
const GET_ITEM_NOT_BILLED_HEADER_SUCCESS = 'GET_ITEM_NOT_BILLED_HEADER_SUCCESS'
const GET_ITEM_NOT_BILLED_HEADER_FAILURE = 'GET_ITEM_NOT_BILLED_HEADER_FAILURE'

export function getItemNotBilledHeaderResetAction () {
  return {
    type: GET_ITEM_NOT_BILLED_HEADER_RESET
  }
}

export function getItemNotBilledHeaderFlagResetAction () {
  return {
    type: GET_ITEM_NOT_BILLED_HEADER_FLAG_RESET
  }
}

export function getItemNotBilledHeaderInitialAction() {
  return {
    type: GET_ITEM_NOT_BILLED_HEADER
  }
}

export function getItemNotBilledHeaderSuccessAction(payload) {
  return {
    type: GET_ITEM_NOT_BILLED_HEADER_SUCCESS,
    payload,
  }
}

export function getItemNotBilledHeaderFailureAction(payload) {
  return {
    type: GET_ITEM_NOT_BILLED_HEADER_FAILURE,
    payload
  }
}

export function getItemNotBilledHeaderAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getItemNotBilledHeaderInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetItemsNotBilledHeaderDetails',
        params: payload
      })
      dispatch(getItemNotBilledHeaderSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(),isExpanded: false,IS_GROUP: 'Y'}))))
    } catch (error) {
      dispatch(getItemNotBilledHeaderFailureAction())
    }
  }
}


export function getItemNotBilledHeaderReducer(state = initialStateGetItemNotBilled, action) {
  switch (action.type) {
    case GET_ITEM_NOT_BILLED_HEADER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_NOT_BILLED_HEADER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_NOT_BILLED_HEADER_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_ITEM_NOT_BILLED_HEADER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ITEM_NOT_BILLED_HEADER_FAILURE:
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
/* Main grid when item not billed end */



/* get Filter Summary for main grid when item billed */


const initialStateitemBilledTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_ITEM_BILLED_TOTAL = 'GET_ITEM_BILLED_TOTAL'
const GET_ITEM_BILLED_TOTAL_RESET = 'GET_ITEM_BILLED_TOTAL_RESET'
const GET_ITEM_BILLED_TOTAL_FLAG_RESET = 'GET_ITEM_BILLED_TOTAL_FLAG_RESET'
const GET_ITEM_BILLED_TOTAL_SUCCESS = 'GET_ITEM_BILLED_TOTAL_SUCCESS'
const GET_ITEM_BILLED_TOTAL_FAILURE = 'GET_ITEM_BILLED_TOTAL_FAILURE'

export function getItemBilledTotalResetAction () {
  return {
    type: GET_ITEM_BILLED_TOTAL_RESET
  }
}

export function getItemBilledTotalFlagResetAction () {
  return {
    type: GET_ITEM_BILLED_TOTAL_FLAG_RESET
  }
}

export function getItemBilledTotalInitialAction() {
  return {
    type: GET_ITEM_BILLED_TOTAL
  }
}

export function getItemBilledTotalSuccessAction(payload) {
  return {
    type: GET_ITEM_BILLED_TOTAL_SUCCESS,
    payload,
  }
}

export function getItemBilledTotalFailureAction(payload) {
  return {
    type: GET_ITEM_BILLED_TOTAL_FAILURE,
    payload
  }
}

export function getItemBilledTotalAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getItemBilledTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetInvoiceBilledTotal',
        params: payload
      })
      dispatch(getItemBilledTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Totals' : 'Results Total' }))))
    } catch (error) {
      dispatch(getItemBilledTotalFailureAction(error))
    }
  }
}


export function getItemBilledTotalReducer(state = initialStateitemBilledTotal, action) {
  switch (action.type) {
    case GET_ITEM_BILLED_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_BILLED_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_BILLED_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_ITEM_BILLED_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ITEM_BILLED_TOTAL_FAILURE:
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

/* get Filter Summary for main grid when item billed  end*/
/* get Filter Summary for main grid when item not billed */

const initialStateItemNotBilledTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_ITEM_NOT_BILLED_TOTAL = 'GET_ITEM_NOT_BILLED_TOTAL'
const GET_ITEM_NOT_BILLED_TOTAL_RESET = 'GET_ITEM_NOT_BILLED_TOTAL_RESET'
const GET_ITEM_NOT_BILLED_TOTAL_FLAG_RESET = 'GET_ITEM_NOT_BILLED_TOTAL_FLAG_RESET'
const GET_ITEM_NOT_BILLED_TOTAL_SUCCESS = 'GET_ITEM_NOT_BILLED_TOTAL_SUCCESS'
const GET_ITEM_NOT_BILLED_TOTAL_FAILURE = 'GET_ITEM_NOT_BILLED_TOTAL_FAILURE'

export function getItemNotBilledTotalResetAction () {
  return {
    type: GET_ITEM_NOT_BILLED_TOTAL_RESET
  }
}

export function getItemNotBilledTotalFlagResetAction () {
  return {
    type: GET_ITEM_NOT_BILLED_TOTAL_FLAG_RESET
  }
}

export function getItemNotBilledTotalInitialAction() {
  return {
    type: GET_ITEM_NOT_BILLED_TOTAL
  }
}

export function getItemNotBilledTotalSuccessAction(payload) {
  return {
    type: GET_ITEM_NOT_BILLED_TOTAL_SUCCESS,
    payload,
  }
}

export function getItemNotBilledTotalFailureAction(payload) {
  return {
    type: GET_ITEM_NOT_BILLED_TOTAL_FAILURE,
    payload
  }
}

export function getItemNotBilledTotalAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getItemNotBilledTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetItemsNotBilledFilterTotal',
        params: payload
      })
      dispatch(getItemNotBilledTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Totals' : 'Results Total' }))))
    } catch (error) {
      dispatch(getItemNotBilledTotalFailureAction(error))
    }
  }
}


export function getItemNotBilledTotalReducer(state = initialStateItemNotBilledTotal, action) {
  switch (action.type) {
    case GET_ITEM_NOT_BILLED_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_NOT_BILLED_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ITEM_NOT_BILLED_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_ITEM_NOT_BILLED_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ITEM_NOT_BILLED_TOTAL_FAILURE:
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

/* get Filter Summary for main grid when item not billed end*/



const initialStatesearchAdvancedInvoiceDetails = {
  loading: false,
  error: false,
  flag: false,
  data: []
}
  
  
const SEARCH_ADVANCED_INVOICE_DETAILS = 'SEARCH_ADVANCED_INVOICE_DETAILS'
const SEARCH_ADVANCED_INVOICE_DETAILS_RESET = 'SEARCH_ADVANCED_INVOICE_DETAILS_RESET'
const SEARCH_ADVANCED_INVOICE_DETAILS_SUCCESS = 'SEARCH_ADVANCED_INVOICE_DETAILS_SUCCESS'
const SEARCH_ADVANCED_INVOICE_DETAILS_FAILURE = 'SEARCH_ADVANCED_INVOICE_DETAILS_FAILURE'

export function searchAdvancedInvoiceDetailsResetAction () {
  return {
    type: SEARCH_ADVANCED_INVOICE_DETAILS_RESET
  }
}

export function searchAdvancedInvoiceDetailsInitialAction() {
  return {
    type: SEARCH_ADVANCED_INVOICE_DETAILS
  }
}

export function searchAdvancedInvoiceDetailsSuccessAction(payload) {
  return {
    type: SEARCH_ADVANCED_INVOICE_DETAILS_SUCCESS,
    payload,
  }
}

export function searchAdvancedInvoiceDetailsFailureAction(payload) {
  return {
    type: SEARCH_ADVANCED_INVOICE_DETAILS_FAILURE,
    payload
  }
}

export function searchAdvancedInvoiceDetailsAction (payload,id,searchId) {
  return async (dispatch) => {
    try {
      dispatch(searchAdvancedInvoiceDetailsInitialAction())  
      const response = await apiCall({
          method: 'post',
          url: '/SaveInvoiceAdvanceSearch',
          params: {
            CollectionID: id,
            AdvanceSearchID: (searchId === 0 || searchId === '') ? 0: Number(searchId),
            SaveMode: (searchId === 0 || searchId === '')  ? 'I': 'U',
          },
          data:  payload
        })
     dispatch(searchAdvancedInvoiceDetailsSuccessAction(response))
    } catch (error) {
      dispatch(searchAdvancedInvoiceDetailsFailureAction())
    }
  }
}


export function searchAdvancedInvoiceDetailsReducer(state = initialStatesearchAdvancedInvoiceDetails, action) {
  switch (action.type) {
    case SEARCH_ADVANCED_INVOICE_DETAILS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SEARCH_ADVANCED_INVOICE_DETAILS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SEARCH_ADVANCED_INVOICE_DETAILS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SEARCH_ADVANCED_INVOICE_DETAILS_FAILURE:
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



/*Advanced Search APIS Get Call */
/* 1. Project Number(s) */
/* 1. Project Number(s) end*/
/* 2. Power Invoice Billing Period */
const initialStateInvoicePeriod = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const POWER_INVOICE_PERIOD = 'POWER_INVOICE_PERIOD'
const POWER_INVOICE_PERIOD_RESET = 'POWER_INVOICE_PERIOD_RESET'
const POWER_INVOICE_PERIOD_SUCCESS = 'POWER_INVOICE_PERIOD_SUCCESS'
const POWER_INVOICE_PERIOD_FAILURE = 'POWER_INVOICE_PERIOD_FAILURE'

export function powerInvoiceDetailsPeriodInitialAction() {
  return {
    type: POWER_INVOICE_PERIOD
  }
}

export function powerInvoiceDetailsPeriodResetAction () {
  return {
    type: POWER_INVOICE_PERIOD_RESET
  }
}

export function powerInvoiceDetailsPeriodSuccessAction(payload) {
  return {
    type: POWER_INVOICE_PERIOD_SUCCESS,
    payload,
  }
}

export function powerInvoiceDetailsPeriodFailureAction(payload) {
  return {
    type: POWER_INVOICE_PERIOD_FAILURE,
    payload
  }
}

export function powerInvoiceDetailsPeriodAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(powerInvoiceDetailsPeriodInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetInvoiceBillingPeriodDetails',
          params: payload
      })     
      dispatch(powerInvoiceDetailsPeriodSuccessAction(response))
    } catch (error) {
      dispatch(powerInvoiceDetailsPeriodFailureAction())
    }
  }
}


export function powerInvoiceDetailsPeriodReducer(state = initialStateInvoicePeriod, action) {
  switch (action.type) {
    case POWER_INVOICE_PERIOD:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case POWER_INVOICE_PERIOD_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case POWER_INVOICE_PERIOD_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case POWER_INVOICE_PERIOD_FAILURE:
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

/* 2. Power Invoice Billing Period end */

/* 3. Client Invoice Number  */

const initialStateClientInvoiceNumber = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const CLIENT_INVOICE_NUMBER = 'CLIENT_INVOICE_NUMBER'
const CLIENT_INVOICE_NUMBER_RESET = 'CLIENT_INVOICE_NUMBER_RESET'
const CLIENT_INVOICE_NUMBER_SUCCESS = 'CLIENT_INVOICE_NUMBER_SUCCESS'
const CLIENT_INVOICE_NUMBER_FAILURE = 'CLIENT_INVOICE_NUMBER_FAILURE'

export function clientInvoiceNumberInitialAction() {
  return {
    type: CLIENT_INVOICE_NUMBER
  }
}

export function clientInvoiceNumberResetAction () {
  return {
    type: CLIENT_INVOICE_NUMBER_RESET
  }
}

export function clientInvoiceNumberSuccessAction(payload) {
  return {
    type: CLIENT_INVOICE_NUMBER_SUCCESS,
    payload,
  }
}

export function clientInvoiceNumberFailureAction(payload) {
  return {
    type: CLIENT_INVOICE_NUMBER_FAILURE,
    payload
  }
}

export function clientInvoiceNumberAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(clientInvoiceNumberInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetClientInvoiceNumbersList',
          params: payload
      })     
      dispatch(clientInvoiceNumberSuccessAction(response))
    } catch (error) {
      dispatch(clientInvoiceNumberFailureAction())
    }
  }
}


export function clientInvoiceNumberReducer(state = initialStateClientInvoiceNumber, action) {
  switch (action.type) {
    case CLIENT_INVOICE_NUMBER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case CLIENT_INVOICE_NUMBER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case CLIENT_INVOICE_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case CLIENT_INVOICE_NUMBER_FAILURE:
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


/* 3. Client Invoice Number end*/
/* 4. Oracle PA Draft Number   */

const initialStateOraclePADraftNumber = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const ORACLE_PA_DRAFT_NUMBER = 'ORACLE_PA_DRAFT_NUMBER'
const ORACLE_PA_DRAFT_NUMBER_RESET = 'ORACLE_PA_DRAFT_NUMBER_RESET'
const ORACLE_PA_DRAFT_NUMBER_SUCCESS = 'ORACLE_PA_DRAFT_NUMBER_SUCCESS'
const ORACLE_PA_DRAFT_NUMBER_FAILURE = 'ORACLE_PA_DRAFT_NUMBER_FAILURE'

export function oraclePADraftNumberInitialAction() {
  return {
    type: ORACLE_PA_DRAFT_NUMBER
  }
}

export function oraclePADraftNumberResetAction () {
  return {
    type: ORACLE_PA_DRAFT_NUMBER_RESET
  }
}

export function oraclePADraftNumberSuccessAction(payload) {
  return {
    type: ORACLE_PA_DRAFT_NUMBER_SUCCESS,
    payload,
  }
}

export function oraclePADraftNumberFailureAction(payload) {
  return {
    type: ORACLE_PA_DRAFT_NUMBER_FAILURE,
    payload
  }
}

export function oraclePADraftNumberAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(oraclePADraftNumberInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetOraclePADraftNumbersDetails',
          params: payload
      })     
      dispatch(oraclePADraftNumberSuccessAction(response))
    } catch (error) {
      dispatch(oraclePADraftNumberFailureAction())
    }
  }
}


export function oraclePADraftNumberReducer(state = initialStateOraclePADraftNumber, action) {
  switch (action.type) {
    case ORACLE_PA_DRAFT_NUMBER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case ORACLE_PA_DRAFT_NUMBER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case ORACLE_PA_DRAFT_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case ORACLE_PA_DRAFT_NUMBER_FAILURE:
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

/* 4. Oracle PA Draft Number  end*/
/* 5. Oracle PA Invoice Status */

const initialStateInvoiceStatus = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const ORACLE_INVOICE_DETAILS_STATUS = 'ORACLE_INVOICE_DETAILS_STATUS'
const ORACLE_INVOICE_DETAILS_STATUS_RESET = 'ORACLE_INVOICE_DETAILS_STATUS_RESET'
const ORACLE_INVOICE_DETAILS_STATUS_SUCCESS = 'ORACLE_INVOICE_DETAILS_STATUS_SUCCESS'
const ORACLE_INVOICE_DETAILS_STATUS_FAILURE = 'ORACLE_INVOICE_DETAILS_STATUS_FAILURE'

export function oracleInvoiceDetailsStatusInitialAction() {
  return {
    type: ORACLE_INVOICE_DETAILS_STATUS
  }
}

export function oracleInvoiceDetailsStatusResetAction () {
  return {
    type: ORACLE_INVOICE_DETAILS_STATUS_RESET
  }
}

export function oracleInvoiceDetailsStatusSuccessAction(payload) {
  return {
    type: ORACLE_INVOICE_DETAILS_STATUS_SUCCESS,
    payload,
  }
}

export function oracleInvoiceDetailsStatusFailureAction(payload) {
  return {
    type: ORACLE_INVOICE_DETAILS_STATUS_FAILURE,
    payload
  }
}

export function oracleInvoiceDetailsStatusAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(oracleInvoiceDetailsStatusInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetOrcalePAInvoiceStatusList',
          params: payload
      })     
      dispatch(oracleInvoiceDetailsStatusSuccessAction(response))
    } catch (error) {
      dispatch(oracleInvoiceDetailsStatusFailureAction())
    }
  }
}


export function oracleInvoiceDetailsStatusReducer(state = initialStateInvoiceStatus, action) {
  switch (action.type) {
    case ORACLE_INVOICE_DETAILS_STATUS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case ORACLE_INVOICE_DETAILS_STATUS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case ORACLE_INVOICE_DETAILS_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case ORACLE_INVOICE_DETAILS_STATUS_FAILURE:
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

/* 5. Oracle PA Invoice Status end*/
/* 7. Items Not Billed */
const initialStateItemNotBilled = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const ITEM_NOT_BILLED = 'ITEM_NOT_BILLED'
const ITEM_NOT_BILLED_RESET = 'ITEM_NOT_BILLED_RESET'
const ITEM_NOT_BILLED_SUCCESS = 'ITEM_NOT_BILLED_SUCCESS'
const ITEM_NOT_BILLED_FAILURE = 'ITEM_NOT_BILLED_FAILURE'

export function itemNotBilledInitialAction() {
  return {
    type: ITEM_NOT_BILLED
  }
}

export function itemNotBilledResetAction () {
  return {
    type: ITEM_NOT_BILLED_RESET
  }
}

export function itemNotBilledSuccessAction(payload) {
  return {
    type: ITEM_NOT_BILLED_SUCCESS,
    payload,
  }
}

export function itemNotBilledFailureAction(payload) {
  return {
    type: ITEM_NOT_BILLED_FAILURE,
    payload
  }
}

export function itemNotBilledAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(itemNotBilledInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetItemsNotBilledDetails',
          params: payload
      })     
      dispatch(itemNotBilledSuccessAction(response))
    } catch (error) {
      dispatch(itemNotBilledFailureAction())
    }
  }
}


export function itemNotBilledReducer(state = initialStateItemNotBilled, action) {
  switch (action.type) {
    case ITEM_NOT_BILLED:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case ITEM_NOT_BILLED_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case ITEM_NOT_BILLED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case ITEM_NOT_BILLED_FAILURE:
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


/* 7. Items Not Billed end*/
/* 7. Advanced Search ID*/


const initialStateadvancedSearchInvoiceDetailsId = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_ADVANCED_SEARCH_ID = 'GET_ADVANCED_SEARCH_ID'
const GET_ADVANCED_SEARCH_ID_RESET = 'GET_ADVANCED_SEARCH_ID_RESET'
const GET_ADVANCED_SEARCH_ID_SUCCESS = 'GET_ADVANCED_SEARCH_ID_SUCCESS'
const GET_ADVANCED_SEARCH_ID_FAILURE = 'GET_ADVANCED_SEARCH_ID_FAILURE'

export function advancedSearchInvoiceDetailsIdInitialAction() {
  return {
    type: GET_ADVANCED_SEARCH_ID
  }
}

export function advancedSearchInvoiceDetailsIdResetAction () {
  return {
    type: GET_ADVANCED_SEARCH_ID_RESET
  }
}

export function advancedSearchInvoiceDetailsIdSuccessAction(payload) {
  return {
    type: GET_ADVANCED_SEARCH_ID_SUCCESS,
    payload,
  }
}

export function advancedSearchInvoiceDetailsIdFailureAction(payload) {
  return {
    type: GET_ADVANCED_SEARCH_ID_FAILURE,
    payload
  }
}

export function advancedSearchInvoiceDetailsIdAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(advancedSearchInvoiceDetailsIdInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetInvoiceAdvanceSearchData',
          params: payload
      })     
      dispatch(advancedSearchInvoiceDetailsIdSuccessAction(response.map(d=>d.ADVANCE_SEARCH_ID).join()))
    } catch (error) {
      dispatch(advancedSearchInvoiceDetailsIdFailureAction())
    }
  }
}


export function advancedSearchInvoiceDetailsIdReducer(state = initialStateadvancedSearchInvoiceDetailsId, action) {
  switch (action.type) {
    case GET_ADVANCED_SEARCH_ID:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case GET_ADVANCED_SEARCH_ID_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case GET_ADVANCED_SEARCH_ID_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ADVANCED_SEARCH_ID_FAILURE:
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
/* 7. Advanced Search ID*/





  