import React from 'react'
import { Typography, Box, CircularProgress, Stack } from '@mui/material';

const localStyle = {
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  width: '100%'
}

function Loader({
  children = null,
  loading = false,
  error = false,
  errorMessage = 'Something went wrong. Please try again after sometime.',
  noData = false,
  noDataMessage = 'No Entries Found.',
  style = {},
  noDataComponent = null
}) {
  if (loading) {
    return (
      <Box sx={{ ...localStyle, ...style }}>
        <CircularProgress />
      </Box>
    );
  } else if (error) {
    return (
      <Box sx={{ ...localStyle, ...style }}>
        <Typography className="bold" variant="subtitle2" gutterBottom component="div">
          {errorMessage}
        </Typography>
      </Box>
    );
  } else if (noData) {
    if (noDataComponent) {
      return (
        <Box sx={{ ...localStyle, ...style }}>
          <Stack spacing={3.5} alignItems="center" >
            <Typography className="bold" variant="subtitle2" gutterBottom component="div">
              {noDataMessage}
            </Typography>
            {noDataComponent()}
          </Stack>
        </Box>
      )
    }
    return (
      <Box sx={{ ...localStyle, ...style }}>
        <Typography className="bold" variant="subtitle2" gutterBottom component="div">
          {noDataMessage}
        </Typography>
      </Box>
    );
  }
  return children
}

export default Loader
