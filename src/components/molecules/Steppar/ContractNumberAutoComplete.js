import React, { useEffect, useRef, useState, createContext, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import { useSelector } from "react-redux";

import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import debounce from 'lodash/debounce';
import { apiCall } from '../../../services/httpService'

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  return (
    <Typography fontSize={12} className="text-overflow" title={dataSet[1].DESCRIPTION} component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].DESCRIPTION}
    </Typography>
  );
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



export default function ContractNumberAutoComplete({onContractNumberSelectedId}) {

  const [input, setInput] = useState('')
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)
  const { searchContractNumber } = useSelector(({ common }) => common);

  useEffect(() => {
    if(searchContractNumber?.ID){
      setInput(searchContractNumber?.DESCRIPTION) }
  }, [searchContractNumber])

  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      try {
        const response = await apiCall({
            method: 'get',
            url: '/GetContractNumberList',
            params: {
              searchString: input
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
            url: '/GetContractNumberList',
            params: {
              searchString: input
            }
          })
        setOptions(response);
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setOptions([])
      }
    } else {
      setOptions([])
    }
  }, 50);

  const onTextHandle = (val) => {
    setInput(val)
    onChangeHandle(val)
  }


  const onBlur = () => {
    onClose(true)
  }
  const onClose = () => {

  }
  const onContractNumberChange = (value) => {
    onContractNumberSelectedId(value)
    setInput(value?.DESCRIPTION)   
  
}

  return (
    <Autocomplete
      size="small"
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={option => {
        return (typeof option === 'string' ? option : option?.DESCRIPTION) || ''
      }}
      loading={loading}
      value={input}
      isOptionEqualToValue={(option, value) => option.DESCRIPTION === value.DESCRIPTION}
      id="ContractNumberAutoComplete"
      onBlur={onBlur}
      freeSolo
      fullWidth
      onChange={(event, val) => onContractNumberChange(val)}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={options}
      renderInput={(params) => <TextField size="small"  {...params} onChange={e => onTextHandle(e.target.value)} value={input} placeholder="Please enter" />}
      renderOption={(props, option) => [props, option]}
    />
  );
}