import { Button, styled } from '@mui/material';
import { useHistory } from 'react-router-dom'
import React from 'react'
import { useDispatch } from 'react-redux';
import { setCookie } from '../../services/cookie';
import { statusNotificationAction } from '../molecules/StatusNotification/logic';

const Div = styled('div')({
  color: 'darkslategray',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  height: '80vh',
  width: '100%'
});

function Landing() {
  const dispatch = useDispatch()
  const history = useHistory()
  const onLogin = () => {
    setCookie('auth', 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1bmlxdWVfbmFtZSI6IkpFR0lOVExcXFNJTkdIQTIzIiwibmJmIjoxNjM5Mzc4MDA2LCJleHAiOjE2Mzk5ODI4MDYsImlhdCI6MTYzOTM3ODAwNiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo0ODg0OSIsImF1ZCI6Imh0dHA6Ly9sb2NhbGhvc3Q6NDg4NDkifQ.2PacsyW84BKbs078P2qva8HVVqoJwqhPeBvusaqKczk')
    dispatch(statusNotificationAction({
      type: 'LOGIN_SUCCESS',
      message: 'You have logged in successfully'
    }))
    history.replace('/home')
  }
  return (
    <Div>
      <Button variant="contained" onClick={onLogin} >Login</Button>
    </Div>
  )
}

export default Landing
