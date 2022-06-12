const STATUS_NOTIFICATION = 'STATUS_NOTIFICATION'
const ERROR_STATUS_NOTIFICATION = 'ERROR_STATUS_NOTIFICATION'
const WARNING_STATUS_NOTIFICATION = 'WARNING_STATUS_NOTIFICATION'
const CANCEL_STATUS_NOTIFICATION = 'CANCEL_STATUS_NOTIFICATION'

const initialState = {
  type: CANCEL_STATUS_NOTIFICATION,
  message: '',
  status: ''
}

export function statusNotificationAction({ type, message }) {
  return {
    type: STATUS_NOTIFICATION,
    payload: {
      type,
      status: 'success',
      message
    }
  }
}

export function errorStatusNotificationAction({ type, message }) {
  return {
    type: ERROR_STATUS_NOTIFICATION,
    payload: {
      type,
      status: 'error',
      message
    }
  }
}

export function warningStatusNotificationAction({ type, message }) {
  return {
    type: WARNING_STATUS_NOTIFICATION,
    payload: {
      type,
      status: 'warning',
      message
    }
  }
}

export function cancelStatusNotificationAction() {
  return {
    type: CANCEL_STATUS_NOTIFICATION,
    payload: {...initialState}
  }
}


export function statusNotificationReducer (state = initialState, action) {
  switch (action.type) {
    case STATUS_NOTIFICATION:
      return {
        ...state,
        ...(action?.payload || {})
      }
    case ERROR_STATUS_NOTIFICATION:
      return {
        ...state,
        ...(action?.payload || {})
      }
    case WARNING_STATUS_NOTIFICATION:
      return {
        ...state,
        ...(action?.payload || {})
      }
    case CANCEL_STATUS_NOTIFICATION:
      return {
        ...state,
        ...(action?.payload || {})
      }
    default:
      return state
  }
}