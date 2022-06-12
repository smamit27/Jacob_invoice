import React from 'react'
import DatePicker  from '@mui/lab/DatePicker';
import { TextField } from '@mui/material';
import { format } from 'date-fns';

export const editorClassname = `rdg-text-editor rdg-date-editor`;

function MyTextBox (props) {
  return <TextField autoFocus size="small" {...props} fullWidth />
}

export default function DateEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions,
  ...rest
}) {
  function onDateChange (value) {
    try {
      const val = format(value, 'dd-MMM-yyyy')
      onRowChange({ ...row, [column.key]: val })
      const { getChange } = otherFunctions
      if (getChange) {
        getChange({ ...row, [column.key]: val }, column.key)
      }
    } catch (error) {
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
    // <TextField onBlur={() => onClose(true)} className={editorClassname} type="date" onChange={val => onRowChange({ ...row, [column.key]: val })} InputLabelProps={{ shrink: true, }} />
    <DatePicker 
      {...rest}
      clearable
      clearText='Clear'
      acceptRegex={/^(([0-9])|([0-2][0-9])|([3][0-1]))\-(Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)\-\d{4}$/gi}
      className={editorClassname}
      inputFormat="dd-MMM-yyyy"
      mask="__-___-____"
      value={row[column.key] ? new Date(row[column.key]) : ''}
      onChange={onDateChange}
      InputProps={{ readOnly: true }}
      renderInput={(p) => <MyTextBox {...p}  />}
      components={{OpenPickerIcon:()=><i className="las la-calendar"></i>}}
    />
  );
}
