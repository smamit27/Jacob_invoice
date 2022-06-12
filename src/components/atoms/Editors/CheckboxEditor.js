import React from 'react'
import { Checkbox } from '@mui/material'

export const editorClassname = `rdg-text-editor rdg-switch`;

export default function CheckboxEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions
}) {
  const onChange = (e) => {
    onRowChange({ ...row, [column.key]: e.target.checked ? 'Y' : "N" })
    const { getChange } = otherFunctions
    if (getChange) {
      getChange({ ...row, [column.key]: e.target.checked ? 'Y' : "N" }, column.key)
    }
  }
  const onBlur = () => {
    onClose(true)
  }
  return (
    <div className={`disp-flex full-width center ${editorClassname}`} ><Checkbox checked={row[column.key] === 'Y'} onBlur={onBlur} onChange={onChange} /></div>
  );
}
