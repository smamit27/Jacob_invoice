import { Button, Grid, Stack,Box } from '@mui/material'
import React, { useEffect, useState, useCallback, memo, useRef } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import { expenditureMappingTableAction,expenditureMappingTableFlagResetAction,expenditureMappingTableResetAction,saveExpenditureMappingAction,saveExpenditureMappingResetAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader } from '../../atoms'
import { useStylesTable } from '../../atoms/TableTheming';
import {  EXPENDITURE_TABLE, formSaveData} from './constants'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import DataGrid from 'react-data-grid'
import useLazyLoad from '../../../hooks/useLazyLoad'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import useColumns from '../../../hooks/useColumns'
import ColumnFilter from '../../atoms/Filters'


function ExpenditureMapping(props) {
  const {moduleId} = props;
  const classes = useStylesTable()
  const dispatch = useDispatch()
  const { loading, error, data, flag } = useIntialSelector('expenditureMappingTable')
  const { flag: saveExpenditureMappingTableFlag, error: saveExpenditureMappingTableError } = useSelector(state => state.saveExpenditureMappingReducer)
  const collectionId = useSelector(state => state.getCollectionId)
  const {columnsData, setColumnsData, headerColumns, filteredConfig, clearFilters, filterParams = {}, filtersData = []} = useColumns({ columns: [...EXPENDITURE_TABLE, ...(props?.udfGridColumns || [])], handleFiltersChange})
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { CollectionID: collectionId, ModuleID: 8, ...filterParams },
    url: '/GetExpenditureDetails',
    rows: data,
    rowAdditionalData: {
      isExpanded: false
    },
  })
const [saveData, setSaveData] = useState([])
const prevSaveData = useRef([])


  useEffect(() => {
    dispatch(expenditureMappingTableAction({
      CollectionID: collectionId,
      ModuleID:moduleId,
      PageIndex: 0,
      PageSize: 20
    }))
    return () => {
      dispatch(expenditureMappingTableResetAction())
    }
  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      const col = columnsData.map(d => d.udf ? ({
        ...d,
        editor: ({ row, ...rest }) => row.IS_GROUP ==='Y' ? null : <d.editor row={row} {...rest} />
      }) : d)
      setColumnsData(col)
      dispatch(expenditureMappingTableFlagResetAction())

    }
  }, [flag])

  useEffect(() => {
    if (saveExpenditureMappingTableFlag) {
      setSaveData([])
      prevSaveData.current = []
      handleApiCall()
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveExpenditureMappingTableFlag])
  useEffect(() => {
    if (saveExpenditureMappingTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveExpenditureMappingResetAction())
    }
  }, [saveExpenditureMappingTableError])
  const onSave = () => {
    backDropLoaderOpenAction()
    dispatch(saveExpenditureMappingAction({
      CollectionID: collectionId}, formSaveData(saveData, props.udfRawData, props.moduleId || 6)
    ))
  }
  function handleApiCall () {
    setSaveData([])
    prevSaveData.current = []
    resetFrom()
    dispatch(expenditureMappingTableAction({
      CollectionID: collectionId,
      ModuleID:moduleId,
      PageIndex: 0,
      PageSize: 20,
      ...filterParams,
    }))
  }
  function handleFiltersChange () {
    handleApiCall()
  }

  function createSaveData (row, type = '') {
    const oldSaveData = [...prevSaveData.current]
    const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
    const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
    const newSaveData = [
      ...filterData,
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || row.SAVE_MODE, COLLECTION_ID: collectionId, }] : [])
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }
  
  const getChange = (row) => {
    createSaveData(row)
   }
   const onRowsChange = (newRows) => {
    setRowsData(newRows)
  }
  const onClear = () => {
    clearFilters()
  }

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
       
          <Stack spacing={2} direction="row" >
            <Button variant="outlined" className={"userDefinedBtn"} onClick={() => dispatch(userDefineFieldsModalOpenAction({ moduleId: (moduleId || 7) }))} >User Defined Fields</Button>
            <Button disabled={!filtersData.length} variant="contained" color="secondary" onClick={onClear} >Clear Filters</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" >
            <Button variant="contained"  disabled={!saveData?.length} onClick={onSave}>Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} style={{ height: '90vh', width: '100%' }} >
            <DataGrid
              otherFunctions={{ getChange}}
              rowHeight={40}
              headerRowHeight={60}
              onRowsChange={onRowsChange}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0}} />}
              rowKeyGetter={row => row.tableRowId}
              columns={headerColumns}
              rows={loading ? [] : rowsData}
              onScroll={handleScroll}
              style={{height: 'calc(80vh*(9/13))' }} 
            />
            {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}

      </Stack>
    </div>
  )
}

export default memo(ExpenditureMapping)