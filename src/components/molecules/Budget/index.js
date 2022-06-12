import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef, useMemo } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataGrid from 'react-data-grid'
import { budgetTableAction, saveBudgetTableAction, saveBudgetTableResetAction, budgetTableFlagResetAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader } from '../../atoms'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import {COLUMNS, formSaveData, NEW_ROW} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { fundingBudgetSummaryModalOpenAction } from '../FundingBudgetSummary/logic'
import { generateRandomString, sortLevelData } from '../../../helpers'
import useLazyLoad from '../../../hooks/useLazyLoad'
import ContractorCeiling from '../ContractorCeilings'
import ColumnFilter from '../../atoms/Filters'
import useColumns from '../../../hooks/useColumns'

function Budget(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('budgetTable')
  const { flag: saveBudgetTableFlag, error: saveBudgetTableError } = useSelector(state => state.saveBudgetTable)
  const collectionId = useSelector(state => state.getCollectionId)
  const {columnsData, headerColumns, filteredConfig, setColumnsData, clearFilters, filterParams = {}, filtersData} = useColumns({ columns: [...COLUMNS, ...(props?.udfGridColumns || [])], handleFiltersChange })
  const [openCC, setOpenCC] = useState(false)
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { CollectionId: collectionId, ModuleId: props.moduleId || 3, ...filterParams},
    url: '/GetBudgetHeaderData',
    rows: data,
    rowAdditionalData: {
      isExpanded: false
    },
    pageIndexKey: 'PageIndex',
    pageSizeKey: 'PageSize'
  })

  useEffect(() => {
    handleApiCall()
  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(budgetTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveBudgetTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveBudgetTableResetAction())
    }
  }, [saveBudgetTableError])

  useEffect(() => {
    if (saveBudgetTableFlag) {
      setSaveData([])
      prevSaveData.current = []
      dispatch(saveBudgetTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveBudgetTableFlag])

  function handleApiCall () {
    setSaveData([])
    prevSaveData.current = []
    resetFrom()
    dispatch(budgetTableAction({
      CollectionId: collectionId,
      ModuleId: props.moduleId || 3,
      PageIndex: 0,
      PageSize: 20,
      ...filterParams
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
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || 'U', COLLECTION_ID: collectionId, }] : [])
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }

  async function formRow (type = 'sub1', row, url, key) {
    const { BUDGET_ID, tableRowId, parentRowId, TASK_ID } = row
    const id = await getUniqueIdFromApi(url, key)
    const newUdf = {}
    props?.udfGridColumns?.forEach(d => {
      newUdf[d.key] = null
    })
    const newRow = { 
      ...NEW_ROW(row), 
      tableRowId: generateRandomString(),
      parentRowId: parentRowId || tableRowId,
      BUDGET_ID: id,
      ...(type === 'sub1' ? { PARENT_ID: TASK_ID, EXPENDITURE1_ID: id } : { PARENT_ID: BUDGET_ID, }),
      ...(type === 'sub1' ? { LEVEL_FLAG : 2 } : { LEVEL_FLAG : 3 }),
      ...newUdf
    }
    createSaveData(newRow, 'I')
    return newRow
  }

  function sortedData (dat = []) {
    return sortLevelData.from(dat).sortBy("BUDEGET_TASK_ID", "BUDEGET_EXPENDITURE1_ID", "BUDEGET_ID")
  }

  async function childLevelData (val) {
    try {
      const { BUDGET_ID, PROJECT_ID, tableRowId } = val
      const response = await apiCall({ method: 'get', url: '/GetBudgetLevelList', params: { CollectionId: collectionId, ProjectId: PROJECT_ID, ModuleId: props.moduleId || 3, BudgetId: BUDGET_ID, ...filterParams } })
      return sortedData(response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: tableRowId })))
    } catch (error) {
      return []
    }
  }

  async function onCellMenuItemClick(type, row) {
    if (type === 'add-row') {
      const { LEVEL_FLAG, tableRowId, BUDGET_ID } = row
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      let child = []
      const childLenght = newData.filter(d => d.PARENT_ID === BUDGET_ID)?.length || 0
      if (LEVEL_FLAG === 2) {
        if (!childLenght) {
          const newRow1 = await formRow('sub2', row, '/GetBudgetIdSequence', 'BUDEGET_ID')
          child.push(newRow1)
        }
      } else if (LEVEL_FLAG === 1) {
        if (!childLenght) {
          const newRow1 = await formRow('sub1', row, '/GetBudgetIdSequence', 'BUDEGET_ID')
          child.push(newRow1)
        }
      }
      const newRow = LEVEL_FLAG === 2 ? await formRow('sub2', row, '/GetBudgetIdSequence', 'BUDEGET_ID') : await await formRow('sub1', row, '/GetBudgetIdSequence', 'BUDEGET_ID')
      child.push(newRow)
      newData.splice(index + 1, 0, ...child)
      setRowsData(newData)
    }
  }

  const onExpand = async (val) => {
    const { isExpanded, tableRowId, isChildApiCalled } = val
    try {
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      if (!isExpanded) {
        if (!isChildApiCalled) {
          const response = await childLevelData(val)
          const child = [...response]
          newData.splice(index + 1, 0, ...child)
          newData[index].isChildApiCalled = true
        }
        newData[index].isExpanded = true
      } else {
        newData[index].isExpanded = false
      }
      setRowsData(newData)
    } catch (error) {
    }
  }

  const getChange = (row) => {
    createSaveData(row)
  }

  const onCellBlur = (editedRow, col) => {
    setTimeout(() => {
      let row = {
        ...editedRow
      }
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === row.tableRowId)
      newData[index] = {...row}
      if (col === 'BUDGET_QUANTITY' || col === 'BUDGET_AMOUNT') {
        const { PARENT_ID, LEVEL_FLAG } = row
        if (LEVEL_FLAG === 3) {
          const level3Total = newData.filter(d => d.PARENT_ID === PARENT_ID).map(item => item[col]).reduce((prev, next) => parseInt(prev || 0, 10) + parseInt(next || 0, 10), 0)
          const level2Index = newData.findIndex(d => d.BUDGET_ID === PARENT_ID)
          const level2 = newData[level2Index]
          level2[col] = level3Total
          newData[level2Index] = level2
          createSaveData(level2)
          const level2Total = newData.filter(d => d.BUDGET_ID === PARENT_ID).map(item => item[col]).reduce((prev, next) => parseInt(prev || 0, 10) + parseInt(next || 0, 10), 0)
          const level1Index = newData.findIndex(d => d.TASK_ID === level2.PARENT_ID)
          const level1 = newData[level1Index]
          level1[col] = level2Total
          newData[level1Index] = level1
          createSaveData(level1)
        } else if (LEVEL_FLAG === 2) {
          const level2Total = newData.filter(d => d.PARENT_ID === PARENT_ID).map(item => item[col]).reduce((prev, next) => parseInt(prev || 0, 10) + parseInt(next || 0, 10), 0)
          const level1Index = newData.findIndex(d => d.TASK_ID === PARENT_ID)
          const level1 = newData[level1Index]
          level1[col] = level2Total
          newData[level1Index] = level1
          createSaveData(level1)
        }
      }
      setRowsData(newData)
    })
  }

  const onSave = () => {
    const payload = {
      data: formSaveData(saveData, props.udfRawData, props.moduleId || 3),
      params: {
        CollectionID: collectionId
      }
    }
    dispatch(backDropLoaderOpenAction())
    dispatch(saveBudgetTableAction(payload))
  }


  const onSummaryView = () => {
    dispatch(fundingBudgetSummaryModalOpenAction())
  }

  const onRefresh = () => {
    handleApiCall()
  }

  const onClear = () => {
    clearFilters()
  }

  const formRows = useMemo(() => {
    const newData = []
    const excludeLevelData = rowsData.filter(d => d.LEVEL_FLAG === 0)
    const addChildData = (d) => {
      if (d.isExpanded) {
        newData.push(...rowsData.filter(z => z.parentRowId === d.tableRowId))
      }
    }
    excludeLevelData.forEach(d => {
      newData.push(d)
      addChildData(d)
    })
    return newData
  }, [rowsData])

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            <Button variant="outlined"className={"userDefinedBtn"} onClick={() => dispatch(userDefineFieldsModalOpenAction({ moduleId: props?.moduleId || 5 }))} >User Defined Fields</Button>
            <Button disabled={!filtersData.length} variant="contained" color="secondary" onClick={onClear} >Clear Filters</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            {/* <Button variant="contained" color="secondary" onClick={onRefresh} >Refresh</Button> */}
            <Button variant="contained" color="secondary" onClick={() => setOpenCC(true)} >Contract Ceilings</Button>
            <Button variant="contained" color="secondary" onClick={onSummaryView} >Summary View</Button>
            <Button disabled={!saveData?.length} variant="contained" onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
      <DataGrid
        style={{height: '60vh' }}
        rowHeight={40}
        headerRowHeight={60}
        noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
        rowKeyGetter={row => row.tableRowId}
        onRowsChange={setRowsData}
        otherFunctions={{ onExpand, onCellMenuItemClick, getChange, onCellBlur }}
        columns={headerColumns}
        onScroll={handleScroll}
        rows={!loading ? formRows : []}
      />
      </Stack>
      {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}
      {openCC && <ContractorCeiling isCollectionExist open={openCC} onClose={() => setOpenCC(false)}/>}
    </div>
  )
}

export default memo(Budget)
