import { apiCall } from "../../../services/httpService"
import { generateRandomString } from "../../../helpers"

/*---------------crate Event Summary invoice model--------------- */
const CREATE_EVENT_INVOICE_MODEL_OPEN = "CREATE_EVENT_INVOICE_MODEL_OPEN";
const CREATE_EVENT_INVOICE_MODEL_CLOSE = "CREATE_EVENT_INVOICE_MODEL_CLOSE";

export function CreateEventOfInvoicesModelOpenAction() {
    return {
        type: CREATE_EVENT_INVOICE_MODEL_OPEN
    }
}

export function CreateEventOfInvoicesModelCloseAction() {
    return {
        type: CREATE_EVENT_INVOICE_MODEL_CLOSE
    }
}

const initialCreateEventInvoiceModelState = {
    isCreateEventOfInvoicesModelOpen: false,
}

export function createEventInvoiceModelReducer(state = initialCreateEventInvoiceModelState, action) {
    switch (action.type) {
        case CREATE_EVENT_INVOICE_MODEL_OPEN:
            return {
                ...state,
                isCreateEventOfInvoicesModelOpen: true
            }
        case CREATE_EVENT_INVOICE_MODEL_CLOSE:
            return {
                ...state,
                isCreateEventOfInvoicesModelOpen: false
            }
        default: return state
    }
}

/*------------------------------------------------------------------------ */

// Invoice create Event Project Number Event Detailse 

const CREATE_EVENT_DETAILSE_MODEL_OPEN = "CREATE_EVENT_DETAILSE_MODEL_OPEN";
const CREATE_EVENT_DETAILSE_MODEL_CLOSE = "CREATE_EVENT_DETAILSE_MODEL_CLOSE";

export function createEventDetailseModelOpenAction() {
    return {
        type: CREATE_EVENT_DETAILSE_MODEL_OPEN
    }
}

export function createEventDetailseModelCloseAction() {
    return {
        type: CREATE_EVENT_DETAILSE_MODEL_CLOSE
    }
}

const createEventDetailseModelState = {
    iscreateEventDetaliseOfInvoicesModelOpen: false,
}
export function createEventDetailseModelReducer(state = createEventDetailseModelState, action) {
    switch (action.type) {
        case CREATE_EVENT_DETAILSE_MODEL_OPEN:
            return {
                ...state,
                iscreateEventDetaliseOfInvoicesModelOpen: true
            }
        case CREATE_EVENT_DETAILSE_MODEL_CLOSE:
            return {
                ...state,
                iscreateEventDetaliseOfInvoicesModelOpen: false
            }
        default: return state
    }
}

/*------------------------------------------------------------------------ */








// const TIA_SUBCONPO_MODAL_OPEN = 'TIA_SUBCONPO_MODAL_OPEN'
// const TIA_SUBCONPO_MODAL_CLOSE = 'TIA_SUBCONPO_MODAL_CLOSE'



// const initialStateTiaSubconpoModal = {
// open: false,
// data: {}
// }



// export function tiaSubconpoModalOpenAction (payload = {}) {
// return {
// type: TIA_SUBCONPO_MODAL_OPEN,
// payload
// }
// }



// export function tiaSubconpoModalCloseAction () {
// return {
// type: TIA_SUBCONPO_MODAL_CLOSE,
// }
// }




// export function tiaSubconpoModalReducer (state = initialStateTiaSubconpoModal, action) {
// switch (action.type) {
// case TIA_SUBCONPO_MODAL_OPEN:
// return {
// ...state,
// open: true,
// data: action.payload
// }
// case TIA_SUBCONPO_MODAL_CLOSE:
// return {
// ...state,
// open: false,
// data: {}
// }
// default:
// return state
// }
// }



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



/* Get Tia subcon po details */



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




// Invoice Details popUp



const TIA_INVOICE_MODAL_OPEN = 'TIA_INVOICE_MODAL_OPEN'
const TIA_INVOICE_MODAL_CLOSE = 'TIA_INVOICE_MODAL_CLOSE'



const initialStateTiaInvoiceModal = {
open: false,
data: {}
}



export function tiaInvoiceModalOpenAction (payload = {}) {
return {
type: TIA_INVOICE_MODAL_OPEN,
payload
}
}



export function tiaInvoiceModalCloseAction () {
return {
type: TIA_INVOICE_MODAL_CLOSE,
}
}




export function tiaInvoiceModalReducer (state = initialStateTiaInvoiceModal, action) {
switch (action.type) {
case TIA_INVOICE_MODAL_OPEN:
return {
...state,
open: true,
data: action.payload
}
case TIA_INVOICE_MODAL_CLOSE:
return {
...state,
open: false,
data: {}
}
default:
return state
}
}



const TIA_INVOICE_EXPORT_MODAL_OPEN = 'TIA_INVOICE_EXPORT_MODAL_OPEN'
const TIA_INVOICE_EXPORT_MODAL_CLOSE = 'TIA_INVOICE_EXPORT_MODAL_CLOSE'



const initialStateTiaInvoiceExportModal = {
open: false,
data: {}
}



export function tiaInvoiceExportModalOpenAction (payload = {}) {
console.log("data")
return {
type: TIA_INVOICE_EXPORT_MODAL_OPEN,
payload
}
}



export function tiaInvoiceExportModalCloseAction () {
return {
type: TIA_INVOICE_EXPORT_MODAL_CLOSE,
}
}




export function tiaInvoiceExportModalReducer (state = initialStateTiaInvoiceExportModal, action) {
switch (action.type) {
case TIA_INVOICE_EXPORT_MODAL_OPEN:
return {
...state,
open: true,
data: action.payload
}
case TIA_INVOICE_EXPORT_MODAL_CLOSE:
return {
...state,
open: false,
data: {}
}
default:
return state
}
}
