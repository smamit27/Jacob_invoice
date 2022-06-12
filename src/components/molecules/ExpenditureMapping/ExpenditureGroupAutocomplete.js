import React, { useEffect,  useState } from 'react';
import {TextField,Checkbox,Autocomplete} from '@mui/material';
import debounce from 'lodash/debounce';
import { apiCall } from '../../../services/httpService'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank'
import CheckBoxIcon from '@mui/icons-material/CheckBox'

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function ExpenditureGroupAutocomplete({
    row,
    column,
    onRowChange,
    onClose,
    otherFunctions,
    disabled = false
  }) {
 
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)
  const [projectGroupSelectedId,setProjectGroupSelectedId] = useState([])
  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      try {
        const response = await apiCall({
          method: 'get',
          url: '/GetExpenditureMappingGroupList',
          params: {
            active: 'y'
          }
        })       
        setOptions(response);
        setLoading(false)
      } catch (error) {
        setOptions([]);
        setLoading(false)
      }
    }
    if (input.trim()) {
      callApi()
    }
  }, [])

  const onChangeHandle = debounce(async (value) => {
    if (value.trim()) {
      setLoading(true)
      try {
        const response = await apiCall({
          method: 'get',
          url: '/GetExpenditureMappingGroupList',
          params: {
            active: 'y'
          }
        })
        if(projectGroupSelectedId.length > 0){
          let result = response.filter(x=>{
            return !projectGroupSelectedId.some(t=> t === x.DESCRIPTION)
          })
          setOptions(result)
        } else{
          setOptions(response);

        }
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setOptions([])
      }
    } else {
      setOptions([])
    }
  }, 500);

  const onTextHandle = (val) => {
    setInput(val)
    onChangeHandle(val)
  }

  const onBlur = () => {
    onClose(true)
  }

  const onChange = (event,newValue) => {
    const val = {
      ID: null,
      DESCRIPTION: ''
    }
    const selectedID = newValue.map(d=>d.ID).join(',')

    if (typeof newValue === 'string') {
      if (!options.some((option) => newValue === option.DESCRIPTION)) {
        val.DESCRIPTION = newValue.map(d=>d.DESCRIPTION).join(',')
      }
    } else if (newValue && newValue.inputValue) {
      val.DESCRIPTION = newValue.inputValue
    } else {
      val.DESCRIPTION = newValue.map(d=>d.DESCRIPTION).join(',')
      val.ID = newValue.map(d=>d.ID).join(',')
    }
    onRowChange({ ...row, EXPENDITURE_GROUP: val?.DESCRIPTION, EXPENDITURE_GROUP_ID: val?.ID })
    setInput(val?.DESCRIPTION)
    const { getChange } = otherFunctions
    if (getChange) {
      getChange({ ...row, EXPENDITURE_GROUP: val?.DESCRIPTION, EXPENDITURE_GROUP_ID: val?.ID }, column.key)
    }
  }
  return (
    <Autocomplete
     size="small"
     multiple
     limitTags={2}
     id="ExpenditureGroupAutocomplete"
     open={open}
     onBlur={onBlur}
     onOpen={() => setOpen(true)}
     onClose={() => setOpen(false)}
     disableCloseOnSelect
     options={options}
     getOptionSelected={(option, value) => option?.DESCRIPTION === value?.DESCRIPTION}
     getOptionLabel={option => option?.DESCRIPTION}
     loading={loading}
     freeSolo
     onChange={(event, val) => onChange(event,val)}
     renderOption={(props, option, { selected }) => (
        <li {...props}>
        <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
        />
        {option.DESCRIPTION}
        </li>
    )}
    defaultValue={[]}
    renderInput={(params) => (
        <TextField fullWidth {...params} size="small" onChange={e => onTextHandle(e.target.value,{...params})} value={input} placeholder="Please search"/>
        )} />
    );
}
