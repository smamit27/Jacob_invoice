import { apiCall } from "../../../services/httpService"

/* Project Number */
const initialProjectNumber = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_PROJECT_NUMBER = 'GET_PROJECT_NUMBER'
const GET_PROJECT_NUMBER_RESET = 'GET_PROJECT_NUMBER_RESET'
const GET_PROJECT_NUMBER_SUCCESS = 'GET_PROJECT_NUMBER_SUCCESS'
const GET_PROJECT_NUMBER_FAILURE = 'GET_PROJECT_NUMBER_FAILURE'

export function getProjectNumberResetAction () {
  return {
    type: GET_PROJECT_NUMBER_RESET
  }
}

export function getProjectNumberInitialAction() {
  return {
    type: GET_PROJECT_NUMBER
  }
}

export function getProjectNumberSuccessAction(payload) {
  return {
    type: GET_PROJECT_NUMBER_SUCCESS,
    payload,
  }
}

export function getProjectNumberFailureAction(payload) {
  return {
    type: GET_PROJECT_NUMBER_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getProjectNumberAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProjectNumberInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectNumbersList',
        params: {ProjectNumber: payload} 
      })
      dispatch(getProjectNumberSuccessAction(response))
    } catch (error) {
      dispatch(getProjectNumberFailureAction(error))
    }
  }
}


export function getProjectNumberReducer(state = initialProjectNumber, action) {
  switch (action.type) {
    case GET_PROJECT_NUMBER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_NUMBER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PROJECT_NUMBER_FAILURE:
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


/* Project Name */
const initialProjectName = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_PROJECT_NAME = 'GET_PROJECT_NAME'
const GET_PROJECT_NAME_RESET = 'GET_PROJECT_NAME_RESET'
const GET_PROJECT_NAME_SUCCESS = 'GET_PROJECT_NAME_SUCCESS'
const GET_PROJECT_NAME_FAILURE = 'GET_PROJECT_NAME_FAILURE'

export function getProjectNameResetAction () {
  return {
    type: GET_PROJECT_NAME_RESET
  }
}

export function getProjectNameInitialAction() {
  return {
    type: GET_PROJECT_NAME
  }
}

export function getProjectNameSuccessAction(payload) {
  return {
    type: GET_PROJECT_NAME_SUCCESS,
    payload,
  }
}

export function getProjectNameFailureAction(payload) {
  return {
    type: GET_PROJECT_NAME_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getProjectNameAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProjectNameInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectsNameList',
        params: {ProjectName: payload} 
      })
      dispatch(getProjectNameSuccessAction(response))
    } catch (error) {
      dispatch(getProjectNameFailureAction(error))
    }
  }
}


export function getProjectNameReducer(state = initialProjectName, action) {
  switch (action.type) {
    case GET_PROJECT_NAME:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_NAME_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PROJECT_NAME_FAILURE:
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

/*Client Type */
const initialClientName = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_CLIENT_NAME = 'GET_CLIENT_NAME'
const GET_CLIENT_NAME_RESET = 'GET_CLIENT_NAME_RESET'
const GET_CLIENT_NAME_SUCCESS = 'GET_CLIENT_NAME_SUCCESS'
const GET_CLIENT_NAME_FAILURE = 'GET_CLIENT_NAME_FAILURE'

export function getClientNameResetAction () {
  return {
    type: GET_CLIENT_NAME_RESET
  }
}

export function getClientNameInitialAction() {
  return {
    type: GET_CLIENT_NAME
  }
}

export function getClientNameSuccessAction(payload) {
  return {
    type: GET_CLIENT_NAME_SUCCESS,
    payload,
  }
}

export function getClientNameFailureAction(payload) {
  return {
    type: GET_CLIENT_NAME_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getClientNameAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getClientNameInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetClientListdata',
        params: {ClientName: payload} 
      })
      dispatch(getClientNameSuccessAction(response))
    } catch (error) {
      dispatch(getClientNameFailureAction(error))
    }
  }
}


export function getClientNameReducer(state = initialClientName, action) {
  switch (action.type) {
    case GET_CLIENT_NAME:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_CLIENT_NAME_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_CLIENT_NAME_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_CLIENT_NAME_FAILURE:
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

/* Key Member */

const initialKeyMember = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_KEY_MEMBER = 'GET_KEY_MEMBER'
const GET_KEY_MEMBER_RESET = 'GET_KEY_MEMBER_RESET'
const GET_KEY_MEMBER_SUCCESS = 'GET_KEY_MEMBER_SUCCESS'
const GET_KEY_MEMBER_FAILURE = 'GET_KEY_MEMBER_FAILURE'

export function getKeyMemberResetAction () {
  return {
    type: GET_KEY_MEMBER_RESET
  }
}

export function getKeyMemberInitialAction() {
  return {
    type: GET_KEY_MEMBER
  }
}

export function getKeyMemberSuccessAction(payload) {
  return {
    type: GET_KEY_MEMBER_SUCCESS,
    payload,
  }
}

export function getKeyMemberFailureAction(payload) {
  return {
    type: GET_KEY_MEMBER_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getKeyMemberAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getKeyMemberInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectMemberList',
        params: {ProjectMember: payload} 
      })
      dispatch(getKeyMemberSuccessAction(response))
    } catch (error) {
      dispatch(getKeyMemberFailureAction(error))
    }
  }
}


export function getKeyMemberReducer(state = initialKeyMember, action) {
  switch (action.type) {
    case GET_KEY_MEMBER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_KEY_MEMBER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_KEY_MEMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_KEY_MEMBER_FAILURE:
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

/* Key Role */

const initialKeyRole = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_KEY_ROLE = 'GET_KEY_ROLE'
const GET_KEY_ROLE_RESET = 'GET_KEY_ROLE_RESET'
const GET_KEY_ROLE_SUCCESS = 'GET_KEY_ROLE_SUCCESS'
const GET_KEY_ROLE_FAILURE = 'GET_KEY_ROLE_FAILURE'

export function getKeyRoleResetAction () {
  return {
    type: GET_KEY_ROLE_RESET
  }
}

export function getKeyRoleInitialAction() {
  return {
    type: GET_KEY_ROLE
  }
}

export function getKeyRoleSuccessAction(payload) {
  return {
    type: GET_KEY_ROLE_SUCCESS,
    payload,
  }
}

export function getKeyRoleFailureAction(payload) {
  return {
    type: GET_KEY_ROLE_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getKeyRoleAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getKeyRoleInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectsRoleList',
        params: {ProjectRole: payload} 
      })
      dispatch(getKeyRoleSuccessAction(response))
    } catch (error) {
      dispatch(getKeyRoleFailureAction(error))
    }
  }
}


export function getKeyRoleReducer(state = initialKeyRole, action) {
  switch (action.type) {
    case GET_KEY_ROLE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_KEY_ROLE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_KEY_ROLE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_KEY_ROLE_FAILURE:
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

/* Contract Type */
const initialContractType = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_CONTRACT_TYPE = 'GET_CONTRACT_TYPE'
const GET_CONTRACT_TYPE_RESET = 'GET_CONTRACT_TYPE_RESET'
const GET_CONTRACT_TYPE_SUCCESS = 'GET_CONTRACT_TYPE_SUCCESS'
const GET_CONTRACT_TYPE_FAILURE = 'GET_CONTRACT_TYPE_FAILURE'

export function getContractTypeResetAction () {
  return {
    type: GET_CONTRACT_TYPE_RESET
  }
}

export function getContractTypeInitialAction() {
  return {
    type: GET_CONTRACT_TYPE
  }
}

export function getContractTypeSuccessAction(payload) {
  return {
    type: GET_CONTRACT_TYPE_SUCCESS,
    payload,
  }
}

export function getContractTypeFailureAction(payload) {
  return {
    type: GET_CONTRACT_TYPE_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getContractTypeAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getContractTypeInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetContractTypesList',
        params: {searchString: payload} 
      })
      dispatch(getContractTypeSuccessAction(response))
    } catch (error) {
      dispatch(getContractTypeFailureAction(error))
    }
  }
}


export function getContractTypeReducer(state = initialContractType, action) {
  switch (action.type) {
    case GET_CONTRACT_TYPE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_CONTRACT_TYPE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_CONTRACT_TYPE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_CONTRACT_TYPE_FAILURE:
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



/* Legal Entity Type */
const initialLegalEntity = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_LEGAL_ENTITY = 'GET_LEGAL_ENTITY'
const GET_LEGAL_ENTITY_RESET = 'GET_LEGAL_ENTITY_RESET'
const GET_LEGAL_ENTITY_SUCCESS = 'GET_LEGAL_ENTITY_SUCCESS'
const GET_LEGAL_ENTITY_FAILURE = 'GET_LEGAL_ENTITY_FAILURE'

export function getLegalEntityResetAction () {
  return {
    type: GET_LEGAL_ENTITY_RESET
  }
}

export function getLegalEntityInitialAction() {
  return {
    type: GET_LEGAL_ENTITY
  }
}

export function getLegalEntitySuccessAction(payload) {
  return {
    type: GET_LEGAL_ENTITY_SUCCESS,
    payload,
  }
}

export function getLegalEntityFailureAction(payload) {
  return {
    type: GET_LEGAL_ENTITY_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getLegalEntityAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getLegalEntityInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetLegalEntitiesList',
        params: {LegalEntity: payload} 
      })
      dispatch(getLegalEntitySuccessAction(response))
    } catch (error) {
      dispatch(getLegalEntityFailureAction(error))
    }
  }
}


export function getLegalEntityReducer(state = initialLegalEntity, action) {
  switch (action.type) {
    case GET_LEGAL_ENTITY:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_LEGAL_ENTITY_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_LEGAL_ENTITY_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_LEGAL_ENTITY_FAILURE:
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


/* PU */


const initialPU = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_PU = 'GET_PU'
const GET_PU_RESET = 'GET_PU_RESET'
const GET_PU_SUCCESS = 'GET_PU_SUCCESS'
const GET_PU_FAILURE = 'GET_PU_FAILURE'

export function getPUResetAction () {
  return {
    type: GET_PU_RESET
  }
}

export function getPUInitialAction() {
  return {
    type: GET_PU
  }
}

export function getPUSuccessAction(payload) {
  return {
    type: GET_PU_SUCCESS,
    payload,
  }
}

export function getPUFailureAction(payload) {
  return {
    type: GET_PU_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getPUAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getPUInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetPUList',
        params: {PU: payload} 
      })
      dispatch(getPUSuccessAction(response))
    } catch (error) {
      dispatch(getPUFailureAction(error))
    }
  }
}


export function getPUReducer(state = initialPU, action) {
  switch (action.type) {
    case GET_PU:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PU_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PU_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PU_FAILURE:
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

/* Agreement */


const initialAgreement = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_AGREEMENT = 'GET_AGREEMENT'
const GET_AGREEMENT_RESET = 'GET_AGREEMENT_RESET'
const GET_AGREEMENT_SUCCESS = 'GET_AGREEMENT_SUCCESS'
const GET_AGREEMENT_FAILURE = 'GET_AGREEMENT_FAILURE'

export function getAgreementResetAction () {
  return {
    type: GET_AGREEMENT_RESET
  }
}

export function getAgreementInitialAction() {
  return {
    type: GET_AGREEMENT
  }
}

export function getAgreementSuccessAction(payload) {
  return {
    type: GET_AGREEMENT_SUCCESS,
    payload,
  }
}

export function getAgreementFailureAction(payload) {
  return {
    type: GET_AGREEMENT_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getAgreementAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getAgreementInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetAgreementList',
        params: {Agreement: payload} 
      })
      dispatch(getAgreementSuccessAction(response))
    } catch (error) {
      dispatch(getAgreementFailureAction(error))
    }
  }
}


export function getAgreementReducer(state = initialAgreement, action) {
  switch (action.type) {
    case GET_AGREEMENT:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_AGREEMENT_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_AGREEMENT_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_AGREEMENT_FAILURE:
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

/* Project Status */

const initialProjectStatus = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_PROJECT_STATUS = 'GET_PROJECT_STATUS'
const GET_PROJECT_STATUS_RESET = 'GET_PROJECT_STATUS_RESET'
const GET_PROJECT_STATUS_SUCCESS = 'GET_PROJECT_STATUS_SUCCESS'
const GET_PROJECT_STATUS_FAILURE = 'GET_PROJECT_STATUS_FAILURE'

export function getProjectStatusResetAction () {
  return {
    type: GET_PROJECT_STATUS_RESET
  }
}

export function getProjectStatusInitialAction() {
  return {
    type: GET_PROJECT_STATUS
  }
}

export function getProjectStatusSuccessAction(payload) {
  return {
    type: GET_PROJECT_STATUS_SUCCESS,
    payload,
  }
}

export function getProjectStatusFailureAction(payload) {
  return {
    type: GET_PROJECT_STATUS_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getProjectStatusAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProjectStatusInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectStatus',
        params: {Status: payload} 
      })
      dispatch(getProjectStatusSuccessAction(response))      
    } catch (error) {
      dispatch(getProjectStatusFailureAction(error))
    }
  }
}


export function getProjectStatusReducer(state = initialProjectStatus, action) {
  switch (action.type) {
    case GET_PROJECT_STATUS:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_STATUS_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_STATUS_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PROJECT_STATUS_FAILURE:
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


/* Umbrella Code */


const initialUmbrellaCode = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_UMBRELLA_CODE = 'GET_UMBRELLA_CODE'
const GET_UMBRELLA_CODE_RESET = 'GET_UMBRELLA_CODE_RESET'
const GET_UMBRELLA_CODE_SUCCESS = 'GET_UMBRELLA_CODE_SUCCESS'
const GET_UMBRELLA_CODE_FAILURE = 'GET_UMBRELLA_CODE_FAILURE'

export function getUmbrellaCodeResetAction () {
  return {
    type: GET_UMBRELLA_CODE_RESET
  }
}

export function getUmbrellaCodeInitialAction() {
  return {
    type: GET_UMBRELLA_CODE
  }
}

export function getUmbrellaCodeSuccessAction(payload) {
  return {
    type: GET_UMBRELLA_CODE_SUCCESS,
    payload,
  }
}

export function getUmbrellaCodeFailureAction(payload) {
  return {
    type: GET_UMBRELLA_CODE_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getUmbrellaCodeAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getUmbrellaCodeInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetUmbrellaCodeList',
        params: {UmbrellaCode: payload} 
      })
      dispatch(getUmbrellaCodeSuccessAction(response))
    } catch (error) {
      dispatch(getUmbrellaCodeFailureAction(error))
    }
  }
}


export function getUmbrellaCodeReducer(state = initialUmbrellaCode, action) {
  switch (action.type) {
    case GET_UMBRELLA_CODE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_UMBRELLA_CODE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_UMBRELLA_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_UMBRELLA_CODE_FAILURE:
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


/* Contract Number */



const initialContractNumber = {
  loading: false,
  error: false,
  flag: false,
  data: {}
}


const GET_CONTRACT_NUMBER = 'GET_CONTRACT_NUMBER'
const GET_CONTRACT_NUMBER_RESET = 'GET_CONTRACT_NUMBER_RESET'
const GET_CONTRACT_NUMBER_SUCCESS = 'GET_CONTRACT_NUMBER_SUCCESS'
const GET_CONTRACT_NUMBER_FAILURE = 'GET_CONTRACT_NUMBER_FAILURE'

export function getContractNumberResetAction () {
  return {
    type: GET_CONTRACT_NUMBER_RESET
  }
}

export function getContractNumberInitialAction() {
  return {
    type: GET_CONTRACT_NUMBER
  }
}

export function getContractNumberSuccessAction(payload) {
  return {
    type: GET_CONTRACT_NUMBER_SUCCESS,
    payload,
  }
}

export function getContractNumberFailureAction(payload) {
  return {
    type: GET_CONTRACT_NUMBER_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getContractNumberAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getContractNumberInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetContractNumberList',
        params: {searchString: payload} 
      })
      dispatch(getContractNumberSuccessAction(response))
    } catch (error) {
      dispatch(getContractNumberFailureAction(error))
    }
  }
}


export function getContractNumberReducer(state = initialContractNumber, action) {
  switch (action.type) {
    case GET_CONTRACT_NUMBER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_CONTRACT_NUMBER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_CONTRACT_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_CONTRACT_NUMBER_FAILURE:
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

/* Project Search */
const initialProjectSearch = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_PROJECT_SEARCH = 'GET_PROJECT_SEARCH'
const GET_PROJECT_SEARCH_RESET = 'GET_PROJECT_SEARCH_RESET'
const GET_PROJECT_SEARCH_SUCCESS = 'GET_PROJECT_SEARCH_SUCCESS'
const GET_PROJECT_SEARCH_FAILURE = 'GET_PROJECT_SEARCH_FAILURE'

export function getProjectSearchResetAction () {
  return {
    type: GET_PROJECT_SEARCH_RESET
  }
}

export function getProjectSearchInitialAction() {
  return {
    type: GET_PROJECT_SEARCH
  }
}

export function getProjectSearchSuccessAction(payload) {
  return {
    type: GET_PROJECT_SEARCH_SUCCESS,
    payload,
  }
}

export function getProjectSearchFailureAction(payload) {
  return {
    type: GET_PROJECT_SEARCH_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getProjectSearchAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getProjectSearchInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetProjectSearchCriteria',
        params: payload
      })
      dispatch(getProjectSearchSuccessAction(response))
    } catch (error) {
      dispatch(getProjectSearchFailureAction(error))
    }
  }
}


export function getProjectSearchReducer(state = initialProjectSearch, action) {
  switch (action.type) {
    case GET_PROJECT_SEARCH:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_SEARCH_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_PROJECT_SEARCH_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_PROJECT_SEARCH_FAILURE:
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





/* Selected Project Number Search */
const initialSelectedProjectNumber = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const SELECTED_PROJECT_NUMBER = 'SELECTED_PROJECT_NUMBER'
const SELECTED_PROJECT_NUMBER_RESET = 'SELECTED_PROJECT_NUMBER_RESET'
const SELECTED_PROJECT_NUMBER_SUCCESS = 'SELECTED_PROJECT_NUMBER_SUCCESS'
const SELECTED_PROJECT_NUMBER_FAILURE = 'SELECTED_PROJECT_NUMBER_FAILURE'

export function selectedProjectNumberResetAction () {
  return {
    type: SELECTED_PROJECT_NUMBER_RESET
  }
}

export function selectedProjectNumberInitialAction() {
  return {
    type: SELECTED_PROJECT_NUMBER
  }
}

export function selectedProjectNumberSuccessAction(payload) {
  return {
    type: SELECTED_PROJECT_NUMBER_SUCCESS,
    payload,
  }
}

export function selectedProjectNumberFailureAction(payload) {
  return {
    type: SELECTED_PROJECT_NUMBER_FAILURE,
    payload
  }
}

export function selectedProjectNumberAction (payload, flag) {
  return async (dispatch) => {
    try {
      dispatch(selectedProjectNumberInitialAction())
      const response = await apiCall({
        method: 'get',
        url: flag ? 'GetProjectMapData' : '/GetProjectMapDataTemp',
        params: payload
      })
      dispatch(selectedProjectNumberSuccessAction(response))
    } catch (error) {
      dispatch(selectedProjectNumberFailureAction())
    }
  }
}


export function selectedProjectNumberReducer(state = initialSelectedProjectNumber, action) {
  switch (action.type) {
    case SELECTED_PROJECT_NUMBER:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case SELECTED_PROJECT_NUMBER_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case SELECTED_PROJECT_NUMBER_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case SELECTED_PROJECT_NUMBER_FAILURE:
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




