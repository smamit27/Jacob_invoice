import { IconButton } from '@mui/material'
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import React from 'react'

function CustomSort({ active = false, direction = '', onSort }) {
  const onClick = () => {
    if (direction === 'asc') {
      onSort('desc')
    } else if (direction === 'desc') {
      onSort('')
    } else {
      onSort('asc')
    }
  }
  return (
    <div className={`custom-table-sort ${active ? 'active' : ''}`} >
      <IconButton onClick={onClick} size="small" >{direction === 'desc' ? <ArrowDownwardIcon fontSize="small" /> : <ArrowUpwardIcon fontSize="small" /> }</IconButton>
    </div>
  )
}

export default CustomSort
