import { apiCall } from "../../../services/httpService"

const initialGetBillingSchedule = {
  loading: false,
  error: false,
  flag: false,
  data: []
}


const GET_BILLING_SCHEDULE = 'GET_BILLING_SCHEDULE'
const GET_BILLING_SCHEDULE_RESET = 'GET_BILLING_SCHEDULE_RESET'
const GET_BILLING_SCHEDULE_SUCCESS = 'GET_BILLING_SCHEDULE_SUCCESS'
const GET_BILLING_SCHEDULE_FAILURE = 'GET_BILLING_SCHEDULE_FAILURE'

export function getBillingScheduleResetAction () {
  return {
    type: GET_BILLING_SCHEDULE_RESET
  }
}

export function getBillingScheduleInitialAction() {
  return {
    type: GET_BILLING_SCHEDULE
  }
}

export function getBillingScheduleSuccessAction(payload) {
  return {
    type: GET_BILLING_SCHEDULE_SUCCESS,
    payload,
  }
}

export function getBillingScheduleFailureAction(payload) {
  return {
    type: GET_BILLING_SCHEDULE_FAILURE,
    payload
  }
}

export function getBillingScheduleAction (payload) {
  return async (dispatch) => {
    try {
      dispatch(getBillingScheduleInitialAction())
      const response = await apiCall({
        method: 'get',
        url: '/GetBillingScheduleOverview',
        params: payload
      })
      dispatch(getBillingScheduleSuccessAction(response))
    } catch (error) {
      dispatch(getBillingScheduleFailureAction(error))
    }
  }
}


export function getBillingScheduleReducer(state = initialGetBillingSchedule, action) {
  switch (action.type) {
    case GET_BILLING_SCHEDULE:
      return {
        ...state,
        loading: true,
        error: false,
        flag: false,
        data: []
      }
    case GET_BILLING_SCHEDULE_RESET:
      return {
        ...state,
        loading: false,
        error: false,
        flag: false,
        data: []
      }
    case GET_BILLING_SCHEDULE_SUCCESS:
      return {
        ...state,
        loading: false,
        error: false,
        flag: true,
        data: action.payload
      }
    case GET_BILLING_SCHEDULE_FAILURE:
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
