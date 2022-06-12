import {useMemo, useState, useEffect, useRef} from 'react'
import { parse, stringify } from 'query-string'
import { IconButton } from '@mui/material'
import { useLocation, useHistory  } from 'react-router-dom'
import { formFilterQuery, jsonStringParse } from '../helpers';
import { isEqual } from 'lodash';


function useColumns({ columns = [], handleFiltersChange, local = false }) {
  const history = useHistory()
  const { search = '' } = useLocation()
  const { filters = '', ...rest } = parse(search)
  const [columnsData, setColumnsData] = useState(columns)
  const [filtersData, setFiltersData] = useState(local ? [] : jsonStringParse(filters, []))
  const prevFilterData = useRef(jsonStringParse(filters, []))
  const [anchorEl, setAnchorEl] = useState(null);
  const [filteredColumn, setFilteredColumn] = useState({})
  const open = Boolean(anchorEl)

  useEffect(() => {
    if (!local) {
      const fil = jsonStringParse(filters, [])
      setFiltersData(fil)
    }
  }, [filters])

  useEffect(() => {
    if (!isEqual((filtersData || []), prevFilterData.current)) {
      handleFiltersChange()
      prevFilterData.current = filtersData
    }
  }, [filtersData])

  const handleClick = (event, col) => {
    setFilteredColumn(col)
    setAnchorEl(event.currentTarget);
  };

  const handleFilterClick = (fil) => {
    handleClose()
    if (local) {
      setFiltersData(fil)
    } else {
      const params = stringify({
        ...rest,
        filters: JSON.stringify(fil)
      })
      history.push(`?${params}`)
    }
  }

  const handleClose = () => {
    setAnchorEl(null)
    setFilteredColumn({})
  };

  const clearFilters = () => {
    if (local) {
      setFiltersData([])
    } else {
      const params = stringify({
        ...rest,
        // filters: JSON.stringify([])
      })
      history.push(`?${params}`)
    }
  }

  const customHederRender = (p) => {
    const {column = {}} = p
    const { name, filterEditor } = column
    const checkLength = filtersData.filter(d => d.key === column?.key).length
    return (
      <div style={{ width: '100%' }} className="disp-flex vcenter space-btwn" >
        {name}
        {filterEditor && (
          <div className={`rdg-filter${checkLength ? ' rdg-filter-exist' : ''}`} >
            <IconButton size='small' color='primary' onClick={(e) => handleClick(e, column)}  >
              <i style={{ fontSize: 20 }} className="la la-filter hand"  ></i>
            </IconButton>
          </div>
        )}
      </div>
    )
  }
  const headerColumns = useMemo(() => {
    const columns = columnsData.map((colData) =>
    ({
      headerRenderer: customHederRender,
      ...colData
    }));
    return columns;
  }, [columnsData, filtersData]);

  return {
    headerColumns,
    columnsData,
    setColumnsData,
    filtersData,
    setFiltersData,
    clearFilters,
    filterParams: formFilterQuery(filtersData),
    filteredConfig: {
      column: filteredColumn,
      handleClose,
      filtersData,
      anchorEl,
      open,
      handleFilterClick
    }
  }
}

export default useColumns