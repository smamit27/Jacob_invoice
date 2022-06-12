import { Backdrop, CircularProgress } from '@mui/material'
import React from 'react'
import { useSelector } from 'react-redux'

function BackDropLoader() {
  const { open } = useSelector(state => state.backDropLoader)
  return (
    <Backdrop
      sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.modal + 5 }}
      open={open}
    >
      <CircularProgress color="inherit" />
    </Backdrop>
  )
}

export default BackDropLoader
