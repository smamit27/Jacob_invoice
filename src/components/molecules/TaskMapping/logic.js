import { apiCall } from "../../../services/httpService"
import { generateRandomString } from "../../../helpers"
import { errorStatusNotificationAction,statusNotificationAction } from '../StatusNotification/logic';



const initialStateMappingTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const TASK_MAPPING_TABLE = 'TASK_MAPPING_TABLE'
const TASK_MAPPING_TABLE_RESET = 'TASK_MAPPING_TABLE_RESET'
const TASK_MAPPING_TABLE_SUCCESS = 'TASK_MAPPING_TABLE_SUCCESS'
const TASK_MAPPING_TABLE_FAILURE = 'TASK_MAPPING_TABLE_FAILURE'

export function taskMappingTableResetAction () {
  return {
    type: TASK_MAPPING_TABLE_RESET
  }
}

export function taskMappingTableInitialAction() {
  return {
    type: TASK_MAPPING_TABLE
  }
}

export function taskMappingTableSuccessAction(payload) {
  return {
    type: TASK_MAPPING_TABLE_SUCCESS,
    payload,
  }
}

export function taskMappingTableFailureAction(payload) {
  return {
    type: TASK_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function taskMappingTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(taskMappingTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectGroupTasksData',
        params: payload
      })
      dispatch(taskMappingTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString(), isExpanded: false,FLAG_IS:'Y',IS_GROUP: 'Y',level: 2 }))))
    } catch (error) {
      dispatch(taskMappingTableFailureAction(error))
    }
  }
}


export function taskMappingTableReducer(state = initialStateMappingTable, action) {
  switch (action.type) {
    case TASK_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case TASK_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []

      }
    case TASK_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case TASK_MAPPING_TABLE_FAILURE:
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





/* Saving the main grid Taskmapping */

const initialStateTableSave = {
    loading: false,
    error: false,
    flag: false,
    data: {}
  }
  
  
  const SAVE_TASK_MAPPING_TABLE = 'SAVE_TASK_MAPPING_TABLE'
  const SAVE_TASK_MAPPING_TABLE_RESET = 'SAVE_TASK_MAPPING_TABLE_RESET'
  const SAVE_TASK_MAPPING_TABLE_SUCCESS = 'SAVE_TASK_MAPPING_TABLE_SUCCESS'
  const SAVE_TASK_MAPPING_TABLE_FAILURE = 'SAVE_TASK_MAPPING_TABLE_FAILURE'
  
  export function saveTaskMappingTableResetAction () {
    return {
      type: SAVE_TASK_MAPPING_TABLE_RESET
    }
  }
  
  export function saveTaskMappingTableInitialAction() {
    return {
      type: SAVE_TASK_MAPPING_TABLE
    }
  }
  
  export function saveTaskMappingTableSuccessAction(payload) {
    return {
      type: SAVE_TASK_MAPPING_TABLE_SUCCESS,
      payload,
    }
  }
  
  export function saveTaskMappingTableFailureAction(payload) {
    return {
      type: SAVE_TASK_MAPPING_TABLE_FAILURE,
      payload
    }
  }
  
  export function saveTaskMappingTableAction (payload) {
    return async (dispatch) => {
      try {
        dispatch(saveTaskMappingTableInitialAction())
        const response = await apiCall({
          method: 'post',
          url: '/SaveTasksMapping',
          data: payload
        })
        if(response[0]?.FINAL_STATUS === "SUCCESS"){
          dispatch(statusNotificationAction({
            type: 'success',
            message: `${payload.TaskData.length} client tasks updated.`
          }))
          
        }
      dispatch(saveTaskMappingTableSuccessAction(response))
      } catch (error) {
        dispatch(saveTaskMappingTableFailureAction(error))
      }
    }
  }
  
  
  export function saveTaskMappingTableReducer(state = initialStateTableSave, action) {
    switch (action.type) {
      case SAVE_TASK_MAPPING_TABLE:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: {}
        }
      case SAVE_TASK_MAPPING_TABLE_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: {}
        }
      case SAVE_TASK_MAPPING_TABLE_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case SAVE_TASK_MAPPING_TABLE_FAILURE:
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


  /*Saving Quicktaskmapping and quicktaskgrouping */
  
/* Save Override no of character Task level start*/

const initialStateQuickSave = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const SAVE_QUICK_TASK_MAPPING_TABLE = 'SAVE_QUICK_TASK_MAPPING_TABLE'
const SAVE_QUICK_TASK_MAPPING_TABLE_RESET = 'SAVE_QUICK_TASK_MAPPING_TABLE_RESET'
const SAVE_QUICK_TASK_MAPPING_TABLE_SUCCESS = 'SAVE_QUICK_TASK_MAPPING_TABLE_SUCCESS'
const SAVE_QUICK_TASK_MAPPING_TABLE_FAILURE = 'SAVE_QUICK_TASK_MAPPING_TABLE_FAILURE'

export function saveQuickTaskMappingTableResetAction () {
  return {
    type: SAVE_QUICK_TASK_MAPPING_TABLE_RESET
  }
}

export function saveQuickTaskMappingTableInitialAction() {
  return {
    type: SAVE_QUICK_TASK_MAPPING_TABLE
  }
}

export function saveQuickTaskMappingTableSuccessAction(payload) {
  return {
    type: SAVE_QUICK_TASK_MAPPING_TABLE_SUCCESS,
    payload,
  }
}

export function saveQuickTaskMappingTableFailureAction(payload) {
  return {
    type: SAVE_QUICK_TASK_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function saveQuickTaskMappingAction(payload) {
  return async (dispatch) => {
    try {
      dispatch(saveQuickTaskMappingTableInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveUpdateTaskGroupNameInvidualByTaskLevel',
        params:payload.params,
        data: payload.data
      })
      if(response[0]?.FINAL_STATUS === "SUCCESS"){
        dispatch(statusNotificationAction({
          type: 'success',
          message: payload.params.TaskLevel === 'N'? `${payload.data.length} client tasks were grouped.`: `${payload.data.length} client tasks were mapped.`
        }))
        
      }
      
    dispatch(saveQuickTaskMappingTableSuccessAction(response))
    } catch (error) {
     dispatch(saveQuickTaskMappingTableFailureAction(error))
    }
  }
}


export function saveQuickTaskMappingTableReducer(state = initialStateQuickSave, action) {
  switch (action.type) {
    case SAVE_QUICK_TASK_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_QUICK_TASK_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_QUICK_TASK_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_QUICK_TASK_MAPPING_TABLE_FAILURE:
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
/* Save Override no of character Task level end*/

/* Save Override Task number name contain Task level Start*/

const initialStateQuickTaskNumberName = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const SAVE_TASK_NUMBER_NAME = 'SAVE_TASK_NUMBER_NAME'
const SAVE_TASK_NUMBER_NAME_RESET = 'SAVE_TASK_NUMBER_NAME_RESET'
const SAVE_TASK_NUMBER_NAME_SUCCESS = 'SAVE_TASK_NUMBER_NAME_SUCCESS'
const SAVE_TASK_NUMBER_NAME_FAILURE = 'SAVE_TASK_NUMBER_NAME_FAILURE'

export function saveTaskNumberNameResetAction () {
  return {
    type: SAVE_TASK_NUMBER_NAME_RESET
  }
}

export function saveTaskNumberNameInitialAction() {
  return {
    type: SAVE_TASK_NUMBER_NAME
  }
}

export function saveTaskNumberNameSuccessAction(payload) {
  return {
    type: SAVE_TASK_NUMBER_NAME_SUCCESS,
    payload,
  }
}

export function saveTaskNumberNameFailureAction(payload) {
  return {
    type: SAVE_TASK_NUMBER_NAME_FAILURE,
    payload
  }
}

export function saveTaskNumberNameAction(payload) {
  return async (dispatch) => {
    try {
      dispatch(saveTaskNumberNameInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveUpdateTaskGroupbySearch',
        params:payload.params,
        data: payload.data
      })
      if(response[0]?.FINAL_STATUS === "SUCCESS"){
        dispatch(statusNotificationAction({
          type: 'success',
          message: payload?.params?.TaskLevel === 'N'? `${payload.data.length} client tasks were grouped.`: `${payload.data.length} client tasks were mapped.`
        }))
      }
      
    dispatch(saveTaskNumberNameSuccessAction(response))
    } catch (error) {
     dispatch(saveTaskNumberNameFailureAction(error))
    }
  }
}


export function saveTaskNumberNameReducer(state = initialStateQuickTaskNumberName, action) {
  switch (action.type) {
    case SAVE_TASK_NUMBER_NAME:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_TASK_NUMBER_NAME_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_TASK_NUMBER_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_TASK_NUMBER_NAME_FAILURE:
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
/* Save Override Task number name contain Task level end*/

/* Get TasksGroup table data */

const initialStateTasksGroupTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const TASKS_GROUP_DATA_TABLE= 'TASKS_GROUP_DATA_TABLE'
const TASKS_GROUP_DATA_TABLE_RESET = 'TASKS_GROUP_DATA_TABLE_RESET'
const TASKS_GROUP_DATA_TABLE_FLAG_RESET = 'TASKS_GROUP_DATA_TABLE_FLAG_RESET'
const TASKS_GROUP_DATA_TABLE_SUCCESS = 'TASKS_GROUP_DATA_TABLE_SUCCESS'
const TASKS_GROUP_DATA_TABLE_FAILURE = 'TASKS_GROUP_DATA_TABLE_FAILURE'

export function tasksGroupTableResetAction () {
  return {
    type: TASKS_GROUP_DATA_TABLE_RESET
  }
}

export function tasksGroupTableFlagResetAction () {
  return {
    type: TASKS_GROUP_DATA_TABLE_FLAG_RESET
  }
}

export function tasksGroupTableInitialAction() {
  return {
    type: TASKS_GROUP_DATA_TABLE
  }
}

export function tasksGroupTableSuccessAction(payload) {
  return {
    type: TASKS_GROUP_DATA_TABLE_SUCCESS,
    payload,
  }
}

export function tasksGroupTableFailureAction(payload) {
  return {
    type: TASKS_GROUP_DATA_TABLE_FAILURE,
    payload
  }
}

export function tasksGroupTableAction () {
  return async (dispatch) => {
    try {
      dispatch(tasksGroupTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetTasksGroupData',
      })
      dispatch(tasksGroupTableSuccessAction(response))
    } catch (error) {
      dispatch(tasksGroupTableFailureAction())
    }
  }
}


export function getTaskMappingTableReducer(state = initialStateTasksGroupTable, action) {
  switch (action.type) {
    case TASKS_GROUP_DATA_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case TASKS_GROUP_DATA_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case TASKS_GROUP_DATA_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case TASKS_GROUP_DATA_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case TASKS_GROUP_DATA_TABLE_FAILURE:
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

/* Get Task Billing Method */

const initialStateTaskBillingMethodTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const TASK_BILLING_METHOD_TABLE= 'TASK_BILLING_METHOD_TABLE'
const TASK_BILLING_METHOD_TABLE_RESET = 'TASK_BILLING_METHOD_TABLE_RESET'
const TASK_BILLING_METHOD_TABLE_FLAG_RESET = 'TASK_BILLING_METHOD_TABLE_FLAG_RESET'
const TASK_BILLING_METHOD_TABLE_SUCCESS = 'TASK_BILLING_METHOD_TABLE_SUCCESS'
const TASK_BILLING_METHOD_TABLE_FAILURE = 'TASK_BILLING_METHOD_TABLE_FAILURE'

export function taskBillingMethodTableResetAction () {
  return {
    type: TASK_BILLING_METHOD_TABLE_RESET
  }
}

export function taskBillingMethodTableFlagResetAction () {
  return {
    type: TASK_BILLING_METHOD_TABLE_FLAG_RESET
  }
}

export function taskBillingMethodTableInitialAction() {
  return {
    type: TASK_BILLING_METHOD_TABLE
  }
}

export function taskBillingMethodTableSuccessAction(payload) {
  return {
    type: TASK_BILLING_METHOD_TABLE_SUCCESS,
    payload,
  }
}

export function taskBillingMethodTableFailureAction(payload) {
  return {
    type: TASK_BILLING_METHOD_TABLE_FAILURE,
    payload
  }
}

export function taskBillingMethodTableAction () {
  return async (dispatch) => {
    try {
      dispatch(taskBillingMethodTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetTaskBillingMethod',
        params: {Active:'Y'}
      })
      dispatch(taskBillingMethodTableSuccessAction(response))
    } catch (error) {
      dispatch(taskBillingMethodTableFailureAction())
    }
  }
}


export function taskBillingMethodTableReducer(state = initialStateTaskBillingMethodTable, action) {
  switch (action.type) {
    case TASK_BILLING_METHOD_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case TASK_BILLING_METHOD_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case TASK_BILLING_METHOD_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case TASK_BILLING_METHOD_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case TASK_BILLING_METHOD_TABLE_FAILURE:
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
  
/* Task mapping Collection Task Mapping Configuration */

/*1. Number of Characters */

const initialStateNameOfCharacters = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_NUMBER_OF_CHARACTERS_MAPPING = 'GET_NUMBER_OF_CHARACTERS_MAPPING'
const GET_NUMBER_OF_CHARACTERS_MAPPING_RESET = 'GET_NUMBER_OF_CHARACTERS_MAPPING_RESET'
const GET_NUMBER_OF_CHARACTERS_MAPPING_FLAG_RESET = 'GET_NUMBER_OF_CHARACTERS_MAPPING_FLAG_RESET'
const GET_NUMBER_OF_CHARACTERS_MAPPING_SUCCESS = 'GET_NUMBER_OF_CHARACTERS_MAPPING_SUCCESS'
const GET_NUMBER_OF_CHARACTERS_MAPPING_FAILURE = 'GET_NUMBER_OF_CHARACTERS_MAPPING_FAILURE'

export function getNameOfCharactersMappingResetAction () {
  return {
    type: GET_NUMBER_OF_CHARACTERS_MAPPING_RESET
  }
}

export function getNameOfCharactersMappingFlagResetAction () {
  return {
    type: GET_NUMBER_OF_CHARACTERS_MAPPING_FLAG_RESET
  }
}

export function getNameOfCharactersMappingInitialAction() {
  return {
    type: GET_NUMBER_OF_CHARACTERS_MAPPING
  }
}

export function getNameOfCharactersMappingSuccessAction(payload) {
  return {
    type: GET_NUMBER_OF_CHARACTERS_MAPPING_SUCCESS,
    payload,
  }
}

export function getNameOfCharactersMappingFailureAction(payload) {
  return {
    type: GET_NUMBER_OF_CHARACTERS_MAPPING_FAILURE,
    payload
  }
}

export function getNameOfCharactersMappingAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getNameOfCharactersMappingInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveQuickTaskMappingForAll',
        params: payload
      })
      if(response[0]?.FINAL_STATUS === "SUCCESS" && payload.TaskLevel === 'Y'){
        dispatch(statusNotificationAction({
          type: 'success',
          message:  payload.TaskLevel === 'N'? `Collection Task Grouping Configuration has been setup`: `Collection Task Mapping Configuration has been setup`
        }))
      }


      dispatch(getNameOfCharactersMappingSuccessAction(response))
    } catch (error) {
      if(error.code === 404){
        dispatch(errorStatusNotificationAction({
          type: 'error',
          message: "No new task to update "
        }))
        dispatch(getNameOfCharactersMappingSuccessAction([]))
      } else {
        dispatch(getNameOfCharactersMappingFailureAction())

      }
     
    }
  }
}


export function getNameOfCharactersMappingReducer(state = initialStateNameOfCharacters, action) {
  switch (action.type) {
    case GET_NUMBER_OF_CHARACTERS_MAPPING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_NUMBER_OF_CHARACTERS_MAPPING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_NUMBER_OF_CHARACTERS_MAPPING_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_NUMBER_OF_CHARACTERS_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_NUMBER_OF_CHARACTERS_MAPPING_FAILURE:
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
/*1. Number of Characters end*/
/*2. Task Number / Name Contains */

const initialStateTaskNumberNameContains = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_TASK_NUMBER_NAME_MAPPING= 'GET_TASK_NUMBER_NAME_MAPPING'
const GET_TASK_NUMBER_NAME_MAPPING_RESET = 'GET_TASK_NUMBER_NAME_MAPPING_RESET'
const GET_TASK_NUMBER_NAME_MAPPING_FLAG_RESET = 'GET_TASK_NUMBER_NAME_MAPPING_FLAG_RESET'
const GET_TASK_NUMBER_NAME_MAPPING_SUCCESS = 'GET_TASK_NUMBER_NAME_MAPPING_SUCCESS'
const GET_TASK_NUMBER_NAME_MAPPING_FAILURE = 'GET_TASK_NUMBER_NAME_MAPPING_FAILURE'

export function getTaskNumberNameMappingResetAction () {
  return {
    type: GET_TASK_NUMBER_NAME_MAPPING_RESET
  }
}

export function getTaskNumberNameMappingFlagResetAction () {
  return {
    type: GET_TASK_NUMBER_NAME_MAPPING_FLAG_RESET
  }
}

export function getTaskNumberNameMappingInitialAction() {
  return {
    type: GET_TASK_NUMBER_NAME_MAPPING
  }
}

export function getTaskNumberNameMappingSuccessAction(payload) {
  return {
    type: GET_TASK_NUMBER_NAME_MAPPING_SUCCESS,
    payload,
  }
}

export function getTaskNumberNameMappingFailureAction(payload) {
  return {
    type: GET_TASK_NUMBER_NAME_MAPPING_FAILURE,
    payload
  }
}

export function getTaskNumberNameMappingAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getTaskNumberNameMappingInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveQuickTaskMappingForAllName',
        params: payload
      })
      if(response[0]?.FINAL_STATUS === "SUCCESS"){
        dispatch(statusNotificationAction({
          type: 'success',
          message:  payload.TaskLevel === 'N'? `Collection Task Grouping Configuration has been setup`: `Collection Task Mapping Configuration has been setup`
        }))
      }
      dispatch(getTaskNumberNameMappingSuccessAction(response))
    } catch (error) {
      if(error.code === 404){
        dispatch(errorStatusNotificationAction({
          type: 'error',
          message: "No new task to update "
        }))
        dispatch(getTaskNumberNameMappingSuccessAction([]))
      } else {
        dispatch(getTaskNumberNameMappingFailureAction())
      }
    }
  }
}


export function getTaskNumberNameMappingReducer(state = initialStateTaskNumberNameContains, action) {
  switch (action.type) {
    case GET_TASK_NUMBER_NAME_MAPPING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_TASK_NUMBER_NAME_MAPPING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_TASK_NUMBER_NAME_MAPPING_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_TASK_NUMBER_NAME_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_TASK_NUMBER_NAME_MAPPING_FAILURE:
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

/*2. Task Number / Name Contains end*/
/*3. Task Level */

const initialStateTaskLevelMapping = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_TASK_LEVEL_MAPPING = 'GET_TASK_LEVEL_MAPPING'
const GET_TASK_LEVEL_MAPPING_RESET = 'GET_TASK_LEVEL_MAPPING_RESET'
const GET_TASK_LEVEL_MAPPING_FLAG_RESET = 'GET_TASK_LEVEL_MAPPING_FLAG_RESET'
const GET_TASK_LEVEL_MAPPING_SUCCESS = 'GET_TASK_LEVEL_MAPPING_SUCCESS'
const GET_TASK_LEVEL_MAPPING_FAILURE = 'GET_TASK_LEVEL_MAPPING_FAILURE'

export function getTaskLevelMappingResetAction () {
  return {
    type: GET_TASK_LEVEL_MAPPING_RESET
  }
}

export function getTaskLevelMappingFlagResetAction () {
  return {
    type: GET_TASK_LEVEL_MAPPING_FLAG_RESET
  }
}

export function getTaskLevelMappingInitialAction() {
  return {
    type: GET_TASK_LEVEL_MAPPING
  }
}

export function getTaskLevelMappingSuccessAction(payload) {
  return {
    type: GET_TASK_LEVEL_MAPPING_SUCCESS,
    payload,
  }
}

export function getTaskLevelMappingFailureAction(payload) {
  return {
    type: GET_TASK_LEVEL_MAPPING_FAILURE,
    payload
  }
}

export function getTaskLevelMappingAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getTaskLevelMappingInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveQuickTaskMappingForTaskAll',
        params: payload
      })
      if(response[0]?.FINAL_STATUS === "SUCCESS"){
        dispatch(statusNotificationAction({
          type: 'success',
          message:  payload.TaskLevel === 'N'? `Collection Task Grouping Configuration has been setup`: `Collection Task Mapping Configuration has been setup`
        }))
      }
      dispatch(getTaskLevelMappingSuccessAction(response))
    } catch (error) {
      if(error.code === 404){
        dispatch(errorStatusNotificationAction({
          type: 'error',
          message: "No new task to update "
        }))
        dispatch(getTaskLevelMappingSuccessAction([]))
      } else {
        dispatch(getTaskLevelMappingFailureAction())

      }
    }
  }
}


export function getTaskLevelMappingReducer(state = initialStateTaskLevelMapping, action) {
  switch (action.type) {
    case GET_TASK_LEVEL_MAPPING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_TASK_LEVEL_MAPPING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_TASK_LEVEL_MAPPING_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_TASK_LEVEL_MAPPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_TASK_LEVEL_MAPPING_FAILURE:
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
/*3. Task Level end*/
/*Get task mapping and grouping after saving */

const initialStateEditTask = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GET_EDIT_TASK_MAPPING_GROUPING = 'GET_EDIT_TASK_MAPPING_GROUPING'
const GET_EDIT_TASK_MAPPING_GROUPING_RESET = 'GET_EDIT_TASK_MAPPING_GROUPING_RESET'
const GET_EDIT_TASK_MAPPING_GROUPING_FLAG_RESET = 'GET_EDIT_TASK_MAPPING_GROUPING_FLAG_RESET'
const GET_EDIT_TASK_MAPPING_GROUPING_SUCCESS = 'GET_EDIT_TASK_MAPPING_GROUPING_SUCCESS'
const GET_EDIT_TASK_MAPPING_GROUPING_FAILURE = 'GET_EDIT_TASK_MAPPING_GROUPING_FAILURE'

export function getEditTaskMappingGroupingResetAction () {
  return {
    type: GET_EDIT_TASK_MAPPING_GROUPING_RESET
  }
}

export function getEditTaskMappingGroupingFlagResetAction () {
  return {
    type: GET_EDIT_TASK_MAPPING_GROUPING_FLAG_RESET
  }
}

export function getEditTaskMappingGroupingInitialAction() {
  return {
    type: GET_EDIT_TASK_MAPPING_GROUPING
  }
}

export function getEditTaskMappingGroupingSuccessAction(payload) {
  return {
    type: GET_EDIT_TASK_MAPPING_GROUPING_SUCCESS,
    payload,
  }
}

export function getEditTaskMappingGroupingFailureAction(payload) {
  return {
    type: GET_EDIT_TASK_MAPPING_GROUPING_FAILURE,
    payload
  }
}

export function getEditTaskMappingGroupingAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getEditTaskMappingGroupingInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetTasksMappingPopupData',
        params: payload
      })
      dispatch(getEditTaskMappingGroupingSuccessAction(response))
    } catch (error) {
      dispatch(getEditTaskMappingGroupingFailureAction())
    }
  }
}


export function getEditTaskMappingGroupingReducer(state = initialStateEditTask, action) {
  switch (action.type) {
    case GET_EDIT_TASK_MAPPING_GROUPING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_EDIT_TASK_MAPPING_GROUPING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_EDIT_TASK_MAPPING_GROUPING_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GET_EDIT_TASK_MAPPING_GROUPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_EDIT_TASK_MAPPING_GROUPING_FAILURE:
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
/*Get task mapping and grouping after saving  end*/
/* Task mapping Collection Task Mapping & grouping Configuration end */

/* Global configuration for taskmapping and task grouping */

const initialStateGlobalTask = {
  loading: false,
  error: false,
  flag: false,
  data: []
}

const GLOBAL_TASK_MAPPING_GROUPING = 'GLOBAL_TASK_MAPPING_GROUPING'
const GLOBAL_TASK_MAPPING_GROUPING_RESET = 'GLOBAL_TASK_MAPPING_GROUPING_RESET'
const GLOBAL_TASK_MAPPING_GROUPING_FLAG_RESET = 'GLOBAL_TASK_MAPPING_GROUPING_FLAG_RESET'
const GLOBAL_TASK_MAPPING_GROUPING_SUCCESS = 'GLOBAL_TASK_MAPPING_GROUPING_SUCCESS'
const GLOBAL_TASK_MAPPING_GROUPING_FAILURE = 'GLOBAL_TASK_MAPPING_GROUPING_FAILURE'

export function globalTaskMappingGroupingResetAction () {
  return {
    type: GLOBAL_TASK_MAPPING_GROUPING_RESET
  }
}

export function globalTaskMappingGroupingFlagResetAction () {
  return {
    type: GLOBAL_TASK_MAPPING_GROUPING_FLAG_RESET
  }
}

export function globalTaskMappingGroupingInitialAction() {
  return {
    type: GLOBAL_TASK_MAPPING_GROUPING
  }
}

export function globalTaskMappingGroupingSuccessAction(payload) {
  return {
    type: GLOBAL_TASK_MAPPING_GROUPING_SUCCESS,
    payload,
  }
}

export function globalTaskMappingGroupingFailureAction(payload) {
  return {
    type: GLOBAL_TASK_MAPPING_GROUPING_FAILURE,
    payload
  }
}

export function globalTaskMappingGroupingAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(globalTaskMappingGroupingInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/SaveTasksMappingTracking',
        params: payload.params,
        data: payload.data
      })
      dispatch(globalTaskMappingGroupingSuccessAction(response))
    } catch (error) {
      dispatch(globalTaskMappingGroupingFailureAction())
    }
  }
}


export function globalTaskMappingGroupingReducer(state = initialStateGlobalTask, action) {
  switch (action.type) {
    case GLOBAL_TASK_MAPPING_GROUPING:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GLOBAL_TASK_MAPPING_GROUPING_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GLOBAL_TASK_MAPPING_GROUPING_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case GLOBAL_TASK_MAPPING_GROUPING_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GLOBAL_TASK_MAPPING_GROUPING_FAILURE:
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
/* Global configuration for taskmapping and task grouping end*/