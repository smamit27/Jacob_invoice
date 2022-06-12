import { generateRandomString } from "../../../helpers"
import { apiCall } from "../../../services/httpService"
import { allocateDummy } from "./constants"


/* Get funding table data */

const initialStateFundingTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const FUNDING_TABLE = 'FUNDING_TABLE'
const FUNDING_TABLE_RESET = 'FUNDING_TABLE_RESET'
const FUNDING_TABLE_FLAG_RESET = 'FUNDING_TABLE_FLAG_RESET'
const FUNDING_TABLE_SUCCESS = 'FUNDING_TABLE_SUCCESS'
const FUNDING_TABLE_FAILURE = 'FUNDING_TABLE_FAILURE'

export function fundingTableResetAction () {
  return {
    type: FUNDING_TABLE_RESET
  }
}

export function fundingTableFlagResetAction () {
  return {
    type: FUNDING_TABLE_FLAG_RESET
  }
}

export function fundingTableInitialAction() {
  return {
    type: FUNDING_TABLE
  }
}

export function fundingTableSuccessAction(payload) {
  return {
    type: FUNDING_TABLE_SUCCESS,
    payload,
  }
}

export function fundingTableFailureAction(payload) {
  return {
    type: FUNDING_TABLE_FAILURE,
    payload
  }
}

export function fundingTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(fundingTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetFundingDetails',
        params: payload
      })
      dispatch(fundingTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString(), isExpanded: false }))))
    } catch (error) {
      dispatch(fundingTableFailureAction(error))
    }
  }
}


export function fundingTableReducer(state = initialStateFundingTable, action) {
  switch (action.type) {
    case FUNDING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case FUNDING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case FUNDING_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case FUNDING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case FUNDING_TABLE_FAILURE:
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

/* save funding table data */

const initialStateFundingTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_FUNDING_TABLE = 'SAVE_FUNDING_TABLE'
const SAVE_FUNDING_TABLE_RESET = 'SAVE_FUNDING_TABLE_RESET'
const SAVE_FUNDING_TABLE_SUCCESS = 'SAVE_FUNDING_TABLE_SUCCESS'
const SAVE_FUNDING_TABLE_FAILURE = 'SAVE_FUNDING_TABLE_FAILURE'

export function saveFundingTableResetAction () {
  return {
    type: SAVE_FUNDING_TABLE_RESET
  }
}

export function saveFundingTableInitialAction() {
  return {
    type: SAVE_FUNDING_TABLE
  }
}

export function saveFundingTableSuccessAction(payload) {
  return {
    type: SAVE_FUNDING_TABLE_SUCCESS,
    payload,
    message: 'Funding table updated successfully',
    showNotification: true
  }
}

export function saveFundingTableFailureAction(payload) {
  return {
    type: SAVE_FUNDING_TABLE_FAILURE,
    payload
  }
}

export function saveFundingTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveFundingTableInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveFundingData',
        data: payload.data,
        params: payload.params
      })
      dispatch(saveFundingTableSuccessAction(response))
    } catch (error) {
      dispatch(saveFundingTableFailureAction(error))
    }
  }
}


export function saveFundingTableReducer(state = initialStateFundingTableSave, action) {
  switch (action.type) {
    case SAVE_FUNDING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_FUNDING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_FUNDING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_FUNDING_TABLE_FAILURE:
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
  
/* Allocate to task modal open close logic */

const ALLOCATE_TO_TASK_MODAL_OPEN = 'ALLOCATE_TO_TASK_MODAL_OPEN'
const ALLOCATE_TO_TASK_MODAL_CLOSE = 'ALLOCATE_TO_TASK_MODAL_CLOSE'

const initialStateAllocateTask = {
  open: false,
  data: {}
}

export function allocateToTaskModalOpenAction (payload = {}) {
  return {
    type: ALLOCATE_TO_TASK_MODAL_OPEN,
    payload
  }
}

export function allocateToTaskModalCloseAction () {
  return {
    type: ALLOCATE_TO_TASK_MODAL_CLOSE,
  }
}


export function allocateToTaskModalReducer (state = initialStateAllocateTask, action) {
  switch (action.type) {
    case ALLOCATE_TO_TASK_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case ALLOCATE_TO_TASK_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* Get allocate to task list */

const initialStateGetAllocateToTaskList = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_ALLOCATE_TO_TASK_LIST = 'GET_ALLOCATE_TO_TASK_LIST'
const GET_ALLOCATE_TO_TASK_LIST_RESET = 'GET_ALLOCATE_TO_TASK_LIST_RESET'
const GET_ALLOCATE_TO_TASK_LIST_FLAG_RESET = 'GET_ALLOCATE_TO_TASK_LIST_FLAG_RESET'
const GET_ALLOCATE_TO_TASK_LIST_SUCCESS = 'GET_ALLOCATE_TO_TASK_LIST_SUCCESS'
const GET_ALLOCATE_TO_TASK_LIST_FAILURE = 'GET_ALLOCATE_TO_TASK_LIST_FAILURE'

export function getAllocateToTaskListResetAction () {
  return {
    type: GET_ALLOCATE_TO_TASK_LIST_RESET
  }
}

export function getAllocateToTaskListFlagResetAction () {
  return {
    type: GET_ALLOCATE_TO_TASK_LIST_FLAG_RESET
  }
}

export function getAllocateToTaskListInitialAction() {
  return {
    type: GET_ALLOCATE_TO_TASK_LIST
  }
}

export function getAllocateToTaskListSuccessAction(payload) {
  return {
    type: GET_ALLOCATE_TO_TASK_LIST_SUCCESS,
    payload,
  }
}

export function getAllocateToTaskListFailureAction(payload) {
  return {
    type: GET_ALLOCATE_TO_TASK_LIST_FAILURE,
    payload
  }
}


export function getAllocateToTaskListAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getAllocateToTaskListInitialAction())
      const response = await apiCall({
        method: 'get',
        url: payload.url,
        params: payload.params
      })
      // dispatch(getAllocateToTaskListSuccessAction(allocateDummy))
      dispatch(getAllocateToTaskListSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString() }))))
    } catch (error) {
      dispatch(getAllocateToTaskListFailureAction(error))
    }
  }
}


export function getAllocateToTaskListReducer(state = initialStateGetAllocateToTaskList, action) {
  switch (action.type) {
    case GET_ALLOCATE_TO_TASK_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLOCATE_TO_TASK_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLOCATE_TO_TASK_LIST_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_ALLOCATE_TO_TASK_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALLOCATE_TO_TASK_LIST_FAILURE:
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

/* get funding task groups list */

const initialStateFundingTaskGroupsList = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const FUNDING_TASK_GROUPS_LIST = 'FUNDING_TASK_GROUPS_LIST'
const FUNDING_TASK_GROUPS_LIST_RESET = 'FUNDING_TASK_GROUPS_LIST_RESET'
const FUNDING_TASK_GROUPS_LIST_FLAG_RESET = 'FUNDING_TASK_GROUPS_LIST_FLAG_RESET'
const FUNDING_TASK_GROUPS_LIST_SUCCESS = 'FUNDING_TASK_GROUPS_LIST_SUCCESS'
const FUNDING_TASK_GROUPS_LIST_FAILURE = 'FUNDING_TASK_GROUPS_LIST_FAILURE'

export function fundingTaskGroupsListResetAction () {
  return {
    type: FUNDING_TASK_GROUPS_LIST_RESET
  }
}

export function fundingTaskGroupsListFlagResetAction () {
  return {
    type: FUNDING_TASK_GROUPS_LIST_FLAG_RESET
  }
}

export function fundingTaskGroupsListInitialAction() {
  return {
    type: FUNDING_TASK_GROUPS_LIST
  }
}

export function fundingTaskGroupsListSuccessAction(payload) {
  return {
    type: FUNDING_TASK_GROUPS_LIST_SUCCESS,
    payload,
  }
}

export function fundingTaskGroupsListFailureAction(payload) {
  return {
    type: FUNDING_TASK_GROUPS_LIST_FAILURE,
    payload
  }
}

export function fundingTaskGroupsListAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(fundingTaskGroupsListInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetFundingTaskGroupData',
        params: payload.params
      })
      dispatch(fundingTaskGroupsListSuccessAction(response.map(({ CLIENT_TASK_GROUP_ID , ...rest }) => ({
        ...rest,
        TASK_GROUP_ID: CLIENT_TASK_GROUP_ID,
        ...payload.extraResponse,
        tableRowId: generateRandomString(),
      }))))
    } catch (error) {
      dispatch(fundingTaskGroupsListFailureAction(error))
    }
  }
}


export function fundingTaskGroupsListReducer(state = initialStateFundingTaskGroupsList, action) {
  switch (action.type) {
    case FUNDING_TASK_GROUPS_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case FUNDING_TASK_GROUPS_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case FUNDING_TASK_GROUPS_LIST_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case FUNDING_TASK_GROUPS_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case FUNDING_TASK_GROUPS_LIST_FAILURE:
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


/* get funding source list */

const initialStateFundingSourceList = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const FUNDING_SOURCE_LIST = 'FUNDING_SOURCE_LIST'
const FUNDING_SOURCE_LIST_RESET = 'FUNDING_SOURCE_LIST_RESET'
const FUNDING_SOURCE_LIST_FLAG_RESET = 'FUNDING_SOURCE_LIST_FLAG_RESET'
const FUNDING_SOURCE_LIST_SUCCESS = 'FUNDING_SOURCE_LIST_SUCCESS'
const FUNDING_SOURCE_LIST_FAILURE = 'FUNDING_SOURCE_LIST_FAILURE'

export function fundingSourceListResetAction () {
  return {
    type: FUNDING_SOURCE_LIST_RESET
  }
}

export function fundingSourceListFlagResetAction () {
  return {
    type: FUNDING_SOURCE_LIST_FLAG_RESET
  }
}

export function fundingSourceListInitialAction() {
  return {
    type: FUNDING_SOURCE_LIST
  }
}

export function fundingSourceListSuccessAction(payload) {
  return {
    type: FUNDING_SOURCE_LIST_SUCCESS,
    payload,
  }
}

export function fundingSourceListFailureAction(payload) {
  return {
    type: FUNDING_SOURCE_LIST_FAILURE,
    payload
  }
}

export function fundingSourceListAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(fundingSourceListInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetFundingSource',
        params: payload
      })
      dispatch(fundingSourceListSuccessAction([...response]))
    } catch (error) {
      dispatch(fundingSourceListFailureAction(error))
    }
  }
}


export function fundingSourceListReducer(state = initialStateFundingSourceList, action) {
  switch (action.type) {
    case FUNDING_SOURCE_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case FUNDING_SOURCE_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case FUNDING_SOURCE_LIST_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case FUNDING_SOURCE_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case FUNDING_SOURCE_LIST_FAILURE:
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

/* get prorate client task */

const initialStateProrateClientTask = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_PRORATE_CLIENT_TASK = 'GET_PRORATE_CLIENT_TASK'
const GET_PRORATE_CLIENT_TASK_RESET = 'GET_PRORATE_CLIENT_TASK_RESET'
const GET_PRORATE_CLIENT_TASK_FLAG_RESET = 'GET_PRORATE_CLIENT_TASK_FLAG_RESET'
const GET_PRORATE_CLIENT_TASK_SUCCESS = 'GET_PRORATE_CLIENT_TASK_SUCCESS'
const GET_PRORATE_CLIENT_TASK_FAILURE = 'GET_PRORATE_CLIENT_TASK_FAILURE'

export function getProrateClientTaskResetAction () {
  return {
    type: GET_PRORATE_CLIENT_TASK_RESET
  }
}

export function getProrateClientTaskFlagResetAction () {
  return {
    type: GET_PRORATE_CLIENT_TASK_FLAG_RESET
  }
}

export function getProrateClientTaskInitialAction() {
  return {
    type: GET_PRORATE_CLIENT_TASK
  }
}

export function getProrateClientTaskSuccessAction(payload) {
  return {
    type: GET_PRORATE_CLIENT_TASK_SUCCESS,
    payload,
  }
}

export function getProrateClientTaskFailureAction(payload) {
  return {
    type: GET_PRORATE_CLIENT_TASK_FAILURE,
    payload
  }
}

export function getProrateClientTaskAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProrateClientTaskInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetAllClientProjectGroups',
        params: payload
      })
      dispatch(getProrateClientTaskSuccessAction(response))
    } catch (error) {
      dispatch(getProrateClientTaskFailureAction(error))
    }
  }
}


export function getProrateClientTaskReducer(state = initialStateProrateClientTask, action) {
  switch (action.type) {
    case GET_PRORATE_CLIENT_TASK:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PRORATE_CLIENT_TASK_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PRORATE_CLIENT_TASK_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_PRORATE_CLIENT_TASK_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PRORATE_CLIENT_TASK_FAILURE:
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

/* save funding  source */

const initialStateFundingSourceSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const SAVE_FUNDING_SOURCE = 'SAVE_FUNDING_SOURCE'
const SAVE_FUNDING_SOURCE_RESET = 'SAVE_FUNDING_SOURCE_RESET'
const SAVE_FUNDING_SOURCE_SUCCESS = 'SAVE_FUNDING_SOURCE_SUCCESS'
const SAVE_FUNDING_SOURCE_FAILURE = 'SAVE_FUNDING_SOURCE_FAILURE'

export function saveFundingSourceResetAction () {
  return {
    type: SAVE_FUNDING_SOURCE_RESET
  }
}

export function saveFundingSourceInitialAction() {
  return {
    type: SAVE_FUNDING_SOURCE
  }
}

export function saveFundingSourceSuccessAction(payload) {
  return {
    type: SAVE_FUNDING_SOURCE_SUCCESS,
    payload,
    message: "Funding allocated to Client Task Group's successfully.",
    showNotification: true
  }
}

export function saveFundingSourceFailureAction(payload) {
  return {
    type: SAVE_FUNDING_SOURCE_FAILURE,
    payload
  }
}

export function saveFundingSourceAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveFundingSourceInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveFundingSourceMapping',
        data: payload.data,
        params: payload.params
      })
      dispatch(saveFundingSourceSuccessAction(response))
    } catch (error) {
      dispatch(saveFundingSourceFailureAction(error))
    }
  }
}


export function saveFundingSourceReducer(state = initialStateFundingSourceSave, action) {
  switch (action.type) {
    case SAVE_FUNDING_SOURCE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_FUNDING_SOURCE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_FUNDING_SOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_FUNDING_SOURCE_FAILURE:
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

/* delete funding  source */

const initialStateFundingSourceDelete = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}
  
  
const DELETE_FUNDING_SOURCE = 'DELETE_FUNDING_SOURCE'
const DELETE_FUNDING_SOURCE_RESET = 'DELETE_FUNDING_SOURCE_RESET'
const DELETE_FUNDING_SOURCE_SUCCESS = 'DELETE_FUNDING_SOURCE_SUCCESS'
const DELETE_FUNDING_SOURCE_FAILURE = 'DELETE_FUNDING_SOURCE_FAILURE'

export function deleteFundingSourceResetAction () {
  return {
    type: DELETE_FUNDING_SOURCE_RESET
  }
}

export function deleteFundingSourceInitialAction() {
  return {
    type: DELETE_FUNDING_SOURCE
  }
}

export function deleteFundingSourceSuccessAction(payload) {
  return {
    type: DELETE_FUNDING_SOURCE_SUCCESS,
    payload,
    message: "Funding deallocated to Client Task Group's successfully.",
    showNotification: true
  }
}

export function deleteFundingSourceFailureAction(payload) {
  return {
    type: DELETE_FUNDING_SOURCE_FAILURE,
    payload
  }
}

export function deleteFundingSourceAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteFundingSourceInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveFundingSourceMapping',
        data: payload.data,
        params: payload.params
      })
      dispatch(deleteFundingSourceSuccessAction(response))
    } catch (error) {
      dispatch(deleteFundingSourceFailureAction(error))
    }
  }
}


export function deleteFundingSourceReducer(state = initialStateFundingSourceDelete, action) {
  switch (action.type) {
    case DELETE_FUNDING_SOURCE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_FUNDING_SOURCE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_FUNDING_SOURCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_FUNDING_SOURCE_FAILURE:
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
