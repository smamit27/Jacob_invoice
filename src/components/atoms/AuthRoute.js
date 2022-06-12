import { Route, Redirect } from 'react-router-dom'
import React from 'react'
import { getCookie } from '../../services/cookie'

function AuthRoute(props) {
  const auth = getCookie('auth')
  if (auth) {
    return <Route {...props} />
  }
  return <Redirect to='/' />
}

export default AuthRoute
