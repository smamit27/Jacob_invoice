import React from 'react'
import { Avatar, Box, CircularProgress } from '@mui/material';

const localStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%',
  flexDirection: 'column'
}

function NoDataFound({
  children = null,
}) {

  return (
    <Box style={localStyle}  >
      <Avatar sx={{ width: 90, height: 90 }} >
        <i className="fas fa-2x fa-box-open" />
      </Avatar>
      {children}
    </Box>
  )
}

export default NoDataFound
