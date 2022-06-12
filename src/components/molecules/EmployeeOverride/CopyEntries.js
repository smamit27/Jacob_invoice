import { DesktopDatePicker } from '@mui/lab';
import { Modal, Box, styled, Button, Stack, Grid, TextField, IconButton } from '@mui/material'
import { format } from 'date-fns';
import DataGrid from 'react-data-grid'
import React, { useState } from 'react'
import Label from '../../atoms/Label';
import { getUniqueIdFromApi } from '../../../services/httpService';
import { generateRandomString } from '../../../helpers';
import { ModalTitle } from '../../atoms';
import { errorStatusNotificationAction } from '../StatusNotification/logic';
import { useDispatch } from 'react-redux';

const columns = [
  {
    resizable: true,
    "key":"EMPLOYEE_NAME",
    "name":"Employee Name",
  },
  {
    resizable: true,
    "key":"BILLING_TITLE_CODE",
    "name":"Billing Title Code (Power Invoice)"
  },
  {
    resizable: true,
    "key":"CAPPED_RATE_OLD",
    "name":"Capped Rate (Power Invoice)",
    formatter: ({ row, column }) => Number(row[column.key] || 0).toFixed(2)
  },
  {
    resizable: true,
    "key":"MINIMUM_RATE_OLD",
    "name":"Minimum Rate (Power Invoice)",
    formatter: ({ row, column }) => Number(row[column.key] || 0).toFixed(2)
  },
  {
    resizable: true,
    "key":"CAPPED_RATE_PERCENT",
    "name":"Increase Capped Rate by Percentage (%)",
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "key":"CAPPED_RATE",
    "name":"New Capped Rate ",
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "key":"MINIMUM_RATE_PERCENT",
    "name":"Increase Minimum Rate by Percentage (%)",
    "cellClass": "rdg-editor-cell"
  },
  {
    resizable: true,
    "key":"MINIMUM_RATE",
    "name":"New Minimum Rate",
    "cellClass": "rdg-editor-cell"
  },
]


function CopyEntries({ open, onClose, modalData = { selected: [], all: [] }, onCopyApply }) {
  const rowsData = modalData?.selected?.map(d => ({ ...d, MINIMUM_RATE_OLD: d?.MINIMUM_RATE || 0, CAPPED_RATE_OLD: d?.CAPPED_RATE|| 0, CAPPED_RATE: '', MINIMUM_RATE: '', MINIMUM_RATE_PERCENT: '', CAPPED_RATE_PERCENT: '' })) || []
  const [start, setStart] = useState(null)
  const [end, setEnd] = useState(null)
  const [capped, setCapped] = useState('')
  const [minimum, setMinimum] = useState('')
  const [rows, setRows] = useState(rowsData)
  const [disabledApply, setDisabledApply] = useState(true)
  const dispatch = useDispatch()
  const onDateChange = (val, type) => {
    try {
      // const val = format(value, 'dd-M-yyyy')
      if (type === 'start') {
        setStart(val)
        setEnd(null)
      } else {
        setEnd(val)
      }
    } catch (error) {
      if (type === 'start') {
        setStart(null)
        setEnd(null)
      } else {
        setEnd(null)
      }
    }
  }
  function rowKeyGetter(row) {
    return row.tableRowId;
  }
  function onClear(reset = false) {
    setStart(null)
    setEnd(null)
    setMinimum('')
    setCapped('')
    if (reset) {
      setRows([...rowsData])
      setDisabledApply(true)
    }
  }
  function onPreview () {
    const isOverlap = modalData?.all?.filter(d => {
      const oldStart = new Date(d.EFFECTIVE_DATE).getTime()
      const oldEnd = new Date(d.END_DATE).getTime()
      const newStart = new Date(format(start, 'dd-MMM-yyyy')).getTime()
      const newEnd = end ? new Date(format(end, 'dd-MMM-yyyy')).getTime() : null
      if (oldStart && oldEnd && start && end) {
        return oldStart <= newEnd && newStart <= oldEnd
      } else if (oldStart && oldEnd && start) {
        return oldStart <= newStart && newStart <= oldEnd
      } else if (start) {
        return (oldStart === newStart)
      }
      if (!oldEnd) {
        return false
      }
      return (newEnd === oldEnd)
    }) || []
    if (!isOverlap?.length) {
      const newRows = rows.map(d => ({
        ...d,
        EFFECTIVE_DATE: format(start, 'dd-MMM-yyyy'),
        END_DATE: end ? format(end, 'dd-MMM-yyyy') : null,
        MINIMUM_RATE_PERCENT: Number(minimum || 0).toFixed(2),
        CAPPED_RATE_PERCENT: Number(capped || 0).toFixed(2),
        ...(minimum ? { MINIMUM_RATE: (d.MINIMUM_RATE_OLD + ((Number(minimum) / 100) * d.MINIMUM_RATE_OLD)).toFixed(2) } : { MINIMUM_RATE: Number(d.MINIMUM_RATE_OLD || 0).toFixed(2) }),
        ...(capped ? { CAPPED_RATE: (d.CAPPED_RATE_OLD + ((Number(capped) / 100) * d.CAPPED_RATE_OLD)).toFixed(2) } : { CAPPED_RATE: Number(d.CAPPED_RATE_OLD || 0).toFixed(2) }),
      }))
      setRows(newRows)
      setDisabledApply(false)
      onClear()
    } else {
      dispatch(errorStatusNotificationAction({
        message: "The new Effective Date and End Date selected should not overlap with the dates in selected record's. Please review the dates and make corrections.",
        type: 'copy-entries'
      }))
    }
  }
  const onApply = () => {
    Promise.all(rows.map(() => getUniqueIdFromApi('/GetEmployeeOverrideSeq', 'EOR_ID'))).then((values) => {
      const newRows = rows.map(({ 
        tableRowId, parentRowId, ROW_NUM, FLAG_IS, EOR_ID1, MINIMUM_RATE_PERCENT, CAPPED_RATE_PERCENT, CAPPED_RATE_OLD, MINIMUM_RATE_OLD, ...Others
      }, i) => ({
        ...Others,
        "ADDED_DATE": null,
        "ADDED_BY": null,
        "UPDATED_DATE": null,
        "UPDATED_BY": null,
        EOR_ID1: values[i],
        parentRowId: parentRowId || tableRowId,
        level: 2,
        tableRowId: generateRandomString()
      }))
      onCopyApply(newRows);
      onClose()
    }).catch(() => {

    })
  }
  const disabled = !start || (!capped && !minimum)
  return (
    <Modal open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='overrides-copy-entites'>Copy Entries</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <FormContent>
          <Grid container spacing={2} >
            <Grid item sm={12} xs={12} md={3} lg={3}>
              <Stack spacing={1.5} >
                <div>
                  <Label>New Effective Date</Label>
                  <DesktopDatePicker
                  inputFormat="dd-MMM-yyyy"
                    value={start}
                    onChange={(val) => onDateChange(val, 'start')}
                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                    components={{OpenPickerIcon:()=><i className="las la-calendar"></i>}}
                 />
                </div>
                <div>
                  <Label>New End Date (optional)</Label>
                  <DesktopDatePicker
                  inputFormat="dd-MMM-yyyy"
                    minDate={start}
                    value={end}
                    onChange={(val) => onDateChange(val, 'end')}
                    renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                    components={{OpenPickerIcon:()=><i className="las la-calendar"></i>}}
                  />
                </div>
                <div>
                  <Label>Increase Capped Rate by Percentage (%) </Label>
                  <TextField type="number" value={capped} size="small" fullWidth placeholder="Enter" onChange={(e) => setCapped(e.target.value)} />
                </div>
                <div>
                  <Label>Increase Minimum Rate by Percentage (%)  </Label>
                  <TextField type="number" value={minimum} size="small" fullWidth placeholder="Enter" onChange={(e) => setMinimum(e.target.value)} />
                </div>
                <Stack spacing={1.5} direction="row" >
                  <Button variant="contained" disabled={disabled} onClick={onPreview} >Preview</Button>
                  <Button onClick={onClear} >Clear All</Button>
                </Stack>
              </Stack>
            </Grid>
            <Grid item sm={12} xs={12} md={9} lg={9}>
              <Stack spacing={2} >
                <div style={{ fontSize: 14 }} >Copy Entries/Rows ({rows.length})</div>
                <DataGrid  rowKeyGetter={rowKeyGetter} rowHeight={40} headerRowHeight={60} columns={columns} rows={rows} style={{height: 'calc(80vh*(9/13))' }} />
              </Stack>
            </Grid>
          </Grid>
        </FormContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button type="button" onClick={onClose} >Cancel</Button>
            <Button variant="contained" disabled={disabledApply} onClick={onApply}>Apply</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default CopyEntries

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '95%',
  height: '95vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  borderBottom: '1px solid #E1E1E1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  width: '100%'
})

const Footer = styled('div')({
  padding: '1.2em 1.5em',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  height: 70,
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  borderTop: '1px solid #E1E1E1',
  width: '100%'
})


const FormContent = styled('div')({
  height: 'calc(95vh - 80px - 3em)',
  overflow: 'auto',
  padding: '1.5em'
})
