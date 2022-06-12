import { Button } from '@mui/material'
import React from 'react'
import EditableCell from '../../atoms/CustomTable/EditableCell'

function AddRow(props) {
  const {
    value: initialValue = '',
    row = {},
    column = {},
    updateMyData,
    depth,
  } = props
  const handleAddRow = () => {
    updateMyData(row, column, initialValue, 'add-row')
  }
  if (typeof row?.depth === 'undefined') {
    return null
  }
  if (row?.depth === depth) {
    return (
      <Button onClick={handleAddRow} size="small" >Add Row</Button>
    )
  }
  return <EditableCell {...props} />
}

export default AddRow
