import React from 'react'
import NumberFormat from 'react-number-format';
import { Checkbox, ClickAwayListener, MenuItem, OutlinedInput, Switch, TextField } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { format, parseISO } from 'date-fns';
import AutoCompleteAsync from './AutoCompleteAsync'

const EditableCell = ({
  value: initialValue,
  row,
  column,
  updateMyData, // This is a custom function that we supplied to our table instance
}) => {
  // We need to keep and update the state of the cell normally
  const [value, setValue] = React.useState(initialValue)
  const [edit, setEdit] = React.useState(false)

  // If the initialValue is changed external, sync it up with our state
  React.useEffect(() => {
    setValue(initialValue)
  }, [initialValue])

  const onChange = e => {
    setValue(e.target.value)
  }
  const onDateChange = val => {
    setValue(val)
  }
  const onSwitchChange = e => {
    setValue(e.target.checked ? 'Y' : "N")
  }

  const onNumericChange = (val) => {
    setValue(val?.value)
  }

  const onAutoCompleteChange = (val) => {
    setValue(val)
  }

  const onEdit = () => {
    setEdit(true)
  }

  const handleKeyDown = ( event) => {
    switch (event.key) {
      case "Enter": 
        setEdit(true)
        break;
      default: break;
    }
  }
  // We'll only update the external data when the input is blurred
  const onBlur = () => {
    if (edit && column?.editable) {
      if (value !== initialValue) {
        let temp = value
        if (column.type === 'Date') {
          temp = format(value, 'dd-MMM-yyyy')
        } else if (column.type === 'Autocomplete') {
          temp = value?.id || value
        }
        updateMyData(row, column,  temp)
      }
      setEdit(false)
    }
  }


  const renderInput = () => {
    if (column.type === 'Free Text') {
      return <OutlinedInput placeholder="Enter" autoFocus value={value || ''} onChange={onChange} onBlur={onBlur} />
    } else if (column.type === 'Numeric' || column.type === 'Currency') {
      const additionalProps = {
        ...(column.format === 'Decimal' ? { decimalScale: 2, fixedDecimalScale: true } : {}),
        ...(column.format === 'Percent' ? { suffix: '%' } : {}),
        ...(column.type === 'Currency' ? { thousandsGroupStyle: 'thousand', decimalScale: 2, fixedDecimalScale: true, thousandSeparator: true } : {})
      }
      return <NumberFormat placeholder="Enter" {...additionalProps} value={value || ''} onValueChange={onNumericChange} autoFocus customInput={TextField} onBlur={onBlur} />
      // return <OutlinedInput type="number" autoFocus value={value || ''} onChange={onChange} onBlur={onBlur} />
    } else if (column.type === 'Switch') {
      return <div className="disp-flex full-width center" ><Switch checked={value === 'Y'} onBlur={onBlur} onChange={onSwitchChange} /></div>
    } else if (column.type === 'Checkbox') {
      return <div className="disp-flex full-width center" ><Checkbox checked={value === 'Y'} onBlur={onBlur} onChange={onSwitchChange} /></div>
    } else if (column.type === 'Dropdown') {
      return (
        <TextField placeholder="select" autoFocus onBlur={onBlur} value={value || ''} onChange={onChange} select fullWidth SelectProps={{ MenuProps: { disablePortal: true }, displayEmpty: true }}>
          <MenuItem disabled key={-1} value="">Select</MenuItem>
          {(column?.valueOptions || []).map((d, i) => (
            <MenuItem key={i} value={d.id || d}>{d.description || d}</MenuItem>
          ))}
        </TextField>
      )
    } else if (column.type === 'Date') {
      return (
        <DesktopDatePicker
          onBlur={onBlur}
          inputFormat="dd-MMM-yyyy"
          value={value || ''}
          onChange={onDateChange}
          renderInput={(params) => <TextField {...params} fullWidth />}
        />
      )
    } else if (column.type === 'Autocomplete') {
      return (
        <AutoCompleteAsync cell={column} value={value || ''} valueOptions={column?.valueOptions || []} onBlur={onBlur} onChange={onAutoCompleteChange} />
      )
    }
    return <OutlinedInput placeholder="Enter" autoFocus value={value || ''} onChange={onChange} onBlur={onBlur} />
  }
  const checkDepth = (column?.hideForDepth || []).indexOf(row.depth) === -1
  if (column?.editable && checkDepth && edit) {
    return (
      <ClickAwayListener onClickAway={onBlur} >
        {renderInput()}
      </ClickAwayListener>
    )
  }

  if (checkDepth) {
    if (column.type === 'Date') {
      let date = value
      try {
        date = value ? format(parseISO(value), 'dd-MMM-yyyy') : value
      } catch (err) {
        date = value
      }
      return (
        <div onDoubleClick={onEdit} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} className={`disp-flex full-width display-cell ${column.editable ? 'hand' : ''} `} title={date || null} >
          <div className="custom-table-cell-overflow" >{date || null}</div>
        </div>
      )
    } else if (column.type === 'Switch') {
      return <div onDoubleClick={onEdit} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} className={`disp-flex full-width center display-cell ${column.editable ? 'hand' : ''} `} ><Switch checked={value === 'Y'} disabled /></div>
    } else if (column.type === 'Checkbox') {
      return <div onDoubleClick={onEdit} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} className={`disp-flex full-width center display-cell ${column.editable ? 'hand' : ''} `} ><Checkbox checked={value === 'Y'} disabled /></div>
    } else if (column.type === 'Dropdown') {
      const val = (column?.valueOptions || [])?.find(d => d?.id && d?.id === initialValue)?.description || initialValue
      return (
        <div onDoubleClick={onEdit} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} className={`disp-flex full-width custom-table-cell-overflow display-cell ${column.editable ? 'hand' : ''} `} title={initialValue?.toString() || null} >
          <div className="custom-table-cell-overflow" >{val?.toString() || null}</div>
        </div>
      )
    } else if (column.type === 'Numeric' || column.type === 'Currency') {
      const additionalProps = {
        ...(column.format === 'Decimal' ? { decimalScale: 2, fixedDecimalScale: true } : {}),
        ...(column.format === 'Percent' ? { suffix: '%' } : {}),
        ...(column.type === 'Currency' ? { thousandsGroupStyle: 'thousand', decimalScale: 2, fixedDecimalScale: true, thousandSeparator: true } : {})
      }
      const additionalStyle = {
        ...(column.type === 'Currency' ? { justifyContent: 'center' } : {})
      }
      return (
        <div style={additionalStyle} onDoubleClick={onEdit} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} className={`disp-flex full-width custom-table-cell-overflow display-cell ${column.editable ? 'hand' : ''} `} title={initialValue?.toString() || null} >
          <NumberFormat  {...additionalProps} value={value || ''} displayType="text" />
        </div>
      )
    }
  
    return (
      <div onDoubleClick={onEdit} tabIndex={0} onKeyDown={(e) => handleKeyDown(e)} className={`disp-flex full-width custom-table-cell-overflow display-cell ${column.editable ? 'hand' : ''} `} title={initialValue?.toString() || null} >
        <div className="custom-table-cell-overflow" >{initialValue?.toString() || null}</div>
      </div>
    )
  }
  return null
}

export default EditableCell