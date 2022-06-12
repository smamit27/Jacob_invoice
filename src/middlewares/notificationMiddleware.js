import { errorStatusNotificationAction, statusNotificationAction } from "../components/molecules/StatusNotification/logic";

const notificationMiddleware = ({ dispatch, getState }) => next => action => {
  if (action?.type?.indexOf('_SUCCESS') > -1 && action?.showNotification) {
    dispatch(statusNotificationAction({
      type: action?.type,
      message: action?.message || 'Successfull'
    }))
  }
  if (action?.type?.indexOf('_FAILURE') > -1 && !action?.hideNotification) {
    const { message = '' } = action?.payload || {}
    dispatch(errorStatusNotificationAction({
      type: action?.type,
      message: message || action?.message || 'Something went wrong. Please try again after some time.'
    }))
  }
  next(action);
}

export default notificationMiddleware