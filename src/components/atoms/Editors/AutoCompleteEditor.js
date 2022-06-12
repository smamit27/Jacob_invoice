import * as React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';

const LISTBOX_PADDING = 8; // px

function renderRow(props) {
  const { data, index, style } = props;
  const dataSet = data[index];
  const inlineStyle = {
    ...style,
    top: style.top + LISTBOX_PADDING,
  };
  return (
    <Typography component="li" {...dataSet[0]} noWrap style={inlineStyle}>
      {dataSet[1]}
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
  children.forEach((item) => {
    itemData.push(item);
    itemData.push(...(item.children || []));
  });

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
          width="100%"
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
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export const textEditorClassname = `rdg-text-editor rdg-autocomplete`;

export default function AutoCompleteEditor({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions,
  disabled
}) {
  const onChange = (e, val) => {
    const temp = { ...row, [column.key]: val }
    onRowChange(temp)
    const { getChange, getEnterChange } = otherFunctions
    if (getChange) {
      getChange(temp, column.key)
    }
    if (e.key === 'Enter' && getEnterChange) {
      getEnterChange(temp, column.key)
    }
  }
  const onBlur = (temp = null) => {
    const { onCellBlur } = otherFunctions
    if (onCellBlur) {
      onCellBlur(temp ? temp[column?.key] : row[column?.key], column.key)
    }
    onClose(true)
  }
  return (
    <Autocomplete
      disabled={disabled}
      fullWidth
      className={textEditorClassname}
      onBlur={onBlur}
      id="virtualize-demo"
      disableListWrap
      size="small"
      freeSolo
      value={row[column.key] || ''}
      onChange={onChange}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={column.rowValueOptionsKey && row[column?.rowValueOptionsKey] ? row[column.rowValueOptionsKey] : column.valueOptions}
      renderInput={(params) => <TextField autoFocus {...params} placeholder="Search" />}
      renderOption={(props, option) => [props, option]}
    />
  );
}