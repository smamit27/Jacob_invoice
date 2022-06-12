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

/* Project Invoice Detail get table*/
const tempPI = {  CLIENT_DELIVERY_ORDER_NUMER: "83Y95121" ,
                  ORACLE_PA_INVOICE_STATUS: 'ACTIVE',
                  CLIENT_INVOICE_NUMBER: "DR4434",
                  ORACLE_PA_DRAFT_INVOICE_NUMBER:"PADR4434",
                  ORACLE_AR_INVOICE_NUMBER: "12345678-1",
                  ORACLE_PA_INVOICE_AMOUNT: "50,000",
                  ORACLE_PA_RECIEPT_AMOUNT: "50,000.00",
                  ORACLE_PA_LAST_RECIEPT_DATE: '01-JUL-2021',
                  CLIENT_INVOICE_AND_REPORTS: 'VIEW',
                  ATTACHMENTS: 'VIEW'
                }
const initialStateProjectInvoiceDetailTable = {
  loading: false,
  error: false,
  flag: false,
  data: {  
  }
}



const PROJECT_INVOICE_DETAIL = 'PROJECT_INVOICE_DETAIL'
const PROJECT_INVOICE_DETAIL_RESET = 'PROJECT_INVOICE_DETAIL_RESET'
const PROJECT_INVOICE_DETAIL_SUCCESS = 'PROJECT_INVOICE_DETAIL_SUCCESS'
const PROJECT_INVOICE_DETAIL_FAILURE = 'PROJECT_INVOICE_DETAIL_FAILURE'

export function projectInvoiceDetailReset () {
  return {
    type: PROJECT_INVOICE_DETAIL_RESET
  }
}

export function projectInvoiceDetailInitial() {
  return {
    type: PROJECT_INVOICE_DETAIL
  }
}

export function projectInvoiceDetailSuccess(payload) {
  return {
    type: PROJECT_INVOICE_DETAIL_SUCCESS,
    payload,
  }
}

export function projectInvoiceDetailFailure(payload) {
  return {
    type: PROJECT_INVOICE_DETAIL_FAILURE,
    payload
  }
}

export function projectInvoiceDetail (payload) {
  return async (dispatch) => {
    try {
      dispatch(projectInvoiceDetailInitial())
      const response = await apiCall({
        method: 'get',
        url: `/GetProjectWiseInvoices`,
        params: payload
      })
      dispatch(projectInvoiceDetailSuccess(response.map((d, i) => ({ ...d, tableRowId: generateRandomString()}))))
    } catch (error) {
      dispatch(projectInvoiceDetailFailure(error))
    }
  }
}


export function projectInvoiceDetailReducer(state = initialStateProjectInvoiceDetailTable, action) {
  switch (action.type) {
    case PROJECT_INVOICE_DETAIL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case PROJECT_INVOICE_DETAIL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          
        }
      }
    case PROJECT_INVOICE_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case PROJECT_INVOICE_DETAIL_FAILURE:
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

/*get Filter Summary for project invoice grid */

const initialStateProjectInvoiceSummaryTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_PROJECT_INVOICE_SUMMARY_TOTAL = 'GET_PROJECT_INVOICE_SUMMARY_TOTAL'
const GET_PROJECT_INVOICE_SUMMARY_TOTAL_RESET = 'GET_PROJECT_INVOICE_SUMMARY_TOTAL_RESET'
const GET_PROJECT_INVOICE_SUMMARY_TOTAL_FLAG_RESET = 'GET_PROJECT_INVOICE_SUMMARY_TOTAL_FLAG_RESET'
const GET_PROJECT_INVOICE_SUMMARY_TOTAL_SUCCESS = 'GET_PROJECT_INVOICE_SUMMARY_TOTAL_SUCCESS'
const GET_PROJECT_INVOICE_SUMMARY_TOTAL_FAILURE = 'GET_PROJECT_INVOICE_SUMMARY_TOTAL_FAILURE'

export function getProjectInvoiceSummaryTotalResetAction () {
  return {
    type: GET_PROJECT_INVOICE_SUMMARY_TOTAL_RESET
  }
}

export function getProjectInvoiceSummaryTotalFlagResetAction () {
  return {
    type: GET_PROJECT_INVOICE_SUMMARY_TOTAL_FLAG_RESET
  }
}

export function getProjectInvoiceSummaryTotalInitialAction() {
  return {
    type: GET_PROJECT_INVOICE_SUMMARY_TOTAL
  }
}

export function getProjectInvoiceSummaryTotalSuccessAction(payload) {
  return {
    type: GET_PROJECT_INVOICE_SUMMARY_TOTAL_SUCCESS,
    payload,
  }
}

export function getProjectInvoiceSummaryTotalFailureAction(payload) {
  return {
    type: GET_PROJECT_INVOICE_SUMMARY_TOTAL_FAILURE,
    payload
  }
}

export function getProjectInvoiceSummaryTotalAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProjectInvoiceSummaryTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetInvoiceOverviewProjectFilterTotal',
        params: payload
      })
      dispatch(getProjectInvoiceSummaryTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Totals' : 'Collection Totals' }))))
    } catch (error) {
      dispatch(getProjectInvoiceSummaryTotalFailureAction(error))
    }
  }
}


export function getProjectInvoiceSummaryTotalReducer(state = initialStateProjectInvoiceSummaryTotal, action) {
  switch (action.type) {
    case GET_PROJECT_INVOICE_SUMMARY_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_INVOICE_SUMMARY_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_INVOICE_SUMMARY_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_PROJECT_INVOICE_SUMMARY_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PROJECT_INVOICE_SUMMARY_TOTAL_FAILURE:
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


/*get Filter Summary for project invoice grid end */
/* Project Invoice Detail get table end*/



/* Main grid  invoice pverview get table*/

const temp = 
    {
    CLIENT_DELIVERY_ORDER_NUMER: "DR4434" ,
    PROJECT_GROUP: "GROUP 1" ,
    ORACLE_PA_PROJECT_NUMBER : "12345687" ,
    PROJECT_NAME: "83Y95125" ,
    POWER_INVOICE_BILLING_PERIOD: "SEPTEMBER, 21",
    POWER_INVOICE_BILL_AMOUNT: "50,000",
    ORACLE_PA_INVOICE_AMOUNT: "50,000",
    ORACLE_PA_BILLED_PROJECT_TO_DATE:"350,000.00",
    ORACLE_PA_RECIEPT_AMOUNT: "50,000.00",
    PROJECT_MANAGER_NAME: "NATHANIEL NITZSCHE",
    PROJECT_ACCOUNTANT: 'JANE DOE',
    ORACLE_PA_LAST_RECIEPT_DATE: '01-JULY-2021',
    PROJECT_STATUS: 'ACTIVE',
}


const initialStateProjectInvoiceOverview = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_PROJECT_INVOICE_OVERVIEW = 'GET_PROJECT_INVOICE_OVERVIEW'
const GET_PROJECT_INVOICE_OVERVIEW_RESET = 'GET_PROJECT_INVOICE_OVERVIEW_RESET'
const GET_PROJECT_INVOICE_OVERVIEW_FLAG_RESET = 'GET_PROJECT_INVOICE_OVERVIEW_FLAG_RESET'
const GET_PROJECT_INVOICE_OVERVIEW_SUCCESS = 'GET_PROJECT_INVOICE_OVERVIEW_SUCCESS'
const GET_PROJECT_INVOICE_OVERVIEW_FAILURE = 'GET_PROJECT_INVOICE_OVERVIEW_FAILURE'

export function getProjectInvoiceOverviewResetAction () {
  return {
    type: GET_PROJECT_INVOICE_OVERVIEW_RESET
  }
}

export function getProjectInvoiceOverviewFlagResetAction () {
  return {
    type: GET_PROJECT_INVOICE_OVERVIEW_FLAG_RESET
  }
}

export function getProjectInvoiceOverviewInitialAction() {
  return {
    type: GET_PROJECT_INVOICE_OVERVIEW
  }
}

export function getProjectInvoiceOverviewSuccessAction(payload) {
  return {
    type: GET_PROJECT_INVOICE_OVERVIEW_SUCCESS,
    payload,
  }
}

export function getProjectInvoiceOverviewFailureAction(payload) {
  return {
    type: GET_PROJECT_INVOICE_OVERVIEW_FAILURE,
    payload
  }
}

export function getProjectInvoiceOverviewAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProjectInvoiceOverviewInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetInvoiceOverviewMainGrid',
        params: payload
      })
      console.log(response)
      dispatch(getProjectInvoiceOverviewSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString()}))))
    } catch (error) {
      dispatch(getProjectInvoiceOverviewFailureAction())
    }
  }
}


export function getProjectInvoiceOverviewReducer(state = initialStateProjectInvoiceOverview, action) {
  switch (action.type) {
    case GET_PROJECT_INVOICE_OVERVIEW:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_INVOICE_OVERVIEW_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_INVOICE_OVERVIEW_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_PROJECT_INVOICE_OVERVIEW_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PROJECT_INVOICE_OVERVIEW_FAILURE:
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


/* get Filter Summary for main grid */


const initialStateProjectOverviewSummaryTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_PROJECT_OVERVIEW_SUMMARY_TOTAL = 'GET_PROJECT_OVERVIEW_SUMMARY_TOTAL'
const GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_RESET = 'GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_RESET'
const GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FLAG_RESET = 'GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FLAG_RESET'
const GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_SUCCESS = 'GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_SUCCESS'
const GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FAILURE = 'GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FAILURE'

export function getProjectOverviewSummaryTotalResetAction () {
  return {
    type: GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_RESET
  }
}

export function getProjectOverviewSummaryTotalFlagResetAction () {
  return {
    type: GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FLAG_RESET
  }
}

export function getProjectOverviewSummaryTotalInitialAction() {
  return {
    type: GET_PROJECT_OVERVIEW_SUMMARY_TOTAL
  }
}

export function getProjectOverviewSummaryTotalSuccessAction(payload) {
  return {
    type: GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_SUCCESS,
    payload,
  }
}

export function getProjectOverviewSummaryTotalFailureAction(payload) {
  return {
    type: GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FAILURE,
    payload
  }
}

export function getProjectOverviewSummaryTotalAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProjectOverviewSummaryTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetInvoiceOverviewFilterTotal',
        params: payload.params
      })
      dispatch(getProjectOverviewSummaryTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Totals' : 'Collection Totals' }))))
    } catch (error) {
      dispatch(getProjectOverviewSummaryTotalFailureAction(error))
    }
  }
}


export function getProjectOverviewSummaryTotalReducer(state = initialStateProjectOverviewSummaryTotal, action) {
  switch (action.type) {
    case GET_PROJECT_OVERVIEW_SUMMARY_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PROJECT_OVERVIEW_SUMMARY_TOTAL_FAILURE:
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

/* get Filter summary for main grid end */


const initialStateSearchAdvanced = {
  loading: false,
  error: false,
  flag: false,
  data: []
}
  
  
const SEARCH_ADVANCED = 'SEARCH_ADVANCED'
const SEARCH_ADVANCED_RESET = 'SEARCH_ADVANCED_RESET'
const SEARCH_ADVANCED_SUCCESS = 'SEARCH_ADVANCED_SUCCESS'
const SEARCH_ADVANCED_FAILURE = 'SEARCH_ADVANCED_FAILURE'

export function searchAdvancedResetAction () {
  return {
    type: SEARCH_ADVANCED_RESET
  }
}

export function searchAdvancedInitialAction() {
  return {
    type: SEARCH_ADVANCED
  }
}

export function searchAdvancedSuccessAction(payload) {
  return {
    type: SEARCH_ADVANCED_SUCCESS,
    payload,
  }
}

export function searchAdvancedFailureAction(payload) {
  return {
    type: SEARCH_ADVANCED_FAILURE,
    payload
  }
}

export function searchAdvancedAction (payload,id,searchId) {
  return async (dispatch) => {
    try {
      dispatch(searchAdvancedInitialAction())  
      const response = await apiCall({
          method: 'post',
          url: '/SaveInvoiceOverviewAdvanceSearchData',
          params: {
            collectionId: id,
            advanceSearchId: (searchId === 0 || searchId === '') ? 0: Number(searchId),
            saveMode: (searchId === 0 || searchId === '')  ? 'I': 'U',
          },
          data:  payload
        })
     dispatch(searchAdvancedSuccessAction(response))
    } catch (error) {
      dispatch(searchAdvancedFailureAction())
    }
  }
}


export function searchAdvancedReducer(state = initialStateSearchAdvanced, action) {
  switch (action.type) {
    case SEARCH_ADVANCED:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SEARCH_ADVANCED_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SEARCH_ADVANCED_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SEARCH_ADVANCED_FAILURE:
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



/* Manage Saved View */

const MANAGE_SAVE_VIEW_MODAL_OPEN = 'MANAGE_SAVE_VIEW_MODAL_OPEN'
const MANAGE_SAVE_VIEW_MODAL_CLOSE = 'MANAGE_SAVE_VIEW_MODAL_CLOSE'

const initialStateManageSaveViewModal = {
  open: false,
  data: {}
}
export function manageSaveViewModalOpen(payload = {}) {
  return {
    type: MANAGE_SAVE_VIEW_MODAL_OPEN,
    payload
  }
}

export function manageSaveViewModalClose () {
  return {
    type: MANAGE_SAVE_VIEW_MODAL_CLOSE,
  }
}

export function manageSaveViewModalReducer (state = initialStateManageSaveViewModal, action) {
  switch (action.type) {
    case MANAGE_SAVE_VIEW_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case MANAGE_SAVE_VIEW_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}


/* GET all manage saved view Fields */
const tempMSV = {  VIEW_NAME: "Saved View 1" ,
                   VISIBILITY: 'Public (Collection)',
                  ADDED_BY: "DR4434",
                  ADDED_DATE: "01-JUL-2021",
                  UPDATED_BY: "John",
                  UPDATED_DATE: "20-JUL-2022",
                }

const initialAllManageSavedViews= {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALL_MANAGE_SAVED_VIEWS = 'GET_ALL_MANAGE_SAVED_VIEWS'
const GET_ALL_MANAGE_SAVED_VIEWS_FLAG_RESET = 'GET_ALL_MANAGE_SAVED_VIEWS_FLAG_RESET'
const GET_ALL_MANAGE_SAVED_VIEWS_RESET = 'GET_ALL_MANAGE_SAVED_VIEWS_RESET'
const GET_ALL_MANAGE_SAVED_VIEWS_SUCCESS = 'GET_ALL_MANAGE_SAVED_VIEWS_SUCCESS'
const GET_ALL_MANAGE_SAVED_VIEWS_FAILURE = 'GET_ALL_MANAGE_SAVED_VIEWS_FAILURE'

export function getAllManageSavedViewsResetAction () {
  return {
    type: GET_ALL_MANAGE_SAVED_VIEWS_RESET
  }
}

export function getAllManageSavedViewsFlagResetAction () {
  return {
    type: GET_ALL_MANAGE_SAVED_VIEWS_FLAG_RESET
  }
}

export function getAllManageSavedViewsInitialAction() {
  return {
    type: GET_ALL_MANAGE_SAVED_VIEWS
  }
}

export function getAllManageSavedViewsSuccessAction(payload) {
  return {
    type: GET_ALL_MANAGE_SAVED_VIEWS_SUCCESS,
    payload,
  }
}

export function getAllManageSavedViewsFailureAction(payload) {
  return {
    type: GET_ALL_MANAGE_SAVED_VIEWS_FAILURE,
    payload
  }
}

export function getAllManageSavedViewsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getAllManageSavedViewsInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/',
        params: payload
      })
      dispatch(getAllManageSavedViewsSuccessAction( [tempMSV].map((d, i) => ({ ...d, tableRowId: generateRandomString()}))))
    } catch (error) {
      dispatch(getAllManageSavedViewsFailureAction())
    }
  }
}


export function getAllManageSavedViewsReducer(state = initialAllManageSavedViews, action) {
  switch (action.type) {
    case GET_ALL_MANAGE_SAVED_VIEWS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_MANAGE_SAVED_VIEWS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALL_MANAGE_SAVED_VIEWS_FLAG_RESET:
      return {
        ...state,
        flag: false
      }
    case GET_ALL_MANAGE_SAVED_VIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALL_MANAGE_SAVED_VIEWS_FAILURE:
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



/* Delete Manage Saved view */

const initialDeleteManageSavedViews= {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const DELETE_MANAGE_SAVED_VIEWS = 'DELETE_MANAGE_SAVED_VIEWS'
const DELETE_MANAGE_SAVED_VIEWS_RESET = 'DELETE_MANAGE_SAVED_VIEWS_RESET'
const DELETE_MANAGE_SAVED_VIEWS_SUCCESS = 'DELETE_MANAGE_SAVED_VIEWS_SUCCESS'
const DELETE_MANAGE_SAVED_VIEWS_FAILURE = 'DELETE_MANAGE_SAVED_VIEWS_FAILURE'

export function deleteManageSavedViewsResetAction () {
  return {
    type: DELETE_MANAGE_SAVED_VIEWS_RESET
  }
}

export function deleteManageSavedViewsInitialAction() {
  return {
    type: DELETE_MANAGE_SAVED_VIEWS
  }
}

export function deleteManageSavedViewsSuccessAction(payload) {
  return {
    type: DELETE_MANAGE_SAVED_VIEWS_SUCCESS,
    payload,
  }
}

export function deleteManageSavedViewsFailureAction(payload) {
  return {
    type: DELETE_MANAGE_SAVED_VIEWS_FAILURE,
    payload
  }
}

export function deleteManageSavedViewsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteManageSavedViewsInitialAction())
      const response = await apiCall({
        method: 'delete',
        url: '/',
        data: payload
      })
      dispatch(deleteManageSavedViewsSuccessAction({}))
    } catch (error) {
      dispatch(deleteManageSavedViewsFailureAction())
    }
  }
}


export function deleteManageSavedViewsReducer(state = initialDeleteManageSavedViews, action) {
  switch (action.type) {
    case DELETE_MANAGE_SAVED_VIEWS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_MANAGE_SAVED_VIEWS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_MANAGE_SAVED_VIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_MANAGE_SAVED_VIEWS_FAILURE:
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
/* Create Edit Manage Saved view Field */

const initialStateFormData = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const CREATE_EDIT_MANAGE_SAVED_VIEWS = 'CREATE_EDIT_MANAGE_SAVED_VIEWS'
const CREATE_EDIT_MANAGE_SAVED_VIEWS_RESET = 'CREATE_EDIT_MANAGE_SAVED_VIEWS_RESET'
const CREATE_EDIT_MANAGE_SAVED_VIEWS_SUCCESS = 'CREATE_EDIT_MANAGE_SAVED_VIEWS_SUCCESS'
const CREATE_EDIT_MANAGE_SAVED_VIEWS_FAILURE = 'CREATE_EDIT_MANAGE_SAVED_VIEWS_FAILURE'

export function createEditManageSavedViewsInitialAction() {
  return {
    type: CREATE_EDIT_MANAGE_SAVED_VIEWS
  }
}

export function createEditManageSavedViewsResetAction () {
  return {
    type: CREATE_EDIT_MANAGE_SAVED_VIEWS_RESET
  }
}

export function createEditManageSavedViewsuccessAction(payload) {
  return {
    type: CREATE_EDIT_MANAGE_SAVED_VIEWS_SUCCESS,
    payload,
  }
}

export function createEditManageSavedViewsFailureAction(payload) {
  return {
    type: CREATE_EDIT_MANAGE_SAVED_VIEWS_FAILURE,
    payload
  }
}

export function createEditManageSavedViewsAction (payload,id) {
  return async (dispatch) => {
    try {
      dispatch(createEditManageSavedViewsInitialAction())
      // if (payload.savE_MODE === 'U') {
      //   await apiCall({
      //     method: 'put',
      //     url: '/UpdateContractCeiling',
      //     data: payload
      //   })
      // }
      // if (payload.savE_MODE === 'I') {
      //   await apiCall({
      //     method: 'post',
      //     url: id ? '/SaveContractCeilingTempDetails': '/InsertContractCeiling',
      //     data: payload
      //   })
      // }
      dispatch(createEditManageSavedViewsuccessAction())
    } catch (error) {
      dispatch(createEditManageSavedViewsFailureAction())
    }
  }
}


export function createEditManageSavedViewsReducer(state = initialStateFormData, action) {
  switch (action.type) {
    case CREATE_EDIT_MANAGE_SAVED_VIEWS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_MANAGE_SAVED_VIEWS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_MANAGE_SAVED_VIEWS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case CREATE_EDIT_MANAGE_SAVED_VIEWS_FAILURE:
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
/* Manage Saved View end */

/*Advanced Search APIS Get Call */

/* 1. Power Invoice Billing Period */

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

export function powerInvoicePeriodInitialAction() {
  return {
    type: POWER_INVOICE_PERIOD
  }
}

export function powerInvoicePeriodResetAction () {
  return {
    type: POWER_INVOICE_PERIOD_RESET
  }
}

export function powerInvoicePeriodSuccessAction(payload) {
  return {
    type: POWER_INVOICE_PERIOD_SUCCESS,
    payload,
  }
}

export function powerInvoicePeriodFailureAction(payload) {
  return {
    type: POWER_INVOICE_PERIOD_FAILURE,
    payload
  }
}

export function powerInvoicePeriodAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(powerInvoicePeriodInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetInvoiceBillingPeriodDetails',
          params: payload
      })     
      dispatch(powerInvoicePeriodSuccessAction(response))
    } catch (error) {
      dispatch(powerInvoicePeriodFailureAction())
    }
  }
}


export function powerInvoicePeriodReducer(state = initialStateInvoicePeriod, action) {
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

/* 1. Power Invoice Billing Period end */
/* 2. Project Number(s) */
/* 2. Project Number(s) end*/
/* 3. Project Group(s) */
/* 3.  Project Group end*/
/* 4. Oracle PA Invoice Status */

const initialStateInvoiceStatus = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const ORACLE_INVOICE_STATUS = 'ORACLE_INVOICE_STATUS'
const ORACLE_INVOICE_STATUS_RESET = 'ORACLE_INVOICE_STATUS_RESET'
const ORACLE_INVOICE_STATUS_SUCCESS = 'ORACLE_INVOICE_STATUS_SUCCESS'
const ORACLE_INVOICE_STATUS_FAILURE = 'ORACLE_INVOICE_STATUS_FAILURE'

export function oracleInvoiceStatusInitialAction() {
  return {
    type: ORACLE_INVOICE_STATUS
  }
}

export function oracleInvoiceStatusResetAction () {
  return {
    type: ORACLE_INVOICE_STATUS_RESET
  }
}

export function oracleInvoiceStatusSuccessAction(payload) {
  return {
    type: ORACLE_INVOICE_STATUS_SUCCESS,
    payload,
  }
}

export function oracleInvoiceStatusFailureAction(payload) {
  return {
    type: ORACLE_INVOICE_STATUS_FAILURE,
    payload
  }
}

export function oracleInvoiceStatusAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(oracleInvoiceStatusInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetInvoiceStatus',
          params: payload
      })     
      dispatch(oracleInvoiceStatusSuccessAction(response))
    } catch (error) {
      dispatch(oracleInvoiceStatusFailureAction())
    }
  }
}


export function oracleInvoiceStatusReducer(state = initialStateInvoiceStatus, action) {
  switch (action.type) {
    case ORACLE_INVOICE_STATUS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case ORACLE_INVOICE_STATUS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case ORACLE_INVOICE_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case ORACLE_INVOICE_STATUS_FAILURE:
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

/* 4. Oracle PA Invoice Status end*/
/* 5. Role */


const initialStateRoleList = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_ROLE_LIST = 'GET_ROLE_LIST'
const GET_ROLE_LIST_RESET = 'GET_ROLE_LIST_RESET'
const GET_ROLE_LIST_SUCCESS = 'GET_ROLE_LIST_SUCCESS'
const GET_ROLE_LIST_FAILURE = 'GET_ROLE_LIST_FAILURE'

export function getRoleListInitialAction() {
  return {
    type: GET_ROLE_LIST
  }
}

export function getRoleListResetAction () {
  return {
    type: GET_ROLE_LIST_RESET
  }
}

export function getRoleListSuccessAction(payload) {
  return {
    type: GET_ROLE_LIST_SUCCESS,
    payload,
  }
}

export function getRoleListFailureAction(payload) {
  return {
    type: GET_ROLE_LIST_FAILURE,
    payload
  }
}

export function getRoleListAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getRoleListInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetRoleList',
          params: payload
      })     
      dispatch(getRoleListSuccessAction(response))
    } catch (error) {
      dispatch(getRoleListFailureAction())
    }
  }
}


export function getRoleListReducer(state = initialStateRoleList, action) {
  switch (action.type) {
    case GET_ROLE_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case GET_ROLE_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case GET_ROLE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ROLE_LIST_FAILURE:
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


/* 5. Role end*/
/* 7. Advanced Search ID*/


const initialStateAdvancedSearchId = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_ADVANCED_SEARCH_ID = 'GET_ADVANCED_SEARCH_ID'
const GET_ADVANCED_SEARCH_ID_RESET = 'GET_ADVANCED_SEARCH_ID_RESET'
const GET_ADVANCED_SEARCH_ID_SUCCESS = 'GET_ADVANCED_SEARCH_ID_SUCCESS'
const GET_ADVANCED_SEARCH_ID_FAILURE = 'GET_ADVANCED_SEARCH_ID_FAILURE'

export function advancedSearchIdInitialAction() {
  return {
    type: GET_ADVANCED_SEARCH_ID
  }
}

export function advancedSearchIdResetAction () {
  return {
    type: GET_ADVANCED_SEARCH_ID_RESET
  }
}

export function advancedSearchIdSuccessAction(payload) {
  return {
    type: GET_ADVANCED_SEARCH_ID_SUCCESS,
    payload,
  }
}

export function advancedSearchIdFailureAction(payload) {
  return {
    type: GET_ADVANCED_SEARCH_ID_FAILURE,
    payload
  }
}

export function advancedSearchIdAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(advancedSearchIdInitialAction())
        const response  = await apiCall({
          method: 'get',
          url: '/GetInvoiceOverviewAdvanceSearch',
          params: payload
      })     
      dispatch(advancedSearchIdSuccessAction(response.map(d=>d.ADVANCE_SEARCH_ID).join()))
    } catch (error) {
      dispatch(advancedSearchIdFailureAction())
    }
  }
}


export function advancedSearchIdReducer(state = initialStateAdvancedSearchId, action) {
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





  