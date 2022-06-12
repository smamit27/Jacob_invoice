import React from 'react'
import { TextField } from '@mui/material';
import NumberFormat from 'react-number-format';

export const editorClassname = `rdg-text-editor rdg-date-editor`;

export default function NumberEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions
}) {
  const onChange = (val, ...resr) => {
    onRowChange({ ...row, [column.key]: val?.value })
    const { getChange } = otherFunctions
    if (getChange) {
      getChange({ ...row, [column.key]: val?.value }, column.key)
    }
  }
  function onKeyDown(event) {
    const { onCellBlur } = otherFunctions
    if (event.key === 'Enter') {
      if (onCellBlur) {
        onCellBlur(row, column.key)
      }
    }
  }
  const onBlur = () => {
    const { onCellBlur } = otherFunctions
    if (onCellBlur) {
      onCellBlur(row, column.key)
    }
    onClose(true)
  }
  const additionalProps = {
    decimalScale: 2, fixedDecimalScale: true,
    ...(column.format === 'Percent' ? { suffix: '%' } : {}),
    ...(column.type === 'Currency' ? { thousandsGroupStyle: 'thousand', thousandSeparator: true } : {})
  }
  return (
    <NumberFormat onKeyDown={onKeyDown} placeholder="Enter" size="small" {...additionalProps} value={row[column.key] || ''} onValueChange={onChange} autoFocus customInput={TextField} onBlur={onBlur} />
  );
}
