import { Modal, Box, styled, Button, Stack, FormControl, Grid, Select, MenuItem, TextField, ListItemText, Checkbox, Switch, Radio, FormControlLabel, RadioGroup, Autocomplete, IconButton, OutlinedInput } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  createEditUserDefineFieldModalCloseAction, createEditUserDefineFieldAction, createEditUserDefineFieldResetAction, getExistingDropdownOptionsAction, getExistingDropdownOptionsResetFlagAction, getExistingDropdownOptionsResetAction
} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader, ModalTitle } from '../../atoms';
import Label from '../../atoms/Label';
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import AutocompleteCreatable from '../../atoms/AutocompleteCreatable';
import { apiCall } from "../../../services/httpService"
import ImportCopyViewOptions from './ImportCopyViewOptions';
import './UserDefineFieldsStyles.css';
import { IoIosArrowDown } from "react-icons/io";


const titleType = {
  create: 'New User Defined Field',
  edit: 'Edit User Defined Field',
  view: 'View User Defined Field'
}

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

function CreateEditUserDefineField() {
  const { open, data: modalData = {} } = useSelector(state => state.createEditUserDefineFieldModal)
  const { loading: existingDropdownOptionsLoading, data: existingDropdownOptionsData, flag: existingDropdownOptionsFlag } = useSelector(state => state.getExistingDropdownOptions)
  const { data: allModules } = useIntialSelector('getAllModules')
  const { data: allUdf = [], loading, error } = useIntialSelector('getAllUdf')
  const { data: allFieldTypes = [] } = useIntialSelector('getAllFieldTypes')
  const { data: numericFormats } = useIntialSelector('getUdfNumericFormat')
  const collectionId = useSelector(state => state.getCollectionId)

  
  const dispatch = useDispatch()
  const [modules, setModules] = useState([])
  const [name, setName] = useState('')
  const [type, setType] = useState('')
  const [format, setFormat] = useState('')
  const [required, setRequired] = useState('N')
  const [desc, setDesc] = useState('')
  const [dropdownValues, setDropdownValues] = useState([])
  const [existing, setExisting] = useState('New')
  const [existingDropdown, setExistingDropdown] = useState(null)
  const [openDropdownOptionsModal, setOpenDropdownOptionsModal] = useState(false)
  const [nameError, setNameError] = useState('')
  useEffect(() => {
    if (open) {
      const {
        UDF_ID,
        MODULE_IDS,
        UDF_NAME = '',
        FIELD_TYPE_ID = '',
        NUMERIC_TYPE_FORMAT = '',
        DROPDOWN_VALUE = [],
        REQUIRED_YN = 'N',
        UDF_DESCRIPTION = '',
        titleType = 'create'
      } = modalData
      setModules(MODULE_IDS ? MODULE_IDS.split(', ').map(d => parseInt(d)) : [])
      setName(UDF_NAME)
      setType(FIELD_TYPE_ID)
      setFormat(NUMERIC_TYPE_FORMAT)
      setRequired(REQUIRED_YN)
      setDesc(UDF_DESCRIPTION)
      setExisting('New')
      setDropdownValues(DROPDOWN_VALUE)
      setExistingDropdown(null)
      // if (titleType === 'edit' && UDF_ID) {
      //   dispatch(getExistingDropdownOptionsAction({ udfId: UDF_ID }))
      // }
    } else {
      dispatch(getExistingDropdownOptionsResetAction())
      setNameError('')
    }
  }, [open])

  useEffect(() => {
    if (existingDropdownOptionsFlag) {
      setDropdownValues(existingDropdownOptionsData)
      dispatch(getExistingDropdownOptionsResetFlagAction())
    }
  }, [existingDropdownOptionsFlag])

  const onClose = () => dispatch(createEditUserDefineFieldModalCloseAction())
  
  const onModuleChange = (e) => {
    const { value } = e.target
    setModules(typeof value === 'string' ? value.split(',') : value,)
  }

  const onNameChange = (val) => {
    setName(val)
  }

  const onTypeChange = (e) => {
    setType(e.target.value)
    setFormat('')
    setDropdownValues([])
    setExisting('New')
    dispatch(getExistingDropdownOptionsResetAction())
    setExistingDropdown(null)
  }

  const onExistingChange = (e) => {
    setExisting(e.target.value)
    setDropdownValues([])
    setExistingDropdown(null)
    dispatch(getExistingDropdownOptionsResetAction())
  }

  const onSaveOptions = (val) => {
    setDropdownValues(val)
  }

  const onNameBlur = async (e) => {
    try {
      if (e.target.value.trim().length) {
        const [res = {}] = await apiCall({
          method: 'get',
          url: '/GetUDFFieldValidation',
          params: {
            CollectionID: collectionId,
            UDFName: e.target.value,
          }
        })
        if (res?.FINAL_STATUS !== 'FAILED') {
          setNameError('')
        } else {
          setNameError('error')
        }
      } else {
        setNameError('')
      }
    } catch (error) {
      setNameError('error')
    }
  }

  const onSubmit = () => {
    const payload = {
      data: [{
        modulE_ID: modules.join(', '),
        udF_NAME: name,
        fielD_TYPE_ID: type,
        ...(type === 3 ? { numeriC_TYPE_FORMAT: `${format || ''}` } : {}),
        ...(type === 6 ? { dropdowN_VALUE: dropdownValues.join(', ') } : {}),
        ...(type === 6 ? { drP_VALUES: dropdownValues.join(', ') } : {}),
        requireD_YN: required,
        udF_DESCRIPTION: desc
      }],
      params: {
        ...(modalData?.titleType === 'create' ? { saveMode: 'I' } : { saveMode: 'U' }),
        ...(modalData?.titleType === 'edit' ? { UDFID: modalData.UDF_ID } : { UDFID: 0 }),
        CollectionID: collectionId
      }
    }
    dispatch(backDropLoaderOpenAction())
    dispatch(createEditUserDefineFieldAction(payload))
  }

  const onExistingDropdownSelect = (val) => {
    setExistingDropdown(val)
    const { DROPDOWN_VALUE = [], UDF_ID = '' } = allUdf.find(d => d.UDF_NAME === val) || {}
    // if (UDF_ID) {
    //   dispatch(getExistingDropdownOptionsAction({ udfId: UDF_ID }))
    // }
    if (UDF_ID) {
      setDropdownValues(DROPDOWN_VALUE)
    }
  }

  const checkValidation = () => {
    if (type === 3) {
      return !name || !modules?.length || !type || !required || !format || nameError
    } else if (type === 6) {
      return !dropdownValues?.length || !name || !modules?.length || !type || !required || nameError
    }
    return !name || !modules?.length || !type || !required || nameError
  }

  const edit = modalData?.titleType === 'edit'

  const disabledModules = modalData?.MODULE_IDS?.split(', ')?.map(d => parseInt(d)) || []

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='create-edit-view-udf'>{titleType[modalData?.titleType || 'create']}</ModalTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <Loader loading={loading} error={error} style={{ height: 'calc(85vh - 80px - 3em)', width: '100%' }} >
          {open && <FormContent>
            <Box m={3}>
              <Grid container spacing={3}>
                <LabelComponent title="Field Name" >
                  {/* <AutocompleteCreatable disabled={edit} onChange={val => setName(val)} value={name ? { title: name } : null} disabled={modalData?.titleType === 'edit'} size="small" fullWidth valueOptions={allUdf.map(d => ({ title: d.UDF_NAME }))} getOptionDisabled={option => allUdf.map(d => d.UDF_NAME).includes(option.title)}  /> */}
                  <OutlinedInput
                    onBlur={onNameBlur}
                    placeholder='Enter udf name'
                    className={` ${nameError && !!name?.trim().length ? 'errorCollection' : ''}`}
                    disabled={edit}
                    value={name || ''}
                    size='small'
                    onChange={e => onNameChange(e.target.value)}
                  />
                  {nameError && !!name?.trim().length && (<div style={{ color: 'red', marginTop: 5 }} >{`${name} is not available`}</div>)}
                </LabelComponent>
                <LabelComponent title="Used in Module(s)" >
                  <Select size="small" multiple displayEmpty value={modules} onChange={onModuleChange} input={<OutlinedInput placeholder="Select Module(s)" />} renderValue={(selected) => (selected.length === 0 ? (<span>Select Module(s)</span>) : allModules.filter(d => selected.includes(d.MODULE_ID)).map(d => d.MODULE_NAME).join(', '))} MenuProps={MenuProps} IconComponent={() => <Box mr={2} mt={1}><IoIosArrowDown /></Box> }>
                    {allModules.map((d, i) => (
                      <MenuItem disabled={disabledModules.includes(d.MODULE_ID)} key={i} value={d.MODULE_ID}>
                        <Checkbox size="small" checked={modules.indexOf(d.MODULE_ID) > -1} />
                        <ListItemText primary={d.MODULE_NAME} />
                      </MenuItem>
                    ))}
                  </Select>
                  {/* <Select multiple displayEmpty fullWidth value={modules} onChange={onModuleChange} size="small" renderValue={(selected) => (!selected.length ? (<span>Select Module(s)</span>) : allModules.filter(z => selected.indexOf(z.MODULE_ID) !== -1).map(z => z.MODULE_NAME).join(', '))} >
                    {allModules.map((d, i) => (
                      <MenuItem disabled={disabledModules.includes(d.MODULE_ID)} key={i} value={d.MODULE_ID}>
                        {d.MODULE_NAME}
                      </MenuItem>
                    ))}
                  </Select> */}
                </LabelComponent>
                <LabelComponent title="Field Type" >
                  <Select disabled={edit} displayEmpty fullWidth value={type} onChange={e => onTypeChange(e)} size="small" IconComponent={() => <Box mr={2} mt={1}><IoIosArrowDown /></Box> }>
                    <MenuItem disabled key={-1} value="">Select</MenuItem>
                    {allFieldTypes.map((d, i) => (
                      <MenuItem key={i} value={d.FIELD_TYPE_ID}>
                        {d.FIELD_TYPE_NAME}
                      </MenuItem>
                    ))}
                  </Select>
                </LabelComponent>
                {type === 3 && <LabelComponent title="Numeric Format" >
                  <Select displayEmpty disabled={edit} fullWidth value={format} onChange={e => setFormat(e.target.value)} size="small">
                    <MenuItem disabled key={-1} value="">Select</MenuItem>
                    {numericFormats.map((d, i) => (
                      <MenuItem key={i} value={d.ID}>
                        {d.Description}
                      </MenuItem>
                    ))}
                  </Select>
                </LabelComponent>}
                {type === 6 && !edit && <LabelComponent title="New or existing" >
                  <RadioGroup row name="new-existing" value={existing} onChange={e => onExistingChange(e)}>
                  {['New', 'Existing'].map((item, i) => <FormControlLabel key={i} value={item} control={<Radio />} label={item} />)}
                  </RadioGroup>
                </LabelComponent>}
                {type === 6 && !edit && existing === 'Existing' && <LabelComponent title="Existing Field Name" >
                  <Autocomplete
                    disablePortal
                    options={allUdf.filter(d => d.IS_DROPDOWN_YN === 'Y').map(d => d.UDF_NAME)}
                    size="small"
                    fullWidth
                    value={existingDropdown}
                    onChange={(e, val) => onExistingDropdownSelect(val)}
                    renderInput={(params) => <TextField placeholder="Search" {...params} />}
                  />
                </LabelComponent>}
                {type === 6 && <LabelComponent title="Dropdown Options" >
                  <Stack direction="row" alignItems="center" >

                     <LabelComponent>
                        <div disabled={existingDropdownOptionsLoading} className='select_dropdown_options' variant="contained" color="secondary" size="small" onClick={() => setOpenDropdownOptionsModal(true)}>Select</div>
                     </LabelComponent>
                    {!!dropdownValues.length && <div style={{ margin: 10 }} >{dropdownValues.length} dropdown options added</div>}
                  </Stack>
                </LabelComponent>}
                <LabelComponent title="Required" >
                  <Switch checked={required === 'Y' || false}  size="small" className="ToggleSwitchButton" onChange={event => setRequired(event.target.checked ? 'Y' : 'N')} />
                </LabelComponent>
                <LabelComponent title="Description (optional)" md={12} lg={12} >
                  <TextField multiline rows={4} value={desc} onChange={e => setDesc(e.target.value)} />
                </LabelComponent>
              </Grid>
            </Box>
            {openDropdownOptionsModal && <ImportCopyViewOptions open={openDropdownOptionsModal} valueOptions={dropdownValues} onClose={() => setOpenDropdownOptionsModal(false)} onSaveOptions={(d) => onSaveOptions(d)} type={edit ? 'Existing' : existing} />}
          </FormContent>}
        </Loader>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button type="button" onClick={onClose} >Cancel</Button>
            <Button disabled={checkValidation()} type="submit" onClick={onSubmit} variant="contained">Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default CreateEditUserDefineField

const LabelComponent = ({ children, title, xs = 12, sm = 12, md = 6, lg = 6 }) => (
  <Grid item xs={xs} sm={sm} md={md} lg={lg} >
    <FormControl fullWidth >
      <Label>{title}</Label>
      {children}
    </FormControl>
  </Grid>
)

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50%',
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
