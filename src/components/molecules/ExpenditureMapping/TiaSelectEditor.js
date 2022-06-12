import React from 'react'
import { MenuItem, TextField } from '@mui/material'

export const textEditorClassname = `rdg-text-editor rdg-select-dropdown`;

export default function TiaSelectEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions
}) {
  const onChange = (event) => {
    const val = event.target.value === 'No' ? 'N' : 'Y'
    onRowChange({ ...row, [column.key]: event.target.value, EXEMPT: val })
    const { getChange } = otherFunctions
    if (getChange) {
      getChange({ ...row, [column.key]: event.target.value, EXEMPT: val }, column.key)
    }
  }
  const onBlur = () => {
    onClose(true)
  }
  return (
    <TextField size="small" autoFocus placeholder="select" onBlur={onBlur} value={row[column.key] || ''} onChange={onChange} select fullWidth SelectProps={{ MenuProps: { disablePortal: false }, displayEmpty: true }}>
        <MenuItem disabled key={-1} value="">Select</MenuItem>
        {(column?.valueOptions || []).map((d, i) => (
        <MenuItem key={i} value={d.description}>{d.description}</MenuItem>
        ))}
    </TextField>
  );
}
