import { apiCall } from "../../../services/httpService"
import {  statusNotificationAction,errorStatusNotificationAction } from "../../molecules/StatusNotification/logic";
import { generateRandomString } from "../../../helpers"

/* Subcontract PO Detail */
const SUBCONTRACT_PO_DETAIL_MODAL_OPEN = 'SUBCONTRACT_PO_DETAIL_MODAL_OPEN'
const SUBCONTRACT_PO_DETAIL_MODAL_CLOSE = 'SUBCONTRACT_PO_DETAIL_MODAL_CLOSE'

const initialStateDetailModal = {
  open: false,
  data: {}
}
export function subcontractPODetailModalOpen(payload = {}) {
  return {
    type: SUBCONTRACT_PO_DETAIL_MODAL_OPEN,
    payload
  }
}

export function subcontractPODetailModalClose () {
  return {
    type: SUBCONTRACT_PO_DETAIL_MODAL_CLOSE,
  }
}

export function subcontractPODetailModalReducer (state = initialStateDetailModal, action) {
  switch (action.type) {
    case SUBCONTRACT_PO_DETAIL_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case SUBCONTRACT_PO_DETAIL_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

const initialStateSubcontractDetailTable = {
  loading: false,
  error: false,
  flag: false,
  data: {
  
  }
}


const SUBCONTRACT_PO_DETAIL = 'SUBCONTRACT_PO_DETAIL'
const SUBCONTRACT_PO_DETAIL_RESET = 'SUBCONTRACT_PO_DETAIL_RESET'
const SUBCONTRACT_PO_DETAIL_SUCCESS = 'SUBCONTRACT_PO_DETAIL_SUCCESS'
const SUBCONTRACT_PO_DETAIL_FAILURE = 'SUBCONTRACT_PO_DETAIL_FAILURE'

export function subcontractPODetailReset () {
  return {
    type: SUBCONTRACT_PO_DETAIL_RESET
  }
}

export function subcontractPODetailInitial() {
  return {
    type: SUBCONTRACT_PO_DETAIL
  }
}

export function subcontractPODetailSuccess(payload) {
  return {
    type: SUBCONTRACT_PO_DETAIL_SUCCESS,
    payload,
  }
}

export function subcontractPODetailFailure(payload) {
  return {
    type: SUBCONTRACT_PO_DETAIL_FAILURE,
    payload
  }
}

export function subcontractPODetail (payload) {
  return async (dispatch) => {
    try {
      dispatch(subcontractPODetailInitial())
      const response = await apiCall({
        method: 'get',
        url: `/GetSubContractPoData`,
        params: payload
      })
      dispatch(subcontractPODetailSuccess(response))
    } catch (error) {
      dispatch(subcontractPODetailFailure(error))
    }
  }
}


export function subcontractPODetailReducer(state = initialStateSubcontractDetailTable, action) {
  switch (action.type) {
    case SUBCONTRACT_PO_DETAIL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SUBCONTRACT_PO_DETAIL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          
        }
      }
    case SUBCONTRACT_PO_DETAIL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SUBCONTRACT_PO_DETAIL_FAILURE:
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

/* Client Subcontract PO modal open close logic */

const CLIENT_SUBCONTRACT_PO_MODAL_OPEN = 'CLIENT_SUBCONTRACT_PO_MODAL_OPEN'
const CLIENT_SUBCONTRACT_PO_MODAL_CLOSE = 'CLIENT_SUBCONTRACT_PO_MODAL_CLOSE'

const initialStateModal = {
  open: false,
  data: {}
}

export function clientSubcontractPOModalOpen(payload = {}) {
  return {
    type: CLIENT_SUBCONTRACT_PO_MODAL_OPEN,
    payload
  }
}

export function clientSubcontractPOModalClose () {
  return {
    type: CLIENT_SUBCONTRACT_PO_MODAL_CLOSE,
  }
}


export function clientSubcontractModalReducer (state = initialStateModal, action) {
  switch (action.type) {
    case CLIENT_SUBCONTRACT_PO_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case CLIENT_SUBCONTRACT_PO_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}



/* Getting client Subcontract PO table data */

const initialStateSubcontractsTable = {
  loading: false,
  error: false,
  flag: false,
  data: {
  
  }
}


const CLIENT_SUBCONTRACT_PO_TABLE = 'CLIENT_SUBCONTRACT_PO_TABLE'
const CLIENT_SUBCONTRACT_PO_TABLE_RESET = 'CLIENT_SUBCONTRACT_PO_TABLE_RESET'
const CLIENT_SUBCONTRACT_PO_TABLE_SUCCESS = 'CLIENT_SUBCONTRACT_PO_TABLE_SUCCESS'
const CLIENT_SUBCONTRACT_PO_TABLE_FAILURE = 'CLIENT_SUBCONTRACT_PO_TABLE_FAILURE'

export function clientSubcontractPOTableResetAction () {
  return {
    type: CLIENT_SUBCONTRACT_PO_TABLE_RESET
  }
}

export function clientSubcontractPOTableInitialAction() {
  return {
    type: CLIENT_SUBCONTRACT_PO_TABLE
  }
}

export function clientSubcontractPOTableSuccessAction(payload) {
  return {
    type: CLIENT_SUBCONTRACT_PO_TABLE_SUCCESS,
    payload,
  }
}

export function clientSubcontractPOTableFailureAction(payload) {
  return {
    type: CLIENT_SUBCONTRACT_PO_TABLE_FAILURE,
    payload
  }
}

export function clientSubcontractPOTableAction (payload) {
  return async (dispatch,getState) => {

    try {
      dispatch(clientSubcontractPOTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: `/GetPODetails`,
        params: payload
      })
      dispatch(clientSubcontractPOTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString(), isExpanded: false }))))
    } catch (error) {
      dispatch(clientSubcontractPOTableFailureAction(error))
    }
  }
}

export function clientSubcontractPOTableReducer(state = initialStateSubcontractsTable, action) {
  switch (action.type) {
    case CLIENT_SUBCONTRACT_PO_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case CLIENT_SUBCONTRACT_PO_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          
        }
      }
    case CLIENT_SUBCONTRACT_PO_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case CLIENT_SUBCONTRACT_PO_TABLE_FAILURE:
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


/* Get Subcontract table data */

const initialStateSubcontractTable = {
  loading: false,
  error: false,
  flag: false,
  data: {
  
  }
}


const SUBCONTRACT_MAPPING_TABLE = 'SUBCONTRACT_MAPPING_TABLE'
const SUBCONTRACT_MAPPING_TABLE_RESET = 'SUBCONTRACT_MAPPING_TABLE_RESET'
const SUBCONTRACT_MAPPING_TABLE_SUCCESS = 'SUBCONTRACT_MAPPING_TABLE_SUCCESS'
const SUBCONTRACT_MAPPING_TABLE_FAILURE = 'SUBCONTRACT_MAPPING_TABLE_FAILURE'

export function subcontractTableResetAction () {
  return {
    type: SUBCONTRACT_MAPPING_TABLE_RESET
  }
}

export function subcontractTableInitialAction() {
  return {
    type: SUBCONTRACT_MAPPING_TABLE
  }
}

export function subcontractTableSuccessAction(payload) {
  return {
    type: SUBCONTRACT_MAPPING_TABLE_SUCCESS,
    payload,
  }
}

export function subcontractTableFailureAction(payload) {
  return {
    type: SUBCONTRACT_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function subcontractTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(subcontractTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetSubcontractDetails',
        params: payload
      })
      dispatch(subcontractTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString(), isExpanded: false }))))
      
    } catch (error) {
      dispatch(subcontractTableFailureAction(error))
    }
  }
}
export function subcontractTableReducer(state = initialStateSubcontractTable, action) {
  switch (action.type) {
    case SUBCONTRACT_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SUBCONTRACT_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          rows: [],
        }
      }
    case SUBCONTRACT_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SUBCONTRACT_MAPPING_TABLE_FAILURE:
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

/* Save Subcontractor */


const initialStateSubcontractStatus = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const SUBCONTRACT_MAPPING_STATUS = 'SUBCONTRACT_MAPPING_STATUS'
const SUBCONTRACT_MAPPING_STATUS_RESET = 'SUBCONTRACT_MAPPING_STATUS_RESET'
const SUBCONTRACT_MAPPING_STATUS_SUCCESS = 'SUBCONTRACT_MAPPING_STATUS_SUCCESS'
const SUBCONTRACT_MAPPING_STATUS_FAILURE = 'SUBCONTRACT_MAPPING_STATUS_FAILURE'

export function subcontractStatusResetAction () {
  return {
    type: SUBCONTRACT_MAPPING_STATUS_RESET
  }
}

export function subcontractStatusInitialAction() {
  return {
    type: SUBCONTRACT_MAPPING_STATUS
  }
}

export function subcontractStatusSuccessAction(payload) {
  return {
    type: SUBCONTRACT_MAPPING_STATUS_SUCCESS,
    payload,
  }
}

export function subcontractStatusFailureAction(payload) {
  return {
    type: SUBCONTRACT_MAPPING_STATUS_FAILURE,
    payload
  }
}

export function subcontractStatusAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(subcontractStatusInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/Status',
        params: {Active: 'Y'}
      })
      dispatch(subcontractStatusSuccessAction(response))
      
    } catch (error) {
      dispatch(subcontractStatusFailureAction(error))
    }
  }
}
export function getSubcontractStatusAction (payload,data) {
  return async (dispatch) => {
    try {
   //   dispatch(subcontractStatusInitialAction())
   const response =  await apiCall({
        method: 'post',
        url: '/SaveSubcontractDetails',
        params: payload,
        data
      })
      if(response[0].FINAL_STATUS === "SUCCESS"){
        dispatch(statusNotificationAction({
          type: 'success',
          message: `Subcontractors Summary updated`
        }))
        
      }
    } catch (error) {
      dispatch(subcontractStatusFailureAction(error))
    }
  }
}


export function subcontractStatusReducer(state = initialStateSubcontractStatus, action) {
  switch (action.type) {
    case SUBCONTRACT_MAPPING_STATUS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SUBCONTRACT_MAPPING_STATUS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          rows: [],
        }
      }
    case SUBCONTRACT_MAPPING_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SUBCONTRACT_MAPPING_STATUS_FAILURE:
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

/* Get Subcontract status data */

const initialStateSubcontractSave = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const SAVE_SUBCONTRACTOR_MAPPING = 'SAVE_SUBCONTRACTOR_MAPPING'
const SAVE_SUBCONTRACTOR_MAPPING_RESET = 'SAVE_SUBCONTRACTOR_MAPPING_RESET'
const SAVE_SUBCONTRACTOR_MAPPING_SUCCESS = 'SAVE_SUBCONTRACTOR_MAPPING_SUCCESS'
const SAVE_SUBCONTRACTOR_MAPPING_FAILURE = 'SAVE_SUBCONTRACTOR_MAPPING_FAILURE'

export function saveSubcontractorResetAction () {
  return {
    type: SAVE_SUBCONTRACTOR_MAPPING_RESET
  }
}

export function saveSubcontractorInitialAction() {
  return {
    type: SAVE_SUBCONTRACTOR_MAPPING
  }
}

export function saveSubcontractorSuccessAction(payload) {
  return {
    type: SAVE_SUBCONTRACTOR_MAPPING_SUCCESS,
    payload,
  }
}

export function saveSubcontractorFailureAction(payload) {
  return {
    type: SAVE_SUBCONTRACTOR_MAPPING_FAILURE,
    payload
  }
}

export function saveSubcontractsAction (payload,data) {
  return async (dispatch) => {
    try {
   dispatch(saveSubcontractorInitialAction())
   const response =  await apiCall({
        method: 'post',
        url: '/SaveSubcontractDetails',
        params: payload,
        data
      })
      if(response[0].FINAL_STATUS === "SUCCESS"){
        dispatch(saveSubcontractorSuccessAction(response))

        dispatch(statusNotificationAction({
          type: 'success',
          message: `Subcontractors Summary updated`
        }))
        
      }
    } catch (error) {
      dispatch(subcontractTableFailureAction(error))
    }
  }
}


export function saveSubcontractorReducer(state = initialStateSubcontractSave, action) {
  switch (action.type) {
    case SAVE_SUBCONTRACTOR_MAPPING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SAVE_SUBCONTRACTOR_MAPPING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          rows: [],
        }
      }
    case SAVE_SUBCONTRACTOR_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_SUBCONTRACTOR_MAPPING_FAILURE:
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





/* Post subcontractor PO table data */

const initialStateSaveSubcontractor = {
  loading: false,
  error: false,
  flag: false,
  data: {
  
  }
}


const SUBCONTRACT_PO = 'SUBCONTRACT_PO'
const SUBCONTRACT_PO_RESET = 'SUBCONTRACT_PO_RESET'
const SUBCONTRACT_PO_SUCCESS = 'SUBCONTRACT_PO_SUCCESS'
const SUBCONTRACT_PO_FAILURE = 'SUBCONTRACT_PO_FAILURE'

export function subcontractorPOResetAction () {
  return {
    type: SUBCONTRACT_PO_RESET
  }
}

export function subcontractorPOInitialAction() {
  return {
    type: SUBCONTRACT_PO
  }
}

export function subcontractorPOSuccessAction(payload) {
  return {
    type: SUBCONTRACT_PO_SUCCESS,
    payload,
  }
}

export function subcontractorPOFailureAction(payload) {
  return {
    type: SUBCONTRACT_PO_FAILURE,
    payload
  }
}


export function saveSubcontractorPOAction (payload,data) {
  return async (dispatch) => {
    try {
   //   dispatch(subcontractTableInitialAction())
   const response =await apiCall({
        method: 'post',
        url: '/SavePODetails',
        params: payload,
        data
      })

      if(response[0].FINAL_STATUS === "SUCCESS"){
        dispatch(statusNotificationAction({
          type: 'success',
          message: `Purchase orders  updated`
        }))
        dispatch(subcontractorPOSuccessAction(response))

      }
    } catch (error) {
      dispatch(subcontractorPOFailureAction(error))
    }
  }
}


export function subcontractorPOReducer(state = initialStateSaveSubcontractor, action) {
  switch (action.type) {
    case SUBCONTRACT_PO:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SUBCONTRACT_PO_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          
        }
      }
    case SUBCONTRACT_PO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SUBCONTRACT_PO_FAILURE:
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

/* Subcontractor PO Summary */

const initialStatePOSummaryTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL = 'GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL'
const GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_RESET = 'GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_RESET'
const GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FLAG_RESET = 'GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FLAG_RESET'
const GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_SUCCESS = 'GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_SUCCESS'
const GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FAILURE = 'GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FAILURE'

export function getSubcontractorPOSummaryTotalResetAction () {
  return {
    type: GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_RESET
  }
}

export function getSubcontractorPOSummaryTotalFlagResetAction () {
  return {
    type: GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FLAG_RESET
  }
}

export function getSubcontractorPOSummaryTotalInitialAction() {
  return {
    type: GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL
  }
}

export function getSubcontractorPOSummaryTotalSuccessAction(payload) {
  return {
    type: GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_SUCCESS,
    payload,
  }
}

export function getSubcontractorPOSummaryTotalFailureAction(payload) {
  return {
    type: GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FAILURE,
    payload
  }
}

export function getSubcontractorPOSummaryTotalAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getSubcontractorPOSummaryTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetSubcontractFilterTotalDetails',
        params: payload
      })
      dispatch(getSubcontractorPOSummaryTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Totals' : 'Subcontractor Totals' }))))
    } catch (error) {
      dispatch(getSubcontractorPOSummaryTotalFailureAction(error))
    }
  }
}


export function getSubcontractorPOSummaryTotalReducer(state = initialStatePOSummaryTotal, action) {
  switch (action.type) {
    case GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_SUBCONTRACTOR_PO_SUMMARY_TOTAL_FAILURE:
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



/* Subcontractor PO Summary end */

const initialStatePODetailSummaryTotal = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_SUBCONTRACTOR_PO_DETAIL_TOTAL = 'GET_SUBCONTRACTOR_PO_DETAIL_TOTAL'
const GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_RESET = 'GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_RESET'
const GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FLAG_RESET = 'GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FLAG_RESET'
const GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_SUCCESS = 'GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_SUCCESS'
const GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FAILURE = 'GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FAILURE'

export function getSubcontractorPODetailTotalResetAction () {
  return {
    type: GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_RESET
  }
}

export function getSubcontractorPODetailTotalFlagResetAction () {
  return {
    type: GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FLAG_RESET
  }
}

export function getSubcontractorPODetailTotalInitialAction() {
  return {
    type: GET_SUBCONTRACTOR_PO_DETAIL_TOTAL
  }
}

export function getSubcontractorPODetailTotalSuccessAction(payload) {
  return {
    type: GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_SUCCESS,
    payload,
  }
}

export function getSubcontractorPODetailTotalFailureAction(payload) {
  return {
    type: GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FAILURE,
    payload
  }
}

export function getSubcontractorPODetailTotalAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getSubcontractorPODetailTotalInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetPODetailsTotal',
        params: payload
      })
      dispatch(getSubcontractorPODetailTotalSuccessAction(response.map((d, i) => ({ ...d, tableRowId: generateRandomString(), title: i === 0 ? 'Filtered Total' : 'PO Total' }))))
    } catch (error) {
      dispatch(getSubcontractorPODetailTotalFailureAction(error))
    }
  }
}


export function getSubcontractorPODetailTotalReducer(state = initialStatePODetailSummaryTotal, action) {
  switch (action.type) {
    case GET_SUBCONTRACTOR_PO_DETAIL_TOTAL:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_SUBCONTRACTOR_PO_DETAIL_TOTAL_FAILURE:
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


