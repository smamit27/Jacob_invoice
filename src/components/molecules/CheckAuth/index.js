import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { Loader } from '../../atoms'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { checkAuthAction } from './logic'

function CheckAuth({ children }) {
  const dispatch = useDispatch()
  const { loading, error }  = useIntialSelector('checkAuth')
  useEffect(() => {
    dispatch(checkAuthAction())
  }, [])
  return (
    <Loader style={{ height: '100vh' }} loading={loading} error={error} >
      {children}
    </Loader>
  )
}

export default CheckAuth
