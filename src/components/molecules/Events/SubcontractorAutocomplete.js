import React, { useEffect, useRef, useState, createContext, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import debounce from 'lodash/debounce';
import { apiCall } from '../../../services/httpService'
import { errorStatusNotificationAction } from '../StatusNotification/logic';
import { useDispatch } from 'react-redux';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };
    
  if(dataSet[1].PROJECT_NUMBER) {
    return (
      <Typography fontSize={12} className="text-overflow" title={dataSet[1].description} component="li" {...dataSet[0]} noWrap style={inlineStyle}>
        {dataSet[1].PROJECT_NUMBER}
      </Typography>
    );
  }
  if(dataSet[1].TASK_NUMBER) {
    
  return (
    <Typography fontSize={12} className="text-overflow" title={dataSet[1].description} component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].TASK_ID}
    </Typography>
  );}
  if(dataSet[1].VENDOR_NAME) {

  return (
    <Typography fontSize={12} className="text-overflow" title={dataSet[1].description} component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].VENDOR_NAME}
    </Typography>
  );}
  if(dataSet[1].VENDOR_NUMBER) {
  return (
    <Typography fontSize={12} className="text-overflow" title={dataSet[1].description} component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].VENDOR_NUMBER}
    </Typography>
  );}
  if(dataSet[1].PO_NUMBER) {
  return (
    <Typography fontSize={12} className="text-overflow" title={dataSet[1].description} component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].PO_NUMBER}
    </Typography>
  );}
}

const OuterElementContext = createContext({});

const OuterElementType = forwardRef((props, ref) => {
  const outerProps = useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = useRef(null);
  useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = forwardRef(function ListboxComponent(props, ref) {
  const { children, ...other } = props;
  const itemData = [];
  if (children) {
    children.forEach((item) => {
      itemData.push(item);
      itemData.push(...(item.children || []));
    });
  }

  const theme = useTheme();
  const smUp = useMediaQuery(theme.breakpoints.up('sm'), {
    noSsr: true,
  });

  const itemCount = itemData.length;
  const itemSize = smUp ? 36 : 48;

  const getChildSize = (child) => {
    return itemSize;
  };

  const getHeight = () => {
    if (itemCount > 8) {
      return 8 * itemSize;
    }
    return itemData.map(getChildSize).reduce((a, b) => a + b, 0);
  };

  const gridRef = useResetCache(itemCount);
  return (
    <div ref={ref}>
      <OuterElementContext.Provider value={other}>
        <VariableSizeList
          itemData={itemData}
          height={getHeight() + 2 * LISTBOX_PADDING}
          width={300}
          ref={gridRef}
          outerElementType={OuterElementType}
          innerElementType="ul"
          itemSize={(index) => getChildSize(itemData[index])}
          overscanCount={5}
          itemCount={itemCount}
        >
          {renderRow}
        </VariableSizeList>
      </OuterElementContext.Provider>
    </div>
  );
});

ListboxComponent.propTypes = {
  children: PropTypes.node,
};

const StyledPopper = styled(Popper)({
  width: '300px !important',
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});



export default function SubcontractorAutocomplete({
  rowsData,
  column,
  onRowChange,
  onClose,
  otherFunctions,
  disabled = false
}) {
  const [inputVal, setInputVal] = useState(rowsData[column.key] || '')
    
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)
  const dispatch = useDispatch()

  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      try {
        const response = await apiCall({
          method: 'get',
          url: column.url,
          params: column.params,
        })
        console.log(response);
        setOptions(response);
        setLoading(false)
      } catch (error) {

        setOptions([]);
        setLoading(false)
      }
    }
    
    if (inputVal?.trim()) {
      callApi()
    }
  }, [])

  
  const onChangeHandle = debounce(async (value) => {
      
    if (value.trim()) {
      setLoading(true)
      try {
        let paramVal=column.params;
        paramVal.SearchString = value;
        paramVal.ProjectNumber = 'SU000100';
        paramVal.VendorNameSearch = value;
        paramVal.VendorNumber = '5011';
        paramVal.PoNumber=value;
        paramVal.TaskNumber=value;
        const response = await apiCall({
          method: 'get',
          url: column.url,
          params: paramVal,
        })
          
        response.length != 0 ? setOptions(response): setOptions([]);
        setLoading(false)
      } catch (error) {
        console.log(error);
        setLoading(false)

        setOptions([])
      }
    } else {

      setOptions([])
    }
  }, 800);

  const onTextHandle = (val) => {
    setInputVal(val)
    onChangeHandle(val)
  }

  const onChange = async (val) => {
      

    if (val) {
      const { getChange, saveData } = otherFunctions
      try {
        // const check = saveData.filter(d => d.SAVE_MODE === 'I').map(d => d.ID) || []
        // if (val?.ID && check.includes(val?.ID)) {
        //   dispatch(errorStatusNotificationAction({
        //     type: 'subconid',
        //     message: `Subcontractor Name (${val?.PROJECT_NUMBER}) already belongs to current Collection`
        //   }))
        //   return
        // }
        // if (row.PROJECT_NUMBER !== val?.PROJECT_NUMBER && val?.SUBCONTRACTOR_ID) {
        //   const [res] = await apiCall({
        //     method: 'get',
        //     url: '/ValidateSubContractorEmpInfo',
        //     params: { collectionId: row.COLLECTION_ID, subcontractorId: val?.SUBCONTRACTOR_ID }
        //   })
        //   if (res && res.FINAL_STATUS === 'FAILED') {
        //     dispatch(errorStatusNotificationAction({
        //       type: 'subconid',
        //       message: res.ERROR_OUT_MSG
        //     }))
        //     return
        //   }
        // }
          
        switch (column.key) {
          case 'PROJECT_NUMBER':
            onRowChange({ ...rowsData, PROJECT_NUMBER: val[column.key], PROJECT_ID: val?.ID })
            ;
             setInputVal(val?.[column.key])
             
             if (getChange) {
                 
               getChange({ ...rowsData, PROJECT_NUMBER: val?.[column.key], ID: rowsData?.id}, column.key)
             }
            break;
        
          case 'TASK_NUMBER':
            onRowChange({ ...rowsData, TASK_NUMBER: val[column.key], PROJECT_ID: val?.ID })
            ;
             setInputVal(val?.[column.key])
             
             if (getChange) {
                 
               getChange({ ...rowsData, TASK_NUMBER: val?.TASK_ID, ID: rowsData?.id}, column.key)
             }
            break;
            case 'VENDOR_NAME':
              onRowChange({ ...rowsData, VENDOR_NAME: val[column.key], PROJECT_ID: val?.ID })
              ;
               setInputVal(val?.[column.key])
               
               if (getChange) {
                   
                 getChange({ ...rowsData, VENDOR_NAME: val?.[column.key],VENDOR_NUMBER: val?.VENDOR_NUMBER, ID: rowsData?.id}, column.key)
               }
              break;
            case 'VENDOR_NUMBER':
              onRowChange({ ...rowsData, VENDOR_NUMBER: val[column.key], PROJECT_ID: val?.ID })
              ;
               setInputVal(val?.[column.key])
               
               if (getChange) {
                   
                 getChange({ ...rowsData, VENDOR_NUMBER: val?.[column.key], ID: rowsData?.id}, column.key)
               }
              break;
              case 'PO_NUMBER':
                onRowChange({ ...rowsData, PO_NUMBER: val[column.key], PROJECT_ID: val?.ID })
                ;
                 setInputVal(val?.[column.key])
                 
                 if (getChange) {
                     
                   getChange({ ...rowsData, PO_NUMBER: val?.[column.key], ID: rowsData?.id}, column.key)
                 }
                break;
          
          default:
            break;
        }
       
      } catch (error) {
        dispatch(errorStatusNotificationAction({
          type: 'subconid',
          message: error.message
        }))
      }
    }
  }
  const onBlur = () => {
    onClose(true)
  }
console.log('inputVal value: ', inputVal)
  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={option => {
        return (typeof option === 'string'  ? option : option?.[column.key]?.toString()) || ''
      }}
      loading={loading}
      value={rowsData?.[column.key] || ''}
      isOptionEqualToValue={(option, value) => option.ID === value.ID}
      id="SubcontractorAutocomplete"
      onBlur={onBlur}
      freeSolo
      fullWidth
      onChange={(e, val) => onChange(val)}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={options}
      renderInput={(params) => <TextField size="small" {...params} autoFocus onChange={e => onTextHandle(e.target.value)} value={inputVal} placeholder="Search" />}
      renderOption={(props, option) => [props, option]}
    />
  );
}
