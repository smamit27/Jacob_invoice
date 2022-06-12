import { apiCall } from '../../services/httpService'

const initialCurrency = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
  
  
  const GET_CURRENCY = 'GET_CURRENCY'
  const GET_CURRENCY_RESET = 'GET_CURRENCY_RESET'
  const GET_CURRENCY_SUCCESS = 'GET_CURRENCY_SUCCESS'
  const GET_CURRENCY_FAILURE = 'GET_CURRENCY_FAILURE'
  
  export function getCurrencyResetAction () {
    return {
      type: GET_CURRENCY_RESET
    }
  }
  
  export function getCurrencyInitialAction() {
    return {
      type: GET_CURRENCY
    }
  }
  
  export function getCurrencySuccessAction(payload) {
    return {
      type: GET_CURRENCY_SUCCESS,
      payload,
    }
  }
  
  export function getCurrencyFailureAction(payload) {
    return {
      type: GET_CURRENCY_FAILURE,
      payload
    }
  }
  
  export function getCurrencyAction () {
    return async (dispatch) => {
      try {
        dispatch(getCurrencyInitialAction())
        const response = await apiCall({
          method: 'get',
          url: '/GetCurrency'
        })
        dispatch(getCurrencySuccessAction(response.map(d => d.CURRENCY_CODE)))
      } catch (error) {
        dispatch(getCurrencyFailureAction(error))
      }
    }
  }
  
  
  export function getCurrencyReducer(state = initialCurrency, action) {
    switch (action.type) {
      case GET_CURRENCY:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case GET_CURRENCY_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case GET_CURRENCY_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case GET_CURRENCY_FAILURE:
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

  const initialGenerateCollection = {
    loading: false,
    error: false,
    flag: false,
    data: []
  }
  
  
  const GET_GENERATE_COLLECTION = 'GET_GENERATE_COLLECTION'
  const GET_GENERATE_COLLECTION_RESET = 'GET_GENERATE_COLLECTION_RESET'
  const GET_GENERATE_COLLECTION_SUCCESS = 'GET_GENERATE_COLLECTION_SUCCESS'
  const GET_GENERATE_COLLECTION_FAILURE = 'GET_GENERATE_COLLECTION_FAILURE'
  const GET_GENERATE_COLLECTION_CUSTOM = 'GET_GENERATE_COLLECTION_CUSTOM'
  
  export function getGenerateCollectionResetAction () {
    return {
      type: GET_GENERATE_COLLECTION_RESET
    }
  }
  
  export function getGenerateCollectionInitialAction() {
    return {
      type: GET_GENERATE_COLLECTION
    }
  }
  
  export function getGenerateCollectionSuccessAction(payload) {
    return {
      type: GET_GENERATE_COLLECTION_SUCCESS,
      payload,
    }
  }
  
  export function getGenerateCollectionFailureAction(payload) {
    return {
      type: GET_GENERATE_COLLECTION_FAILURE,
      payload
    }
  }
  
  export function getGenerateCollectionAction () {

    return async (dispatch) => {
      try {
        dispatch(getGenerateCollectionInitialAction())
        const response = await apiCall({
          method: 'post',
          url: '/GetCollectionIDSequence'
        })
        dispatch(getGenerateCollectionSuccessAction(response.map(d => d.COLLECTION_ID)))
      } catch (error) {
        dispatch(getGenerateCollectionFailureAction(error))
      }
    }
  }

  export function getGenerateCollectionCustomAction(payload) {
    return {
      type: GET_GENERATE_COLLECTION_CUSTOM,
      payload
    }
  }

  export function getGenerateCollectionReducer(state = initialGenerateCollection, action) {
    switch (action.type) {
      case GET_GENERATE_COLLECTION:
        return {
          ...state,
          loading: true,
          error: false,
          flag: false,
          data: []
        }
      case GET_GENERATE_COLLECTION_RESET:
        return {
          ...state,
          loading: false,
          error: false,
          flag: false,
          data: []
        }
      case GET_GENERATE_COLLECTION_SUCCESS:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case GET_GENERATE_COLLECTION_CUSTOM:
        return {
          ...state,
          loading: false,
          error: false,
          flag: true,
          data: action.payload
        }
      case GET_GENERATE_COLLECTION_FAILURE:
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

  const PROJECT_OR_ALLIANCE_CHANGE_SUCCESS = 'PROJECT_OR_ALLIANCE_CHANGE_SUCCESS'
const PROJECT_OR_ALLIANCE_CHANGE_RESET = 'PROJECT_OR_ALLIANCE_CHANGE_RESET'

const initialStatePOAChange = {
  flag: false,
}

export function projectOrAllianceChangeSuccessAction (payload = {}) {
  return {
    type: PROJECT_OR_ALLIANCE_CHANGE_SUCCESS,
    payload
  }
}

export function projectOrAllianceChangeResetAction () {
  return {
    type: PROJECT_OR_ALLIANCE_CHANGE_RESET,
  }
}


export function projectOrAllianceChangeReducer (state = initialStatePOAChange, action) {
  switch (action.type) {
    case PROJECT_OR_ALLIANCE_CHANGE_SUCCESS:
      return {
        ...state,
        flag: true
      }
    case PROJECT_OR_ALLIANCE_CHANGE_RESET:
      return {
        ...state,
        flag: false
      }
    default:
      return state
  }
}
