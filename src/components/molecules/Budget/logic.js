import { generateRandomString } from "../../../helpers"
import { apiCall } from "../../../services/httpService"


/* Get budget table data */

const initialStateBudgetTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BUDGET_TABLE = 'BUDGET_TABLE'
const BUDGET_TABLE_RESET = 'BUDGET_TABLE_RESET'
const BUDGET_TABLE_FLAG_RESET = 'BUDGET_TABLE_FLAG_RESET'
const BUDGET_TABLE_SUCCESS = 'BUDGET_TABLE_SUCCESS'
const BUDGET_TABLE_FAILURE = 'BUDGET_TABLE_FAILURE'

export function budgetTableResetAction () {
  return {
    type: BUDGET_TABLE_RESET
  }
}

export function budgetTableFlagResetAction () {
  return {
    type: BUDGET_TABLE_FLAG_RESET
  }
}

export function budgetTableInitialAction() {
  return {
    type: BUDGET_TABLE
  }
}

export function budgetTableSuccessAction(payload) {
  return {
    type: BUDGET_TABLE_SUCCESS,
    payload,
  }
}

export function budgetTableFailureAction(payload) {
  return {
    type: BUDGET_TABLE_FAILURE,
    payload
  }
}

export function budgetTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(budgetTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBudgetHeaderData',
        params: payload
      })
      dispatch(budgetTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString(), isExpanded: false }))))
    } catch (error) {
      dispatch(budgetTableFailureAction(error))
    }
  }
}


export function budgetTableReducer(state = initialStateBudgetTable, action) {
  switch (action.type) {
    case BUDGET_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BUDGET_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BUDGET_TABLE_FAILURE:
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

/* save budget table data */

const initialStateBudgetTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_BUDGET_TABLE = 'SAVE_BUDGET_TABLE'
const SAVE_BUDGET_TABLE_RESET = 'SAVE_BUDGET_TABLE_RESET'
const SAVE_BUDGET_TABLE_SUCCESS = 'SAVE_BUDGET_TABLE_SUCCESS'
const SAVE_BUDGET_TABLE_FAILURE = 'SAVE_BUDGET_TABLE_FAILURE'

export function saveBudgetTableResetAction () {
  return {
    type: SAVE_BUDGET_TABLE_RESET
  }
}

export function saveBudgetTableInitialAction() {
  return {
    type: SAVE_BUDGET_TABLE
  }
}

export function saveBudgetTableSuccessAction(payload) {
  return {
    type: SAVE_BUDGET_TABLE_SUCCESS,
    payload,
    message: 'Budget table updated successfully.',
    showNotification: true
  }
}

export function saveBudgetTableFailureAction(payload) {
  return {
    type: SAVE_BUDGET_TABLE_FAILURE,
    payload
  }
}

export function saveBudgetTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveBudgetTableInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveBudgetDetails',
        data: payload.data,
        params: payload.params
      })
      dispatch(saveBudgetTableSuccessAction(response))
    } catch (error) {
      dispatch(saveBudgetTableFailureAction(error))
    }
  }
}


export function saveBudgetTableReducer(state = initialStateBudgetTableSave, action) {
  switch (action.type) {
    case SAVE_BUDGET_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_BUDGET_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_BUDGET_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_BUDGET_TABLE_FAILURE:
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
  

/* get budget task groups list */

const initialStateBudgetTaskGroupsList = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BUDGET_TASK_GROUPS_LIST = 'BUDGET_TASK_GROUPS_LIST'
const BUDGET_TASK_GROUPS_LIST_RESET = 'BUDGET_TASK_GROUPS_LIST_RESET'
const BUDGET_TASK_GROUPS_LIST_FLAG_RESET = 'BUDGET_TASK_GROUPS_LIST_FLAG_RESET'
const BUDGET_TASK_GROUPS_LIST_SUCCESS = 'BUDGET_TASK_GROUPS_LIST_SUCCESS'
const BUDGET_TASK_GROUPS_LIST_FAILURE = 'BUDGET_TASK_GROUPS_LIST_FAILURE'

export function budgetTaskGroupsListResetAction () {
  return {
    type: BUDGET_TASK_GROUPS_LIST_RESET
  }
}

export function budgetTaskGroupsListFlagResetAction () {
  return {
    type: BUDGET_TASK_GROUPS_LIST_FLAG_RESET
  }
}

export function budgetTaskGroupsListInitialAction() {
  return {
    type: BUDGET_TASK_GROUPS_LIST
  }
}

export function budgetTaskGroupsListSuccessAction(payload) {
  return {
    type: BUDGET_TASK_GROUPS_LIST_SUCCESS,
    payload,
  }
}

export function budgetTaskGroupsListFailureAction(payload) {
  return {
    type: BUDGET_TASK_GROUPS_LIST_FAILURE,
    payload
  }
}

export function budgetTaskGroupsListAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(budgetTaskGroupsListInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBudgetTaskGroupData',
        params: payload
      })
      dispatch(budgetTaskGroupsListSuccessAction(response))
    } catch (error) {
      dispatch(budgetTaskGroupsListFailureAction(error))
    }
  }
}


export function budgetTaskGroupsListReducer(state = initialStateBudgetTaskGroupsList, action) {
  switch (action.type) {
    case BUDGET_TASK_GROUPS_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_TASK_GROUPS_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_TASK_GROUPS_LIST_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BUDGET_TASK_GROUPS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BUDGET_TASK_GROUPS_LIST_FAILURE:
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


/* get budget expenditure 1 dropdown options */

const initialStateBudgetExpenditure1Dropdown = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BUDGET_EXPENDITURE_1_DROPDOWN = 'BUDGET_EXPENDITURE_1_DROPDOWN'
const BUDGET_EXPENDITURE_1_DROPDOWN_RESET = 'BUDGET_EXPENDITURE_1_DROPDOWN_RESET'
const BUDGET_EXPENDITURE_1_DROPDOWN_FLAG_RESET = 'BUDGET_EXPENDITURE_1_DROPDOWN_FLAG_RESET'
const BUDGET_EXPENDITURE_1_DROPDOWN_SUCCESS = 'BUDGET_EXPENDITURE_1_DROPDOWN_SUCCESS'
const BUDGET_EXPENDITURE_1_DROPDOWN_FAILURE = 'BUDGET_EXPENDITURE_1_DROPDOWN_FAILURE'

export function budgetExpenditure1DropdownResetAction () {
  return {
    type: BUDGET_EXPENDITURE_1_DROPDOWN_RESET
  }
}

export function budgetExpenditure1DropdownFlagResetAction () {
  return {
    type: BUDGET_EXPENDITURE_1_DROPDOWN_FLAG_RESET
  }
}

export function budgetExpenditure1DropdownInitialAction() {
  return {
    type: BUDGET_EXPENDITURE_1_DROPDOWN
  }
}

export function budgetExpenditure1DropdownSuccessAction(payload) {
  return {
    type: BUDGET_EXPENDITURE_1_DROPDOWN_SUCCESS,
    payload,
  }
}

export function budgetExpenditure1DropdownFailureAction(payload) {
  return {
    type: BUDGET_EXPENDITURE_1_DROPDOWN_FAILURE,
    payload,
    hideNotification: true
  }
}

export function budgetExpenditure1DropdownAction (payload = {}) {
  return async (dispatch) => {
    try {
      dispatch(budgetExpenditure1DropdownInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetExpenditure1List',
        params: payload
      })
      dispatch(budgetExpenditure1DropdownSuccessAction(response))
    } catch (error) {
      dispatch(budgetExpenditure1DropdownFailureAction(error))
    }
  }
}


export function budgetExpenditure1DropdownReducer(state = initialStateBudgetExpenditure1Dropdown, action) {
  switch (action.type) {
    case BUDGET_EXPENDITURE_1_DROPDOWN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_EXPENDITURE_1_DROPDOWN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_EXPENDITURE_1_DROPDOWN_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BUDGET_EXPENDITURE_1_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BUDGET_EXPENDITURE_1_DROPDOWN_FAILURE:
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


/* get budget expenditure 2 dropdown options */

const initialStateBudgetExpenditure2Dropdown = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BUDGET_EXPENDITURE_2_DROPDOWN = 'BUDGET_EXPENDITURE_2_DROPDOWN'
const BUDGET_EXPENDITURE_2_DROPDOWN_RESET = 'BUDGET_EXPENDITURE_2_DROPDOWN_RESET'
const BUDGET_EXPENDITURE_2_DROPDOWN_FLAG_RESET = 'BUDGET_EXPENDITURE_2_DROPDOWN_FLAG_RESET'
const BUDGET_EXPENDITURE_2_DROPDOWN_SUCCESS = 'BUDGET_EXPENDITURE_2_DROPDOWN_SUCCESS'
const BUDGET_EXPENDITURE_2_DROPDOWN_FAILURE = 'BUDGET_EXPENDITURE_2_DROPDOWN_FAILURE'

export function budgetExpenditure2DropdownResetAction () {
  return {
    type: BUDGET_EXPENDITURE_2_DROPDOWN_RESET
  }
}

export function budgetExpenditure2DropdownFlagResetAction () {
  return {
    type: BUDGET_EXPENDITURE_2_DROPDOWN_FLAG_RESET
  }
}

export function budgetExpenditure2DropdownInitialAction() {
  return {
    type: BUDGET_EXPENDITURE_2_DROPDOWN
  }
}

export function budgetExpenditure2DropdownSuccessAction(payload) {
  return {
    type: BUDGET_EXPENDITURE_2_DROPDOWN_SUCCESS,
    payload,
  }
}

export function budgetExpenditure2DropdownFailureAction(payload) {
  return {
    type: BUDGET_EXPENDITURE_2_DROPDOWN_FAILURE,
    payload,
    hideNotification: true
  }
}

export function budgetExpenditure2DropdownAction (payload = {}) {
  return async (dispatch) => {
    try {
      dispatch(budgetExpenditure2DropdownInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetExpenditure2List',
        params: payload
      })
      dispatch(budgetExpenditure2DropdownSuccessAction(response))
    } catch (error) {
      dispatch(budgetExpenditure2DropdownFailureAction(error))
    }
  }
}


export function budgetExpenditure2DropdownReducer(state = initialStateBudgetExpenditure2Dropdown, action) {
  switch (action.type) {
    case BUDGET_EXPENDITURE_2_DROPDOWN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_EXPENDITURE_2_DROPDOWN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_EXPENDITURE_2_DROPDOWN_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BUDGET_EXPENDITURE_2_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BUDGET_EXPENDITURE_2_DROPDOWN_FAILURE:
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

/* get budget subcontractor dropdown options */

const initialStateBudgetSubcontractorDropdown = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const BUDGET_SUBCONTRACTOR_DROPDOWN = 'BUDGET_SUBCONTRACTOR_DROPDOWN'
const BUDGET_SUBCONTRACTOR_DROPDOWN_RESET = 'BUDGET_SUBCONTRACTOR_DROPDOWN_RESET'
const BUDGET_SUBCONTRACTOR_DROPDOWN_FLAG_RESET = 'BUDGET_SUBCONTRACTOR_DROPDOWN_FLAG_RESET'
const BUDGET_SUBCONTRACTOR_DROPDOWN_SUCCESS = 'BUDGET_SUBCONTRACTOR_DROPDOWN_SUCCESS'
const BUDGET_SUBCONTRACTOR_DROPDOWN_FAILURE = 'BUDGET_SUBCONTRACTOR_DROPDOWN_FAILURE'

export function budgetSubcontractorDropdownResetAction () {
  return {
    type: BUDGET_SUBCONTRACTOR_DROPDOWN_RESET
  }
}

export function budgetSubcontractorDropdownFlagResetAction () {
  return {
    type: BUDGET_SUBCONTRACTOR_DROPDOWN_FLAG_RESET
  }
}

export function budgetSubcontractorDropdownInitialAction() {
  return {
    type: BUDGET_SUBCONTRACTOR_DROPDOWN
  }
}

export function budgetSubcontractorDropdownSuccessAction(payload) {
  return {
    type: BUDGET_SUBCONTRACTOR_DROPDOWN_SUCCESS,
    payload,
  }
}

export function budgetSubcontractorDropdownFailureAction(payload) {
  return {
    type: BUDGET_SUBCONTRACTOR_DROPDOWN_FAILURE,
    payload,
    hideNotification: true
  }
}

export function budgetSubcontractorDropdownAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(budgetSubcontractorDropdownInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetSubContractorsList',
        params: payload
      })
      dispatch(budgetSubcontractorDropdownSuccessAction(response))
    } catch (error) {
      dispatch(budgetSubcontractorDropdownFailureAction(error))
    }
  }
}


export function budgetSubcontractorDropdownReducer(state = initialStateBudgetSubcontractorDropdown, action) {
  switch (action.type) {
    case BUDGET_SUBCONTRACTOR_DROPDOWN:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_SUBCONTRACTOR_DROPDOWN_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case BUDGET_SUBCONTRACTOR_DROPDOWN_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case BUDGET_SUBCONTRACTOR_DROPDOWN_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case BUDGET_SUBCONTRACTOR_DROPDOWN_FAILURE:
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
