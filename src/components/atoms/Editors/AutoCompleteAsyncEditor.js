import * as React from 'react';
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
      {dataSet[1].description}
    </Typography>
  );
}

const OuterElementContext = React.createContext({});

const OuterElementType = React.forwardRef((props, ref) => {
  const outerProps = React.useContext(OuterElementContext);
  return <div ref={ref} {...props} {...outerProps} />;
});

function useResetCache(data) {
  const ref = React.useRef(null);
  React.useEffect(() => {
    if (ref.current != null) {
      ref.current.resetAfterIndex(0, true);
    }
  }, [data]);
  return ref;
}

// Adapter for react-window
const ListboxComponent = React.forwardRef(function ListboxComponent(props, ref) {
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
          width={250}
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
  width: '250px !important',
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});



export default function AutoCompleteAsyncEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions,
  disabled = false
}) {
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const [loading, setLoading] = React.useState(false)

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  const onChangeHandle = debounce(async (value) => {
    if (value.trim()) {
      setLoading(true)
      try {
        const { apiUrl = '', apiMethod = 'get', apiParams = {}, apiSearchKey = 'input', responseIdKey = 'id', responseDescriptionKey = 'description' } = column
        const response = await apiCall({
          method: apiMethod,
          url: apiUrl,
          params: {
            ...apiParams,
            [apiSearchKey]: value
          }
        })
        setOptions(response.map(y => ({ id: y[responseIdKey], description: y[responseDescriptionKey] })));
        setLoading(false)
      } catch (error) {
        setLoading(false)
        setOptions([])
      }
    } else {
      setOptions([])
    }
  }, 500);

  const onChange = (val) => {
    onRowChange({ ...row, ...(column?.dataIdKey ? { [column.key]: val?.description, [column.dataIdKey]: val?.id } : { [column.key]: val?.id }) })
    const { getChange } = otherFunctions
    if (getChange) {
      getChange({ ...row, ...(column?.dataIdKey ? { [column.key]: val?.description, [column.dataIdKey]: val?.id } : { [column.key]: val?.id }) }, column.key)
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
    <Autocomplete
      disabled={disabled}
      open={open}
      onOpen={() => setOpen(true)}
      onClose={() => setOpen(false)}
      getOptionLabel={option => {
        return (typeof option === 'string' ? option : option?.description) || ''
      }}
      loading={loading}
      value={row[column.key] || ''}
      id="virtualize-demo"
      onBlur={onBlur}
      freeSolo
      fullWidth
      size="small"
      onChange={(e, val) => onChange(val)}
      disableListWrap
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={options}
      renderInput={(params) => <TextField size="small" autoFocus onChange={e => onChangeHandle(e.target.value)} {...params} placeholder="Search" />}
      renderOption={(props, option) => [props, option]}
    />
  );
}
