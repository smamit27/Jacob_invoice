import { Modal, Box, styled, Button, Stack, FormControl, Grid, OutlinedInput, InputAdornment, Select, MenuItem, Chip, TextField, IconButton } from '@mui/material'
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import React, { Fragment, useEffect, useState } from 'react'
import NumberFormat from 'react-number-format';
import { makeStyles } from '@mui/styles';
import { useSelector, useDispatch } from 'react-redux'
import { createEditClientProjectGroupAction, createEditClientProjectGroupModalCloseAction } from './logic'
import { Loader, ModalTitle } from '../../atoms';
import Label from '../../atoms/Label';
import { format } from 'date-fns';
import {formColumns} from './constants'
import { backDropLoaderOpenAction } from '../BackDropLoader/logic';
import AutoCompleteCustomAsync from './AutoCompleteCustomAsync';

const useStyles = (flag) => makeStyles(theme => ({
  root: {
    "& .Mui-error .MuiOutlinedInput-notchedOutline": {
      ...(flag ? { borderColor: '#d32f2f' } : { borderColor: 'rgba(0, 0, 0, 0.23)' })
    },
    '& .Mui-focused .MuiOutlinedInput-notchedOutline': {
      borderColor: '#231EDC'
    }
  }
}))

const formEmptyData = () => {
  const emptyData = {}
  formColumns.forEach(d => {
    emptyData[d.field] = ''
  })
  return emptyData
}

function CreateEditClientProjectGroup() {
  const collectionId = useSelector(state => state.getCollectionId)
  const { open, data: modalData = {} } = useSelector(state => state.createEditClientProjectGroupModal)
  const [type, setType] = useState('new')
  const [loading, setLoading] = useState(true)
  const [inputData, setInputData] = useState(formEmptyData())
  const dispatch = useDispatch()
  const classes = useStyles(inputData.PERIOD_START && inputData.PERIOD_END ?  new Date(inputData.PERIOD_START).getTime() > new Date(inputData.PERIOD_END).getTime() : false)();
  useEffect(() => {
    if (open) {
      const {titleType, ...dat} = modalData
      if (Object.keys(dat || {})?.length) {
        const propData = {}
        Object.keys(dat || {}).forEach(d => {
          if (d === 'CONTRACT_STATUS') {
            propData[d] = dat[d] ? dat[d] === 'ACTIVE' ? 'Y' : 'N' : ''
          } else {
            propData[d] = dat[d] || ''
          }
        })
        setInputData({...propData})
      }
      setType(titleType)
      setLoading(false)
    } else {
      setLoading(true)
      setInputData(formEmptyData())
    }
  }, [open])

  const onChange = (val, key) => {
    setInputData(d => ({
      ...d,
      [key]: val
    }))
  }

  const onAutoChange = (val, item) => {
    const temp = {}
    if (val) {
      if (item.otherDependentKey && val.other) {
        temp[item.otherDependentKey] = val.other
      }
      temp[item.dependentKey] = val.id
      temp[item.field] = val.description
    } else {
      if (item.otherDependentKey) {
        temp[item.otherDependentKey] = ''
      }
      temp[item.dependentKey] = ''
      temp[item.field] = ''
    }
    setInputData(d => ({
      ...d,
      ...temp
    }))
  }

  const onDateChange = (value, key) => {
    try {
      const val = format(value, 'dd-MMM-yyyy')
      setInputData(d => ({
        ...d,
        [key]: value,
        ...(key === 'PERIOD_START' ? { PERIOD_END: null } : {})
      }))
    } catch (error) {
      onChange('')
    }
  } 

  const onClose = () => dispatch(createEditClientProjectGroupModalCloseAction())

  const onSubmit = () => {
    if (type !== 'view') {
      dispatch(backDropLoaderOpenAction())
      const { GROUP_ID } = modalData
      const apiType = type === 'new' ? true : false
      const { 
        GROUP_NAME,
        CT_NO_PEOPLESOFT_CT_PO,
        CT_NO_PS_WORKAUTHO_PO,
        CT_NO_LEGACY_CONTRACT,
        CT_NO_LEGACY_WA,
        BUDGET_AMOUNT,
        PERIOD_START,
        PERIOD_END,
        CONTRACT_STATUS,
        // CLIENT_NUMBER,
        // CLIENT_NAME,
        CLIENT_ID,
        CONTRACT_ADMINISTRATOR,
        // EMPLOYEE_NAME,
        PERCENTAGE_FUNDS_USED
      } = inputData
      let perioD_START = PERIOD_START
      let perioD_END = PERIOD_END

      try {
        perioD_END = format(PERIOD_END, 'dd-MMM-yyyy')
        perioD_START = format(PERIOD_START, 'dd-MMM-yyyy')
      } catch (error) {
        console.log(error);
        perioD_END = ''
        perioD_START = ''
      }

      const payload = {
        method: apiType ? 'post' : 'put',
        url: apiType ? '/InsertClientProjectGroups' : '/UpdateClientProjectGroups',
        params: {
          CollectionID: collectionId,
          GroupID: GROUP_ID || 0,
          SaveMode: apiType ? 'I' : 'U'
        },
        data: {
          grouP_NAME: GROUP_NAME,
          // employeE_NAME: EMPLOYEE_NAME,
          cT_NO_PEOPLESOFT_CT_PO: CT_NO_PEOPLESOFT_CT_PO,
          cT_NO_PS_WORKAUTHO_PO: CT_NO_PS_WORKAUTHO_PO || '',
          cT_NO_LEGACY_CONTRACT: CT_NO_LEGACY_CONTRACT || '',
          cT_NO_LEGACY_WA: CT_NO_LEGACY_WA || '',
          budgeT_AMOUNT: BUDGET_AMOUNT || null,
          perioD_START,
          perioD_END,
          contracT_STATUS: CONTRACT_STATUS,
          // clienT_NAME: CLIENT_NAME,
          // clienT_NUMBER: CLIENT_NUMBER,
          ...(CLIENT_ID ? {clienT_ID: CLIENT_ID} : {}),
          contracT_ADMINISTRATOR: CONTRACT_ADMINISTRATOR || null,
          percentagE_FUNDS_USED: PERCENTAGE_FUNDS_USED && Number(PERCENTAGE_FUNDS_USED) ? Number(PERCENTAGE_FUNDS_USED) : 0
        }
      }
      dispatch(createEditClientProjectGroupAction(payload))
    } else {
      dispatch(createEditClientProjectGroupModalCloseAction())
    }
  }

  const checkEmpty = () => {
    return formColumns.filter(d => d.required).some(d => !inputData[d.field]) || (inputData.PERIOD_START && inputData.PERIOD_END ?  new Date(inputData.PERIOD_START).getTime() > new Date(inputData.PERIOD_END).getTime() : false)
  }

  const renderTitle = () => {
    switch (type) {
      case 'new':
        return 'New Client Project Group Details'
      case 'edit':
        return 'Edit Client Project Group Details'
      case 'view':
        return 'View Client Project Group Details'
      default:
        return 'New Client Project Group Details'
    }
  }

  const renderType = (item) => {
    switch (item.type) {
      case 'text':
        return <OutlinedInput value={inputData[item?.field] || ''} onChange={(e) => onChange(e.target.value, item.field)} placeholder={item.placeholder} size="small" fullWidth required={item.required} />
      case 'currency':
      case 'number': {
        const additionalProps = {
          ...(item.format === 'Decimal' ? { decimalScale: 2, fixedDecimalScale: true } : {}),
          ...(item.format === 'Percent' ? { suffix: '%' } : {}),
          ...(item.format === 'Currency' ? { thousandsGroupStyle: 'thousand', decimalScale: 2, fixedDecimalScale: true, thousandSeparator: true } : {})
        }
        return (
          <NumberFormat {...additionalProps} disabled={item.disabled} placeholder={item.placeholder} size="small" fullWidth value={inputData[item?.field] || ''} onValueChange={(val) => onChange(val?.value, item.field)} customInput={TextField} required={item.required} />
        )
      }
      case 'phone':
        return <OutlinedInput type='number' value={inputData[item?.field] || ''} onChange={(e) => onChange(e.target.value, item.field)} placeholder={item.placeholder} size="small" fullWidth required={item.required} />
      case 'percent':
        return (
          <NumberFormat placeholder={item.placeholder} size="small" fullWidth suffix="%" value={inputData[item?.field] || ''} onValueChange={(val) => onChange(val?.value, item.field)} customInput={TextField} required={item.required} /> 
        )
      case 'dropdown':
        return (
          <Select displayEmpty value={inputData[item?.field] || ''} onChange={(e) => onChange(e.target.value, item.field)} required={item.required} size="small">
            <MenuItem key={-1} disabled value="">{item.placeholder}</MenuItem>
            {item.values.map((d, i) => (
              <MenuItem key={i} value={d.value}>{d.name}</MenuItem>
            ))}
          </Select>
        )
      case 'autocompletecustom':
        return (
          <AutoCompleteCustomAsync placeholder={item.placeholder} autoFocus={false} value={inputData[item?.field] || ''} onChange={(val) => onAutoChange(val, item)} cell={item.cell} required={item.required} />   
        )
      case 'date': {
          const minDate = inputData.PERIOD_START ? new Date(inputData.PERIOD_START) : ''
          return (
            <DesktopDatePicker
              {...(item.field === 'PERIOD_END' && minDate ? { minDate } : {})}
              inputFormat="dd-MMM-yyyy"
              value={inputData[item?.field] || null}
              onChange={(val) => onDateChange(val, item.field)}
              required={item.required}
              renderInput={(params) => <TextField error={false} helperText={null} {...params} size="small" fullWidth />}
            />
          )
        }
      default:
        return null
    }
  }

  const renderTypeView = (item) => {
    switch (item.type) {
      case 'text':
      case 'number':
      case 'phone':
        return (<TextView>{inputData[item.field] || '-'}</TextView>)
      case 'percent':
        return (<TextView>{inputData[item.field] ? `${inputData[item.field]}%` : '-'}</TextView>)
      case 'currency':
        return (<TextView>{inputData[item.field] ? `$ ${inputData[item.field]}` : '-'}</TextView>)
      case 'dropdown': {
          const textData =  item.field === 'CONTRACT_STATUS' ? inputData[item.field] === 'Y' ? 'ACTIVE' : 'INACTIVE' : inputData[item.field]
          return (textData ? <div><Chip size="small" label={textData} color="primary" /></div> :  <TextView>-</TextView>)
        }
      case 'date':
        return (inputData[item.field] && new Date(inputData[item.field]) ?   <TextView>{format(new Date(inputData[item.field]), 'dd-MMM-yyyy')}</TextView> :  <TextView>-</TextView>)
      default:
        return <TextView>{inputData[item.field] || '-'}</TextView>
    }
  }

  const renderGroup = (groupType) => {
    return (
      <div className='newClientProjectModalPopup'>
        {gridTitle[groupType] && <GridTitle className='bold' >{gridTitle[groupType]}</GridTitle>}
        <Grid container spacing={3}>
          {formColumns.filter(d => d.group === groupType).map((item, i) => (
            <Grid key={i} item xs={12} sm={12} md={6} lg={6} >
              <FormControl className={classes.root} fullWidth >
                <Label>{item.headerName} {type !== 'view' && !item.required ? <span>(optional)</span> : ''}</Label>
                {type === 'view' ? renderTypeView(item) : renderType(item)}
              </FormControl>
            </Grid>
          ))}
        </Grid>
      </div>
    )
  }
  return (
    <Modal  open={open} className='newClientProjectModal'>
      <Box sx={style}>
        <Header className='headerText'>
          <ModalTitle data-testid='create-edit-client-project-group' >{renderTitle()}</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <Loader loading={loading} error={false} style={{ height: 'calc(85vh - 80px - 3em)', width: '100%' }} >
          <FormContent>
            <Box m={3}>
              {type === 'view' && (
                <Stack direction="row" justifyContent="flex-end" mb={3}>
                  <Button onClick={() => setType(type === 'view' ? 'edit' : 'view')} variant="contained" color="secondary" >{type === 'view' ? 'Edit' : 'View'}</Button>
                </Stack>
              )}
              <Stack spacing={3} mb={3}>
                {['project', 'contract', 'client'].map((d, i) => (<Fragment key={i} >{renderGroup(d)}</Fragment>))}
              </Stack>
            </Box>
          </FormContent>
        </Loader>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button type="button" onClick={onClose} >Cancel</Button>
            {type !== 'view' && <Button type="submit" disabled={checkEmpty()} onClick={onSubmit} variant="contained">Save</Button>}
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default CreateEditClientProjectGroup


const gridTitle = {
  contract: 'Contract Details',
  client: 'Client Contact Information'
}

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '60%',
  height: '85vh',
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
  height: 'calc(85vh - 80px - 3em)',
  overflow: 'auto'
})

const GridTitle = styled('div')({
  fontSize: '16px',
  lineHeight: '24px',
  marginBottom: '0.9em'
})

const TextView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#222222',
  fontSize: '14px',
  lineHeight: '24px',
  // height: '40px'
})