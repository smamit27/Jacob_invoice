/*-------------------invoice options (Main Grid)--------------------- */
const SET_SELECTED_INVOICE_ROWS_DATA = "SET_SELECTED_INVOICE_ROWS_DATA";


export function setSelectedInvoiceRowsDataAction(payload) {
    return {
        type: SET_SELECTED_INVOICE_ROWS_DATA,
        payload
    }
}


const initialInvoiceOptionsState = {
    selectedInvoiceRowsData: []
}


export function invoiceOptionsReducer(state = initialInvoiceOptionsState, action) {
    switch (action.type) {
        case SET_SELECTED_INVOICE_ROWS_DATA:
            return {
                ...state,
                selectedInvoiceRowsData: action.payload
            }
        default: return state
    }

}


/*------------------------------------------------------------------- */


/*---------------crate and post batch of invoice model--------------- */



const CREATE_POST_BATCH_INVOICE_MODEL_OPEN = "CREATE_POST_BATCH_INVOICE_MODEL_OPEN";
const CREATE_POST_BATCH_INVOICE_MODEL_CLOSE = "CREATE_POST_BATCH_INVOICE_MODEL_CLOSE";
const GET_BATCH_OF_INVOICES_INITIAL = "GET_BATCH_OF_INVOICES_INITIAL";
const SET_BATCH_OF_INVOICES = "SET_BATCH_OF_INVOICES";
const GET_BATCH_OF_INVOICES_FAILURE = "GET_BATCH_OF_INVOICES_FAILURE";
const SET_SELECTED_BATCH_OF_INVOICE = "SET_SELECTED_BATCH_OF_INVOICE";
const RESET_SELECTED_BATCH_OF_INVOICE = "RESET_SELECTED_BATCH_OF_INVOICE";


export function setSelectedBatchOfInvoicesAction(payload) {
    return {
        type: SET_SELECTED_BATCH_OF_INVOICE,
        payload
    }
}

export function resetSelectedBatchOfInvoicesAction() {
    return {
        type: RESET_SELECTED_BATCH_OF_INVOICE
    }
}

export function getBatchOfInvoicesInitialAction() {
    return {
        type: GET_BATCH_OF_INVOICES_INITIAL
    }
}

export function setBatchOfInvoicesAction(payload) {
    return {
        type: SET_BATCH_OF_INVOICES,
        payload
    }
}

export function getBatchOfInvoicesFailureAction() {
    return {
        type: GET_BATCH_OF_INVOICES_FAILURE
    }
}

export function createPostBatchInvoiceModelOpenAction() {
    return {
        type: CREATE_POST_BATCH_INVOICE_MODEL_OPEN
    }
}

export function createPostBatchInvoiceModelCloseAction() {
    return {
        type: CREATE_POST_BATCH_INVOICE_MODEL_CLOSE
    }
}

const initialCreateBatchInvoiceModelState = {
    isCreatePostBatchInvoiceModelOpen: false,
    batchOfInvoicesData: [],
    isGetBatchOfInvoicesLoading: false,
    selectedBatchOfInvoices: new Set(),
}


export function createBatchInvoiceModelReducer(state = initialCreateBatchInvoiceModelState, action) {
    switch (action.type) {
        case SET_SELECTED_BATCH_OF_INVOICE:
            return {
                ...state,
                selectedBatchOfInvoices: action.payload
            }
        case RESET_SELECTED_BATCH_OF_INVOICE:
            return {
                ...state,
                selectedBatchOfInvoices: new Set()
            }
        case GET_BATCH_OF_INVOICES_INITIAL:
            return {
                ...state,
                isGetBatchOfInvoicesLoading: true
            }
        case SET_BATCH_OF_INVOICES:
            return {
                ...state,
                isGetBatchOfInvoicesLoading: false,
                batchOfInvoicesData: action.payload
            }
        case GET_BATCH_OF_INVOICES_FAILURE:
            return {
                ...state,
                isGetBatchOfInvoicesLoading: false,
                batchOfInvoicesData: []
            }
        case CREATE_POST_BATCH_INVOICE_MODEL_OPEN:
            return {
                ...state,
                isCreatePostBatchInvoiceModelOpen: true
            }
        case CREATE_POST_BATCH_INVOICE_MODEL_CLOSE:
            return {
                ...state,
                isCreatePostBatchInvoiceModelOpen: false
            }
        default: return state
    }
}

/*------------------------------------------------------------------------ */




/*-----------------------------post invoices model------------------------ */

const POST_INVOICES_MODEL_OPEN = "POST_INVOICES_MODEL_OPEN";
const POST_INVOICES_MODEL_CLOSE = "POST_INVOICES_MODEL_CLOSE";


export function setPostInvoicesModelOpenAction() {
    return {
        type: POST_INVOICES_MODEL_OPEN
    }
}

export function setPostInvoicesModelCloseAction() {
    return {
        type: POST_INVOICES_MODEL_CLOSE
    }
}


const initialPostInvoicesModelState = {
    isPostInvoicesModelOpen: false
}


export function postInvoicesModelReducer(state = initialPostInvoicesModelState, action) {
    switch (action.type) {
        case POST_INVOICES_MODEL_OPEN:
            return {
                ...state,
                isPostInvoicesModelOpen: true
            }


        case POST_INVOICES_MODEL_CLOSE:
            return {
                ...state,
                isPostInvoicesModelOpen: false
            }

        default: return state

    }

}




/*------------------------------------------------------------------------ */











/*-----------------create and edit batch of invoice model----------------- */


const CREATE_BATCH_INVOICE_MODEL_OPEN = "CREATE_BATCH_INVOICE_MODEL_OPEN";
const CREATE_BATCH_INVOICE_MODEL_CLOSE = "CREATE_BATCH_INVOICE_MODEL_CLOSE";

const EDIT_BATCH_INVOICE_MODEL_OPEN = "EDIT_BATCH_INVOICE_MODEL_OPEN";
const EDIT_BATCH_INVOICE_MODEL_CLOSE = "EDIT_BATCH_INVOICE_MODEL_CLOSE";
const SET_SELECTED_FIELDS = "SET_SELECTED_FIELDS";
const RESET_SELECTED_FIELDS = "RESET_SELECTED_FIELDS";



export function resetSelectedFieldsAction() {
    return {
        type: RESET_SELECTED_FIELDS
    }
}

export function setSelectedFieldsAction(payload) {
    return {
        type: SET_SELECTED_FIELDS,
        payload
    }
}

export function createBatchInvoiceModelOpenAction() {
    return {
        type: CREATE_BATCH_INVOICE_MODEL_OPEN
    }
}

export function createBatchInvoiceModelCloseAction() {
    return {
        type: CREATE_BATCH_INVOICE_MODEL_CLOSE
    }
}

export function editBatchInvoiceModelOpenAction() {
    return {
        type: EDIT_BATCH_INVOICE_MODEL_OPEN
    }
}

export function editBatchInvoiceModelCloseAction() {
    return {
        type: EDIT_BATCH_INVOICE_MODEL_CLOSE
    }
}

const initialSelectedFieldsValue = () => {
    return {
        isSequentialSelected: true,
        isPreviousBatch: false,
        invoiceType: {},
        billingPeriod: {},
        needToApplyFunding: false,
        applyChange: "",
        invoiceDateCurrent: new Date(),
        lastBatchDetails: [],
        invoiceBatchNumberCurrent: []
    }
}

const initialCreateEditBatchInvoiceModelState = {
    isCreateBatchInvoiceModelOpen: false,
    isEditBatchInvoiceModelOpen: false,
    selectedFields: initialSelectedFieldsValue()
}


export function createEditBatchInvoiceModelReducer(state = initialCreateEditBatchInvoiceModelState, action) {
    switch (action.type) {
        case RESET_SELECTED_FIELDS:
            return {
                ...state,
                selectedFields: initialSelectedFieldsValue()
            }

        case SET_SELECTED_FIELDS:
            return {
                ...state,
                selectedFields: action.payload
            }

        case CREATE_BATCH_INVOICE_MODEL_OPEN:
            return {
                ...state,
                isCreateBatchInvoiceModelOpen: true
            }

        case CREATE_BATCH_INVOICE_MODEL_CLOSE:
            return {
                ...state,
                isCreateBatchInvoiceModelOpen: false
            }
        case EDIT_BATCH_INVOICE_MODEL_OPEN:
            return {
                ...state,
                isEditBatchInvoiceModelOpen: true
            }
        case EDIT_BATCH_INVOICE_MODEL_CLOSE:
            return {
                ...state,
                isEditBatchInvoiceModelOpen: false
            }
        default: return state
    }
}

/*------------------------------------------------------------------------ */



/*-------------------------split invoices model--------------------------- */

const SPLIT_INVOICE_MODEL_OPEN = "SPLIT_INVOICE_MODEL_OPEN";
const SPLIT_INVOICE_MODEL_CLOSE = "SPLIT_INVOICE_MODEL_CLOSE";

const initialSplitInvoiceModelState = {
    isSplitInvoiceModelOpen: false
}

export function splitInvoiceModelOpenAction() {
    return {
        type: SPLIT_INVOICE_MODEL_OPEN
    }
}

export function splitInvoiceModelCloseAction() {
    return {
        type: SPLIT_INVOICE_MODEL_CLOSE
    }
}


export function splitInvoiceModelReducer(state = initialSplitInvoiceModelState, action) {

    switch (action.type) {
        case SPLIT_INVOICE_MODEL_OPEN:
            return {
                ...state,
                isSplitInvoiceModelOpen: true
            }

        case SPLIT_INVOICE_MODEL_CLOSE:
            return {
                ...state,
                isSplitInvoiceModelOpen: false
            }
        default: return state
    }

}



/*------------------------------------------------------------------------ */



/*---------------------split invoice to new batch model------------------- */

const SPLIT_INVOICE_TO_NEW_BATCH_MODEL_OPEN = "SPLIT_INVOICE_TO_NEW_BATCH_MODEL_OPEN";
const SPLIT_INVOICE_TO_NEW_BATCH_MODEL_CLOSE = "SPLIT_INVOICE_TO_NEW_BATCH_MODEL_CLOSE";

const initialSplitInvoiceToNewBatchModelState = {
    isSplitInvoiceToNewBatchModelOpen: false
}

export function splitInvoiceToNewBatchModelOpenAction() {
    return {
        type: SPLIT_INVOICE_TO_NEW_BATCH_MODEL_OPEN
    }
}

export function splitInvoiceToNewBatchModelCloseAction() {
    return {
        type: SPLIT_INVOICE_TO_NEW_BATCH_MODEL_CLOSE
    }
}


export function splitInvoiceToNewBatchModelReducer(state = initialSplitInvoiceToNewBatchModelState, action) {

    switch (action.type) {
        case SPLIT_INVOICE_TO_NEW_BATCH_MODEL_OPEN:
            return {
                ...state,
                isSplitInvoiceToNewBatchModelOpen: true
            }

        case SPLIT_INVOICE_TO_NEW_BATCH_MODEL_CLOSE:
            return {
                ...state,
                isSplitInvoiceToNewBatchModelOpen: false
            }
        default: return state
    }

}


/*------------------------------------------------------------------------ */









/*---------------------split invoice to existing batch model------------------- */

const SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_OPEN = "SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_OPEN";
const SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_CLOSE = "SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_CLOSE";

const initialSplitInvoiceToExistingBatchModelState = {
    isSplitInvoiceToExistingBatchModelOpen: false
}

export function splitInvoiceToExistingBatchModelOpenAction() {
    return {
        type: SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_OPEN
    }
}

export function splitInvoiceToExistingBatchModelCloseAction() {
    return {
        type: SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_CLOSE
    }
}


export function splitInvoiceToExistingBatchModelReducer(state = initialSplitInvoiceToExistingBatchModelState, action) {

    switch (action.type) {
        case SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_OPEN:
            return {
                ...state,
                isSplitInvoiceToExistingBatchModelOpen: true
            }

        case SPLIT_INVOICE_TO_EXISTING_BATCH_MODEL_CLOSE:
            return {
                ...state,
                isSplitInvoiceToExistingBatchModelOpen: false
            }
        default: return state
    }

}


/*------------------------------------------------------------------------ */


