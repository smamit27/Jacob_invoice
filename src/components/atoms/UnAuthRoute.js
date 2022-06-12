import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { getCookie } from '../../services/cookie'

function UnAuthRoute(props) {
  const auth = getCookie('auth')
  if (!auth) {
    return <Route {...props} />
  }
  return <Redirect to='/home' />
}

export default UnAuthRoute
