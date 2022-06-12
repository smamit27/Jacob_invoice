import React, { useEffect, useRef, useState, createContext, forwardRef, useContext } from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import Autocomplete, { autocompleteClasses } from '@mui/material/Autocomplete';
import useMediaQuery from '@mui/material/useMediaQuery';
import Popper from '@mui/material/Popper';
import { useTheme, styled } from '@mui/material/styles';
import { VariableSizeList } from 'react-window';
import Typography from '@mui/material/Typography';
import { apiCall } from '../../../services/httpService';
import { useSelector } from 'react-redux';

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
      {dataSet[1].description}
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
  '& .MuiPaper-root': {
    width: 300
  },
  [`& .${autocompleteClasses.listbox}`]: {
    boxSizing: 'border-box',
    '& ul': {
      padding: 0,
      margin: 0,
    },
  },
});

export const textEditorClassname = `rdg-text-editor rdg-autocomplete`;

export default function AutoCompleteEditorCustom({
  row,
  column,
  onRowChange,
  onClose,
  otherFunctions,
}) {
  const [options, setOptions] = useState([])
  const { data: levelOptions } = useSelector(state => state.employeeOverrideLevelDropdown)
  useEffect(() => {
    if (row.LEVEL && levelOptions.length) {
      const { id = '' } = levelOptions.find(d => d.description === row.LEVEL) || {}
      if (id) {
        const callApi = async () => {
          const res = await apiCall({
            method: 'get',
            url: '/GetBillingLevelName',
            params: { collectionId: row.COLLECTION_ID, seqNum: id }
          })
          setOptions(res.map(d => ({ id: d.COLLECTION_ID || d.GROUP_ID || d.PROJECT_ID || d.TASK_GROUP_ID || d.TASK_ID, description: d.COLLECTION_NAME || d.GROUP_NAME || d.PROJECT_NAME || d.TASK_GROUP_NAME || d.TASK_NAME_OVERRIDE })))
        }
        callApi()
      }
    }
  }, [])
  const onChange = (e, val) => {
    onRowChange({ ...row, [column.key]: val?.description || '', LEVEL_NAME_ID: val?.id || 0 })
    const { getChange } = otherFunctions
    if (getChange) {
      getChange({ ...row, [column.key]: val?.description || '', LEVEL_NAME_ID: val?.id || 0 }, column.key)
    }
  }
  const onBlur = () => {
    onClose(true)
  }
  return (
    <Autocomplete
      disabled={!row.LEVEL}
      className={textEditorClassname}
      onBlur={onBlur}
      id="virtualize-demo"
      getOptionLabel={option => {
        return (typeof option === 'string' ? option : option?.description) || ''
      }}
      freeSolo
      disableListWrap
      size="small"
      value={row[column.key] || ''}
      onChange={onChange}
      PopperComponent={StyledPopper}
      ListboxComponent={ListboxComponent}
      options={options}
      renderInput={(params) => <TextField autoFocus {...params} placeholder="Search" />}
      renderOption={(props, option) => [props, option]}
    />
  );
}