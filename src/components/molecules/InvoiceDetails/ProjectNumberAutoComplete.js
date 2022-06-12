import React, { useEffect, useState } from 'react';
import {TextField,Checkbox,Autocomplete} from '@mui/material';
import debounce from 'lodash/debounce';
import { apiCall } from '../../../services/httpService'
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
export default function ProjectNumberAutoComplete({collectionId,setProjectNumberSelectId}) {
  
  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)
  const [projectNumberSelectedId,setProjectNumberSelectedId] = useState([])

  
  const onClose = () => {
    
}
  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      try {
        const response = await apiCall({
          method: 'get',
          url: '/GetInvoiceProjectNumbersList',
          params: {
            CollectionID: collectionId,
            SearchString: input
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
    if (value.length > 2 && value.trim()) {
      setLoading(true)
      try {
        const response = await apiCall({
          method: 'get',
          url: '/GetInvoiceProjectNumbersList',
          params: {
            CollectionID: collectionId,
            SearchString: input
          }
        })
        if(projectNumberSelectedId.length > 0){
          let result = response.filter(x=>{
            return !projectNumberSelectedId.some(t=> t === x.PROJECT_NUMBER)
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

  const onTextHandle = (val,param) => {
      setInput(val)
      if(param.InputProps?.startAdornment !== undefined){
        setProjectNumberSelectedId(param.InputProps.startAdornment.map(d=> d.props).map(d=>d.label))
      }
    onChangeHandle(val)
  }

  const onProjectNumberChange = (event,value) => {
    const selectedID = value.map(d=>d.ID).join(',')
    setProjectNumberSelectId(selectedID)
    setInput(selectedID)
  
}
  const onBlur = () => {
    onClose(true)
  }

  return (
    <Autocomplete
    size="small"
     multiple
    limitTags={2}
    id="multiple-limit-tags"
     open={open}
     onOpen={() => setOpen(true)}
     onClose={() => setOpen(false)}
    disableCloseOnSelect
    options={options}
    freeSolo
    getOptionSelected={(option, value) => option?.PROJECT_NUMBER === value?.PROJECT_NUMBER}
    getOptionLabel={option => option?.PROJECT_NUMBER}
    loading={loading}
    onChange={(event, val) => onProjectNumberChange(event,val)}
    renderOption={(props, option, { selected }) => (
        <li {...props}>
        <Checkbox
            icon={icon}
            checkedIcon={checkedIcon}
            style={{ marginRight: 8 }}
            checked={selected}
        />
        {option.PROJECT_NUMBER}
        </li>
    )}
    defaultValue={[]}
    renderInput={(params) => (
        <TextField fullWidth {...params} size="small"  onChange={e => onTextHandle(e.target.value,{...params})} value={input} placeholder="Please search"/>
        )} />
    );
}
