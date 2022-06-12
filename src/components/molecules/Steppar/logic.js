import { apiCall } from "../../../services/httpService"

const initialAllianceCodeOne = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALLIANCE_CODE_ONE = 'GET_ALLIANCE_CODE_ONE'
const GET_ALLIANCE_CODE_ONE_RESET = 'GET_ALLIANCE_CODE_ONE_RESET'
const GET_ALLIANCE_CODE_ONE_SUCCESS = 'GET_ALLIANCE_CODE_ONE_SUCCESS'
const GET_ALLIANCE_CODE_ONE_FAILURE = 'GET_ALLIANCE_CODE_ONE_FAILURE'

export function getAllianceCodeOneResetAction () {
  return {
    type: GET_ALLIANCE_CODE_ONE_RESET
  }
}

export function getAllianceCodeOneInitialAction() {
  return {
    type: GET_ALLIANCE_CODE_ONE
  }
}

export function getAllianceCodeOneSuccessAction(payload) {
  return {
    type: GET_ALLIANCE_CODE_ONE_SUCCESS,
    payload,
  }
}

export function getAllianceCodeOneFailureAction(payload) {
  return {
    type: GET_ALLIANCE_CODE_ONE_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getAllianceCodeOneAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getAllianceCodeOneInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetAllianceCode1',
        params: {allianceCode: payload} 
      })
      dispatch(getAllianceCodeOneSuccessAction(response))
    } catch (error) {
      dispatch(getAllianceCodeOneFailureAction(error))
    }
  }
}


export function getAllianceCodeOneReducer(state = initialAllianceCodeOne, action) {
  switch (action.type) {
    case GET_ALLIANCE_CODE_ONE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLIANCE_CODE_ONE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLIANCE_CODE_ONE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALLIANCE_CODE_ONE_FAILURE:
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

/* Alliance Code Two */

const initialAllianceCodeTwo = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALLIANCE_CODE_TWO = 'GET_ALLIANCE_CODE_TWO'
const GET_ALLIANCE_CODE_TWO_RESET = 'GET_ALLIANCE_CODE_TWO_RESET'
const GET_ALLIANCE_CODE_TWO_SUCCESS = 'GET_ALLIANCE_CODE_TWO_SUCCESS'
const GET_ALLIANCE_CODE_TWO_FAILURE = 'GET_ALLIANCE_CODE_TWO_FAILURE'

export function getAllianceCodeTwoResetAction () {
  return {
    type: GET_ALLIANCE_CODE_TWO_RESET
  }
}

export function getAllianceCodeTwoInitialAction() {
  return {
    type: GET_ALLIANCE_CODE_TWO
  }
}

export function getAllianceCodeTwoSuccessAction(payload) {
  return {
    type: GET_ALLIANCE_CODE_TWO_SUCCESS,
    payload,
  }
}

export function getAllianceCodeTwoFailureAction(payload) {
  return {
    type: GET_ALLIANCE_CODE_TWO_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getAllianceCodeTwoAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getAllianceCodeTwoInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetAllianceCode2',
        params: {allianceCode: payload} 
      })
      dispatch(getAllianceCodeTwoSuccessAction(response))
    } catch (error) {
      dispatch(getAllianceCodeTwoFailureAction(error))
    }
  }
}


export function getAllianceCodeTwoReducer(state = initialAllianceCodeTwo, action) {
  switch (action.type) {
    case GET_ALLIANCE_CODE_TWO:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLIANCE_CODE_TWO_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLIANCE_CODE_TWO_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALLIANCE_CODE_TWO_FAILURE:
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

/* Alliance Code Three*/
const initialAllianceCodeThree = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_ALLIANCE_CODE_THREE = 'GET_ALLIANCE_CODE_THREE'
const GET_ALLIANCE_CODE_THREE_RESET = 'GET_ALLIANCE_CODE_THREE_RESET'
const GET_ALLIANCE_CODE_THREE_SUCCESS = 'GET_ALLIANCE_CODE_THREE_SUCCESS'
const GET_ALLIANCE_CODE_THREE_FAILURE = 'GET_ALLIANCE_CODE_THREE_FAILURE'

export function getAllianceCodeThreeResetAction () {
  return {
    type: GET_ALLIANCE_CODE_THREE_RESET
  }
}

export function getAllianceCodeThreeInitialAction() {
  return {
    type: GET_ALLIANCE_CODE_THREE
  }
}

export function getAllianceCodeThreeSuccessAction(payload) {
  return {
    type: GET_ALLIANCE_CODE_THREE_SUCCESS,
    payload,
  }
}

export function getAllianceCodeThreeFailureAction(payload) {
  return {
    type: GET_ALLIANCE_CODE_THREE_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getAllianceCodeThreeAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getAllianceCodeThreeInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetAllianceCode3',
        params: {allianceCode: payload} 
      })
      dispatch(getAllianceCodeThreeSuccessAction(response))
    } catch (error) {
      dispatch(getAllianceCodeThreeFailureAction(error))
    }
  }
}


export function getAllianceCodeThreeReducer(state = initialAllianceCodeThree, action) {
  switch (action.type) {
    case GET_ALLIANCE_CODE_THREE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLIANCE_CODE_THREE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_ALLIANCE_CODE_THREE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_ALLIANCE_CODE_THREE_FAILURE:
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

/* Save Alliance Code and Project Number */
const initialAllianceProject = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
  
  
  const GET_ALLIANCE_PROJECT = 'GET_ALLIANCE_PROJECT'
  const GET_ALLIANCE_PROJECT_RESET = 'GET_ALLIANCE_PROJECT_RESET'
  const GET_ALLIANCE_PROJECT_FLAG_RESET = 'GET_ALLIANCE_PROJECT_FLAG_RESET'
  const GET_ALLIANCE_PROJECT_SUCCESS = 'GET_ALLIANCE_PROJECT_SUCCESS'
  const GET_ALLIANCE_PROJECT_FAILURE = 'GET_ALLIANCE_PROJECT_FAILURE'
  
  export function saveAllianceProjectResetAction () {
    return {
      type: GET_ALLIANCE_PROJECT_RESET
    }
  }
  
  export function saveAllianceProjectFlagResetAction () {
    return {
      type: GET_ALLIANCE_PROJECT_FLAG_RESET
    }
  }

  export function saveAllianceProjectInitialAction() {
    return {
      type: GET_ALLIANCE_PROJECT
    }
  }
  
  export function saveAllianceProjectSuccessAction(payload) {
    return {
      type: GET_ALLIANCE_PROJECT_SUCCESS,
      payload,
    }
  }
  
  export function saveAllianceProjectFailureAction(payload) {
    return {
      type: GET_ALLIANCE_PROJECT_FAILURE,
      payload
    }
  }
  
  export function saveAllianceProjectAction (payload,generateCollectionId, flag) {
    return async (dispatch) => {
      try {
        dispatch(saveAllianceProjectInitialAction())
        const response = await apiCall({
          method: 'post',
          url: flag ? '/SaveAllcProjMapping' : '/InsertAllProjectMapping',
          params: flag ? {collectionID:generateCollectionId[0]} : {CollectionID:generateCollectionId[0]},
          data: payload 
        })
        dispatch(saveAllianceProjectSuccessAction(response))
      } catch (error) {
        dispatch(saveAllianceProjectFailureAction(error))
      }
    }
  }
  
  
  export function saveAllianceProjectReducer(state = initialAllianceProject, action) {
    switch (action.type) {
      case GET_ALLIANCE_PROJECT:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case GET_ALLIANCE_PROJECT_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case GET_ALLIANCE_PROJECT_FLAG_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
        }
      case GET_ALLIANCE_PROJECT_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case GET_ALLIANCE_PROJECT_FAILURE:
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

  /* Get Alliance code and project Search in table */
  
/* Save Alliance Code and Project Number */
const initialAllAllianceProjectDetails = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
  
  
  const GET_ALLIANCE_PROJECT_DETAIL = 'GET_ALLIANCE_PROJECT_DETAIL'
  const GET_ALLIANCE_PROJECT_DETAIL_RESET = 'GET_ALLIANCE_PROJECT_DETAIL_RESET'
  const GET_ALLIANCE_PROJECT_DETAIL_SUCCESS = 'GET_ALLIANCE_PROJECT_DETAIL_SUCCESS'
  const GET_ALLIANCE_PROJECT_DETAIL_FAILURE = 'GET_ALLIANCE_PROJECT_DETAIL_FAILURE'
  
  export function getAllianceProjectDetailResetAction () {
    return {
      type: GET_ALLIANCE_PROJECT_DETAIL_RESET
    }
  }
  
  export function getAllianceProjectDetailInitialAction() {
    return {
      type: GET_ALLIANCE_PROJECT_DETAIL
    }
  }
  
  export function getAllianceProjectDetailSuccessAction(payload) {
    return {
      type: GET_ALLIANCE_PROJECT_DETAIL_SUCCESS,
      payload,
    }
  }
  
  export function getAllianceProjectDetailFailureAction(payload) {
    return {
      type: GET_ALLIANCE_PROJECT_DETAIL_FAILURE,
      payload,
    }
  }
  
  export function getAllianceProjectDetailAction (generateCollectionId, flag) {
    return async (dispatch) => {
      try {
        dispatch(getAllianceProjectDetailInitialAction())
        const response = await apiCall({
          method: 'get',
          url: flag ? '/GetProjectAllocationMapData' : '/GetProjectAllocationMapTempData',
          params: {CollectionId:generateCollectionId[0]},
        })
        dispatch(getAllianceProjectDetailSuccessAction(response))
      } catch (error) {
        dispatch(getAllianceProjectDetailFailureAction(error))
      }
    }
  }
  
  
  export function getAllianceProjectDetailReducer(state = initialAllianceProject, action) {
    switch (action.type) {
      case GET_ALLIANCE_PROJECT_DETAIL:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case GET_ALLIANCE_PROJECT_DETAIL_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case GET_ALLIANCE_PROJECT_DETAIL_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case GET_ALLIANCE_PROJECT_DETAIL_FAILURE:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      default:
        return state
    }
  }
  

/* Save Alliance Code and Project Number */
const initialAllClientCode = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_CLIENT_CODE = 'GET_CLIENT_CODE'
const GET_CLIENT_CODE_RESET = 'GET_CLIENT_CODE_RESET'
const GET_CLIENT_CODE_SUCCESS = 'GET_CLIENT_CODE_SUCCESS'
const GET_CLIENT_CODE_FAILURE = 'GET_CLIENT_CODE_FAILURE'

export function getClientCodeResetAction () {
  return {
    type: GET_CLIENT_CODE_RESET
  }
}

export function getClientCodeInitialAction() {
  return {
    type: GET_CLIENT_CODE
  }
}

export function getClientCodeSuccessAction(payload) {
  return {
    type: GET_CLIENT_CODE_SUCCESS,
    payload,
  }
}

export function getClientCodeFailureAction(payload) {
  return {
    type: GET_CLIENT_CODE_FAILURE,
    payload,
    hideNotification: true
  }
}

export function getClientCodeAction (clientname) {
  return async (dispatch) => {
    try {
      dispatch(getClientCodeInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetClientSearchName',
        params: {ClientName:clientname},
      })
      dispatch(getClientCodeSuccessAction(response))
    } catch (error) {
      dispatch(getClientCodeFailureAction())
    }
  }
}


export function getClientCodeReducer(state = initialAllianceProject, action) {
  switch (action.type) {
    case GET_CLIENT_CODE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_CLIENT_CODE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_CLIENT_CODE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_CLIENT_CODE_FAILURE:
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

