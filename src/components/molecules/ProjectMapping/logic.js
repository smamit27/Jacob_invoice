import { generateRandomString } from "../../../helpers"
import { apiCall } from "../../../services/httpService"

/* Client project group modal open close logic */

const CLIENT_PROJECT_GROUPS_MODAL_OPEN = 'CLIENT_PROJECT_GROUPS_MODAL_OPEN'
const CLIENT_PROJECT_GROUPS_MODAL_CLOSE = 'CLIENT_PROJECT_GROUPS_MODAL_CLOSE'

const initialStateModal = {
  open: false,
  data: {}
}

export function clientProjectGroupModalOpenAction (payload = {}) {
  return {
    type: CLIENT_PROJECT_GROUPS_MODAL_OPEN,
    payload
  }
}

export function clientProjectGroupModalCloseAction () {
  return {
    type: CLIENT_PROJECT_GROUPS_MODAL_CLOSE,
  }
}


export function clientProjectGroupModalReducer (state = initialStateModal, action) {
  switch (action.type) {
    case CLIENT_PROJECT_GROUPS_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case CLIENT_PROJECT_GROUPS_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}



/* Getting client project groups table data */

const initialStateProjectsTable = {
  loading: false,
  error: false,
  flag: false,
  data: {
    rows: [],
    columns: []
  }
}


const CLIENT_PROJECT_GROUPS_TABLE = 'CLIENT_PROJECT_GROUPS_TABLE'
const CLIENT_PROJECT_GROUPS_TABLE_RESET = 'CLIENT_PROJECT_GROUPS_TABLE_RESET'
const CLIENT_PROJECT_GROUPS_TABLE_SUCCESS = 'CLIENT_PROJECT_GROUPS_TABLE_SUCCESS'
const CLIENT_PROJECT_GROUPS_TABLE_FAILURE = 'CLIENT_PROJECT_GROUPS_TABLE_FAILURE'

export function clientProjectGroupTableResetAction () {
  return {
    type: CLIENT_PROJECT_GROUPS_TABLE_RESET
  }
}

export function clientProjectGroupTableInitialAction() {
  return {
    type: CLIENT_PROJECT_GROUPS_TABLE
  }
}

export function clientProjectGroupTableSuccessAction(payload) {
  return {
    type: CLIENT_PROJECT_GROUPS_TABLE_SUCCESS,
    payload,
  }
}

export function clientProjectGroupTableFailureAction(payload) {
  return {
    type: CLIENT_PROJECT_GROUPS_TABLE_FAILURE,
    payload
  }
}

export function clientProjectGroupTableAction (params) {
  return async (dispatch) => {
    try {
      dispatch(clientProjectGroupTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetAllClientProjectGroups',
        params
      })
      dispatch(clientProjectGroupTableSuccessAction(response?.map(d => ({ ...d, tableRowId: generateRandomString() })) || []))
    } catch (error) {
      dispatch(clientProjectGroupTableFailureAction(error))
    }
  }
}


export function clientProjectGroupTableReducer(state = initialStateProjectsTable, action) {
  switch (action.type) {
    case CLIENT_PROJECT_GROUPS_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {
          rows: [],
          columns: []
        }
      }
    case CLIENT_PROJECT_GROUPS_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {
          rows: [],
          columns: []
        }
      }
    case CLIENT_PROJECT_GROUPS_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case CLIENT_PROJECT_GROUPS_TABLE_FAILURE:
      return {
        ...state,
        loading: false,
        error: true,
        flag: false,
        data: {
          rows: [],
          columns: []
        }
      }
    default:
      return state
  }
}

/* Delete Client project groups */

const initialDeleteCPG = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const DELETE_CLIENT_PROJECT_GROUPS = 'DELETE_CLIENT_PROJECT_GROUPS'
const DELETE_CLIENT_PROJECT_GROUPS_RESET = 'DELETE_CLIENT_PROJECT_GROUPS_RESET'
const DELETE_CLIENT_PROJECT_GROUPS_SUCCESS = 'DELETE_CLIENT_PROJECT_GROUPS_SUCCESS'
const DELETE_CLIENT_PROJECT_GROUPS_FAILURE = 'DELETE_CLIENT_PROJECT_GROUPS_FAILURE'

export function deleteClientProjectGroupsResetAction () {
  return {
    type: DELETE_CLIENT_PROJECT_GROUPS_RESET
  }
}

export function deleteClientProjectGroupsInitialAction() {
  return {
    type: DELETE_CLIENT_PROJECT_GROUPS
  }
}

export function deleteClientProjectGroupsSuccessAction(payload) {
  return {
    type: DELETE_CLIENT_PROJECT_GROUPS_SUCCESS,
    payload,
    message: "Client project group's deleted successfully.",
    showNotification: true
  }
}

export function deleteClientProjectGroupsFailureAction(payload) {
  return {
    type: DELETE_CLIENT_PROJECT_GROUPS_FAILURE,
    payload
  }
}

export function deleteClientProjectGroupsAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(deleteClientProjectGroupsInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/DeleteClientProjectGroups',
        params: payload
      })
      dispatch(deleteClientProjectGroupsSuccessAction({}))
    } catch (error) {
      dispatch(deleteClientProjectGroupsFailureAction(error))
    }
  }
}


export function deleteClientProjectGroupsReducer(state = initialDeleteCPG, action) {
  switch (action.type) {
    case DELETE_CLIENT_PROJECT_GROUPS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_CLIENT_PROJECT_GROUPS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case DELETE_CLIENT_PROJECT_GROUPS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case DELETE_CLIENT_PROJECT_GROUPS_FAILURE:
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

/* Create/Edit/View Client project group modal open close logic */

const CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_OPEN = 'CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_OPEN'
const CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_CLOSE = 'CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_CLOSE'

export function createEditClientProjectGroupModalOpenAction (payload = {}) {
  return {
    type: CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_OPEN,
    payload
  }
}

export function createEditClientProjectGroupModalCloseAction () {
  return {
    type: CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_CLOSE,
  }
}


export function createEditClientProjectGroupModalReducer (state = initialStateModal, action) {
  switch (action.type) {
    case CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_OPEN:
      return {
        ...state,
        open: true,
        data: action.payload
      }
    case CREATE_EDIT_CLIENT_PROJECT_GROUP_MODAL_CLOSE:
      return {
        ...state,
        open: false,
        data: {}
      }
    default:
      return state
  }
}

/* save create/edit client project group form data */

const initialStateCreateEditCPG = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const CREATE_EDIT_CLIENT_PROJECT_GROUP =  'CREATE_EDIT_CLIENT_PROJECT_GROUP'
const CREATE_EDIT_CLIENT_PROJECT_GROUP_RESET =  'CREATE_EDIT_CLIENT_PROJECT_GROUP_RESET'
const CREATE_EDIT_CLIENT_PROJECT_GROUP_SUCCESS =  'CREATE_EDIT_CLIENT_PROJECT_GROUP_SUCCESS'
const CREATE_EDIT_CLIENT_PROJECT_GROUP_FAILURE =  'CREATE_EDIT_CLIENT_PROJECT_GROUP_FAILURE'

export function createEditClientProjectGroupInitialAction() {
  return {
    type: CREATE_EDIT_CLIENT_PROJECT_GROUP
  }
}

export function createEditClientProjectGroupResetAction () {
  return {
    type: CREATE_EDIT_CLIENT_PROJECT_GROUP_RESET
  }
}

export function createEditClientProjectGroupSuccessAction(payload, flag) {
  return {
    type: CREATE_EDIT_CLIENT_PROJECT_GROUP_SUCCESS,
    payload,
    message: `Client project group ${flag === 'new' ? 'created' : 'updated'} successfully.`,
    showNotification: true
  }
}

export function createEditClientProjectGroupFailureAction(payload) {
  return {
    type: CREATE_EDIT_CLIENT_PROJECT_GROUP_FAILURE,
    payload
  }
}

export function createEditClientProjectGroupAction ({ method, url, data, params }) {
  return async (dispatch) => {
    try {
      dispatch(createEditClientProjectGroupInitialAction())
      const response = await apiCall({
        method,
        url,
        data,
        params
      })
      dispatch(createEditClientProjectGroupSuccessAction(response, method === 'post' ? 'new' : 'update'))
    } catch (error) {
      dispatch(createEditClientProjectGroupFailureAction(error))
    }
  }
}


export function createEditClientProjectGroupReducer (state = initialStateCreateEditCPG, action) {
  switch (action.type) {
    case CREATE_EDIT_CLIENT_PROJECT_GROUP:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_CLIENT_PROJECT_GROUP_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case CREATE_EDIT_CLIENT_PROJECT_GROUP_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: {}
      }
    case CREATE_EDIT_CLIENT_PROJECT_GROUP_FAILURE:
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


/* Get project mapping table data */

const initialStateMappingTable = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const PROJECT_MAPPING_TABLE = 'PROJECT_MAPPING_TABLE'
const PROJECT_MAPPING_TABLE_RESET = 'PROJECT_MAPPING_TABLE_RESET'
const PROJECT_MAPPING_TABLE_FLAG_RESET = 'PROJECT_MAPPING_TABLE_FLAG_RESET'
const PROJECT_MAPPING_TABLE_SUCCESS = 'PROJECT_MAPPING_TABLE_SUCCESS'
const PROJECT_MAPPING_TABLE_FAILURE = 'PROJECT_MAPPING_TABLE_FAILURE'

export function projectMappingTableResetAction () {
  return {
    type: PROJECT_MAPPING_TABLE_RESET
  }
}

export function projectMappingTableFlagResetAction () {
  return {
    type: PROJECT_MAPPING_TABLE_FLAG_RESET
  }
}

export function projectMappingTableInitialAction() {
  return {
    type: PROJECT_MAPPING_TABLE
  }
}

export function projectMappingTableSuccessAction(payload) {
  return {
    type: PROJECT_MAPPING_TABLE_SUCCESS,
    payload,
  }
}

export function projectMappingTableFailureAction(payload) {
  return {
    type: PROJECT_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function projectMappingTableAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(projectMappingTableInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectMappingAlianceGroup',
        params: payload
      })
      dispatch(projectMappingTableSuccessAction(response.map(d => ({ ...d, tableRowId: generateRandomString(), isExpanded: false }))))
    } catch (error) {
      dispatch(projectMappingTableFailureAction(error))
    }
  }
}


export function projectMappingTableReducer(state = initialStateMappingTable, action) {
  switch (action.type) {
    case PROJECT_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case PROJECT_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case PROJECT_MAPPING_TABLE_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case PROJECT_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case PROJECT_MAPPING_TABLE_FAILURE:
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

/* save for by alliance code */

const initialStateByAllianceSave = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const SAVE_PROJECT_MAPPING_BY_ALLIANCE = 'SAVE_PROJECT_MAPPING_BY_ALLIANCE'
const SAVE_PROJECT_MAPPING_BY_ALLIANCE_RESET = 'SAVE_PROJECT_MAPPING_BY_ALLIANCE_RESET'
const SAVE_PROJECT_MAPPING_BY_ALLIANCE_SUCCESS = 'SAVE_PROJECT_MAPPING_BY_ALLIANCE_SUCCESS'
const SAVE_PROJECT_MAPPING_BY_ALLIANCE_FAILURE = 'SAVE_PROJECT_MAPPING_BY_ALLIANCE_FAILURE'

export function saveProjectMappingByAllianceResetAction () {
  return {
    type: SAVE_PROJECT_MAPPING_BY_ALLIANCE_RESET
  }
}

export function saveProjectMappingByAllianceInitialAction() {
  return {
    type: SAVE_PROJECT_MAPPING_BY_ALLIANCE
  }
}

export function saveProjectMappingByAllianceSuccessAction(payload) {
  return {
    type: SAVE_PROJECT_MAPPING_BY_ALLIANCE_SUCCESS,
    payload,
  }
}

export function saveProjectMappingByAllianceFailureAction(payload) {
  return {
    type: SAVE_PROJECT_MAPPING_BY_ALLIANCE_FAILURE,
    payload
  }
}

export function saveProjectMappingByAllianceAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(saveProjectMappingByAllianceInitialAction())
      const response = await apiCall({
        method: 'post',
        url: '/AddAllianceCodes',
        data: payload
      })
      dispatch(saveProjectMappingByAllianceSuccessAction(response))
    } catch (error) {
      dispatch(saveProjectMappingByAllianceFailureAction(error))
    }
  }
}


export function saveProjectMappingByAllianceReducer(state = initialStateByAllianceSave, action) {
  switch (action.type) {
    case SAVE_PROJECT_MAPPING_BY_ALLIANCE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SAVE_PROJECT_MAPPING_BY_ALLIANCE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case SAVE_PROJECT_MAPPING_BY_ALLIANCE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_PROJECT_MAPPING_BY_ALLIANCE_FAILURE:
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


const initialStateTableSave = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const SAVE_PROJECT_MAPPING_TABLE = 'SAVE_PROJECT_MAPPING_TABLE'
const SAVE_PROJECT_MAPPING_TABLE_RESET = 'SAVE_PROJECT_MAPPING_TABLE_RESET'
const SAVE_PROJECT_MAPPING_TABLE_SUCCESS = 'SAVE_PROJECT_MAPPING_TABLE_SUCCESS'
const SAVE_PROJECT_MAPPING_TABLE_FAILURE = 'SAVE_PROJECT_MAPPING_TABLE_FAILURE'

export function saveProjectMappingTableResetAction () {
  return {
    type: SAVE_PROJECT_MAPPING_TABLE_RESET
  }
}

export function saveProjectMappingTableInitialAction() {
  return {
    type: SAVE_PROJECT_MAPPING_TABLE
  }
}

export function saveProjectMappingTableSuccessAction(payload) {
  return {
    type: SAVE_PROJECT_MAPPING_TABLE_SUCCESS,
    payload,
    message: 'Project Mapping table updated successfully.',
    showNotification: true
  }
}

export function saveProjectMappingTableFailureAction(payload) {
  return {
    type: SAVE_PROJECT_MAPPING_TABLE_FAILURE,
    payload
  }
}

export function saveProjectMappingTableAction (projectData, addData, id) {
  return async (dispatch) => {
    try {
      dispatch(saveProjectMappingTableInitialAction())
      if (projectData.length) {
        const response = await apiCall({
          method: 'post',
          url: '/SaveProjects',
          data: {
            collectioN_ID: id,
            projectData
          }
        })
      }
      if (addData.length) {
        await Promise.all(addData.map(async (d) => {
          const res = await apiCall({
            method: 'post',
            url: '/UpdateAutoProjectAddFlag',
            params: {
              CollectionID: id,
              AllocationProjectMapId: d.ALLC_PROJ_MAP_ID,
              Flag: d.AUTO_ADD_PROJECT_COLLECTION
            }
          })
          return res
        }))
      }
      dispatch(saveProjectMappingTableSuccessAction({}))
    } catch (error) {
      dispatch(saveProjectMappingTableFailureAction(error))
    }
  }
}


export function saveProjectMappingTableReducer(state = initialStateTableSave, action) {
  switch (action.type) {
    case SAVE_PROJECT_MAPPING_TABLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_PROJECT_MAPPING_TABLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: {}
      }
    case SAVE_PROJECT_MAPPING_TABLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SAVE_PROJECT_MAPPING_TABLE_FAILURE:
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



/* Get project mapping table data */

const initialStateMappingInvoiceFormatList = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const PROJECT_MAPPING_INVOICE_FORMAT_LIST = 'PROJECT_MAPPING_INVOICE_FORMAT_LIST'
const PROJECT_MAPPING_INVOICE_FORMAT_LIST_RESET = 'PROJECT_MAPPING_INVOICE_FORMAT_LIST_RESET'
const PROJECT_MAPPING_INVOICE_FORMAT_LIST_FLAG_RESET = 'PROJECT_MAPPING_INVOICE_FORMAT_LIST_FLAG_RESET'
const PROJECT_MAPPING_INVOICE_FORMAT_LIST_SUCCESS = 'PROJECT_MAPPING_INVOICE_FORMAT_LIST_SUCCESS'
const PROJECT_MAPPING_INVOICE_FORMAT_LIST_FAILURE = 'PROJECT_MAPPING_INVOICE_FORMAT_LIST_FAILURE'

export function projectMappingInvoiceFormatListResetAction () {
  return {
    type: PROJECT_MAPPING_INVOICE_FORMAT_LIST_RESET
  }
}

export function projectMappingInvoiceFormatListFlagResetAction () {
  return {
    type: PROJECT_MAPPING_INVOICE_FORMAT_LIST_FLAG_RESET
  }
}

export function projectMappingInvoiceFormatListInitialAction() {
  return {
    type: PROJECT_MAPPING_INVOICE_FORMAT_LIST
  }
}

export function projectMappingInvoiceFormatListSuccessAction(payload) {
  return {
    type: PROJECT_MAPPING_INVOICE_FORMAT_LIST_SUCCESS,
    payload,
  }
}

export function projectMappingInvoiceFormatListFailureAction(payload) {
  return {
    type: PROJECT_MAPPING_INVOICE_FORMAT_LIST_FAILURE,
    payload
  }
}

export function projectMappingInvoiceFormatListAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(projectMappingInvoiceFormatListInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectInvoiceNumFormatList',
        params: {
          active: 'Y'
        }
      })
      dispatch(projectMappingInvoiceFormatListSuccessAction(response.map(d => ({ id: d.ID, description: d.Description }))))
    } catch (error) {
      dispatch(projectMappingInvoiceFormatListFailureAction(error))
    }
  }
}


export function projectMappingInvoiceFormatListReducer(state = initialStateMappingInvoiceFormatList, action) {
  switch (action.type) {
    case PROJECT_MAPPING_INVOICE_FORMAT_LIST:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case PROJECT_MAPPING_INVOICE_FORMAT_LIST_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case PROJECT_MAPPING_INVOICE_FORMAT_LIST_FLAG_RESET:
      return {
        ...state,
        error: false,
        loading: false,
        flag: false,
      }
    case PROJECT_MAPPING_INVOICE_FORMAT_LIST_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case PROJECT_MAPPING_INVOICE_FORMAT_LIST_FAILURE:
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
