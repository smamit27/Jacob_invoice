import React from 'react'
import { MenuItem, TextField } from '@mui/material'

export const textEditorClassname = `rdg-text-editor rdg-select-dropdown`;

export default function SelectEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions
}) {
  const onChange = (event) => {
    onRowChange({ ...row, [column.key]: event.target.value })
    const { getChange } = otherFunctions
    if (getChange) {
      getChange({ ...row, [column.key]: event.target.value }, column.key)
    }
  }
  const onBlur = () => {
    const { onCellBlur } = otherFunctions
    if (onCellBlur) {
      onCellBlur(row[column?.key], column.key)
    }
    onClose(true)
  }
  return (
    <TextField size="small" autoFocus placeholder="select" onBlur={onBlur} value={row[column.key] || ''} onChange={onChange} select fullWidth SelectProps={{ MenuProps: { disablePortal: false }, displayEmpty: true }}>
        <MenuItem disabled key={-1} value="">Select</MenuItem>
        {(column?.valueOptions || []).map((d, i) => (
        <MenuItem key={i} value={d.id || d}>{d.description || d}</MenuItem>
        ))}
    </TextField>
  );
}
