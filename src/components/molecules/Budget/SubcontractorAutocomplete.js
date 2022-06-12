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

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };

  return (
    <Typography fontSize={12} className="text-overflow" title={dataSet[1].description} component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1].SUBCONTRACTOR_NAME}
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



export default function SubcontractorAutocomplete({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions,
  disabled = false
}) {
  const [input, setInput] = useState(row?.SUBCONTRACTOR_NAME || '')
  const [open, setOpen] = useState(false);
  const [options, setOptions] = useState([]);
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    const callApi = async () => {
      setLoading(true)
      try {
        const response = await apiCall({
          method: 'get',
          url: '/GetSubContractorsList',
          params: {
            CollectionID: row.COLLECTION_ID,
            SubContractorName: input
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
          url: '/GetSubContractorsList',
          params: {
            CollectionID: row.COLLECTION_ID,
            SubContractorName: value
          }
        })
        setOptions(response);
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
    setInput(val)
    onChangeHandle(val)
  }

  const onChange = async (val) => {
    if (val) {
      const { getChange } = otherFunctions
      onRowChange({ ...row, SUBCONTRACTOR_NAME: val?.SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID: val?.SUBCONTACTOR_ID })
      setInput(val?.SUBCONTRACTOR_NAME)
      if (getChange) {
        getChange({ ...row, SUBCONTRACTOR_NAME: val?.SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID: val?.SUBCONTACTOR_ID }, column.key)
      }
    }
  }
  const onBlur = () => {
    onClose(true)
  }

  return (
    <Autocomplete
      size="small"
      disabled={disabled}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={option => {
        return (typeof option === 'string' ? option : option?.SUBCONTRACTOR_NAME) || ''
      }}
      loading={loading}
      value={row.SUBCONTRACTOR_NAME || ''}
      isOptionEqualToValue={(option, value) => option.SUBCONTRACTOR_NAME === value.SUBCONTRACTOR_NAME}
      id="SubcontractorAutocomplete"
      onBlur={onBlur}s
      freeSolo
      fullWidth
      onChange={(e, val) => onChange(val)}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={options}
      renderInput={(params) => <TextField size="small" {...params} autoFocus onChange={e => onTextHandle(e.target.value)} value={input} placeholder="Search" />}
      renderOption={(props, option) => [props, option]}
    />
  );
}
