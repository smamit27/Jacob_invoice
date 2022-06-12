import { useSnackbar } from 'notistack';
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux';
import { cancelStatusNotificationAction } from './logic';

function StatusNotification() {
  const { type, status, message } = useSelector(state => state.statusNotification)
  const dispatch = useDispatch()
  const { enqueueSnackbar } = useSnackbar();
  useEffect(() => {
    if (type !== 'CANCEL_STATUS_NOTIFICATION') {
      enqueueSnackbar(message, { variant: status, preventDuplicate: true, autoHideDuration: 5000 });
      dispatch(cancelStatusNotificationAction())
    }
  }, [type])
  return null
}

export default StatusNotification
