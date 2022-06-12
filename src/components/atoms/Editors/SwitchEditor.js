import React from 'react'
import { Switch } from '@mui/material'

export const editorClassname = `rdg-text-editor rdg-switch`;

export default function SwitchEditor({
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
    const { onCellBlur } = otherFunctions
    if (onCellBlur) {
      onCellBlur(row[column?.key], column.key)
    }
    onClose(true)
  }
  return (
    <div className={`disp-flex full-width center ${editorClassname}`} ><Switch checked={row[column.key] === 'Y'} onBlur={onBlur} onChange={onChange} /></div>
  );
}