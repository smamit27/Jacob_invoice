import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
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
  const [childData, setChildData] = useState({})
  const [openCC, setOpenCC] = useState(false)
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const gridRef = useRef(null)
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

  async function formRow (url, key, row, type = 'sub1') {
    const { BUDEGET_EXPENDITURE1_ID, tableRowId, parentRowId } = row
    const id = await getUniqueIdFromApi(url, key)
    const newUdf = {}
    props?.udfGridColumns?.forEach(d => {
      newUdf[d.key] = null
    })
    const newRow = { 
      ...NEW_ROW(row), 
      tableRowId: generateRandomString(),
      parentRowId: parentRowId || tableRowId,
      ...(type === 'sub1' ? {
        DATA_LEVEL: 'C',
        BUDEGET_EXPENDITURE1_ID: id, 
        BUDEGET_EXPENDITURE2_ID: null 
      } : {
        DATA_LEVEL: 'D',
        BUDEGET_EXPENDITURE1_ID, 
        BUDEGET_EXPENDITURE2_ID: id 
      }),
      ...newUdf
    }
    createSaveData(newRow, 'I')
    return newRow
  }

  function sortedData (dat = []) {
    return sortLevelData.from(dat).sortBy("BUDEGET_TASK_ID", "BUDEGET_EXPENDITURE1_ID", "BUDEGET_EXPENDITURE2_ID")
  }

  async function childLevelData (val) {
    try {
      const { BUDGET_ID, tableRowId } = val
      const response = await apiCall({ method: 'get', url: '/GetBudgetLevelList', params: { CollectionId: collectionId, ModuleId: props.moduleId || 3, BudgetId: BUDGET_ID, ...filterParams } })
      return sortedData(response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: tableRowId })))
    } catch (error) {
      return []
    }
  }

  async function onCellMenuItemClick(type, row) {
    if (type === 'add-row') {
      const { DATA_LEVEL, tableRowId, parentRowId } = row
      const newData = [...rowsData]
      let tempChildData = {...childData}
      let child = [...(tempChildData[parentRowId] || [])]
      const index = newData.findIndex(d => d.tableRowId === parentRowId)
      const oldChildLenght = child.length
      if (DATA_LEVEL === 'C') {
        if (!child.filter(d => d.BUDEGET_TASK_ID === row.BUDEGET_TASK_ID && d.BUDEGET_EXPENDITURE1_ID === row.BUDEGET_EXPENDITURE1_ID && d.BUDEGET_EXPENDITURE2_ID).length) {
          const newRow1 = await formRow('/GetBudgetExpd2Seq', 'BUDEGET_EXPENDITURE2_ID', row, 'sub2')
          child.push(newRow1)
        }
      } else if (DATA_LEVEL === 'B') {
        if (!child.filter(d => d.BUDEGET_TASK_ID === row.BUDEGET_TASK_ID && d.BUDEGET_EXPENDITURE1_ID).length) {
          const newRow1 = await formRow('/GetBudgetExpd1Seq', 'BUDEGET_EXPENDITURE1_ID', row, 'sub1')
          child.push(newRow1)
        }
      }
      const newRow = DATA_LEVEL === 'C' ? await formRow('/GetBudgetExpd2Seq', 'BUDEGET_EXPENDITURE2_ID', row, 'sub2') : await formRow('/GetBudgetExpd1Seq', 'BUDEGET_EXPENDITURE1_ID', row, 'sub1')
      child.push(newRow)
      newData.splice(index + 1, oldChildLenght, ...sortedData(child))
      setChildData({
        ...tempChildData,
        [parentRowId]: sortedData(child)
      })
      setRowsData(newData)
    }
  }

  const onExpand = async (val) => {
    const { isExpanded, tableRowId } = val
    try {
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      let child = childData[tableRowId] || []
      if (!isExpanded) {
        if (child && child.length) {
          newData.splice(index + 1, 0, ...child)
        } else {
          const response = await childLevelData(val)
          child = [...response]
          newData.splice(index + 1, 0, ...child)
        }
        newData[index].isExpanded = true
      } else {
        child = newData.splice(index + 1, childData[tableRowId].length)
        newData[index].isExpanded = false
      }
      setChildData({
        ...childData,
        [tableRowId]: sortedData(child)
      })
      setRowsData(newData)
    } catch (error) {
    }
  }

  const getChange = (row) => {
    createSaveData(row)
    if (row.parentRowId && childData[row?.parentRowId]) {
      const child = [...childData[row.parentRowId]].filter(d => d.tableRowId !== row.tableRowId)
      setChildData({
        ...childData,
        [row.parentRowId]: sortedData([...child, row])
      })
    }
  }

  const onCellBlur = (editedRow, col) => {
    let row = {
      ...editedRow
    }
    const newData = [...rowsData]
    if (row.parentRowId && childData[row?.parentRowId]) {
      const child = [...childData[row.parentRowId]].filter(d => d.tableRowId !== row.tableRowId)
      const index = newData.findIndex(d => d.tableRowId === row.parentRowId)
      const temp = [...child, row]
      const colName = columnsData.find(d => d.key === col)?.name || ''
      if (col === 'BUDGET_QUANTITY' || col === 'BUDGET_AMOUNT') {
        const currentIndex = temp.findIndex(d => d.tableRowId === row.tableRowId)
        const { BUDEGET_TASK_ID, BUDEGET_EXPENDITURE1_ID, BUDEGET_EXPENDITURE2_ID } = row
        if (BUDEGET_TASK_ID && BUDEGET_EXPENDITURE1_ID && BUDEGET_EXPENDITURE2_ID) {
          const level3Total = temp.filter(d => d.BUDEGET_TASK_ID === BUDEGET_TASK_ID && d.BUDEGET_EXPENDITURE1_ID === BUDEGET_EXPENDITURE1_ID && d.BUDEGET_EXPENDITURE2_ID).map(item => item[col]).reduce((prev, next) => parseInt(prev || 0, 10) + parseInt(next || 0, 10), 0)
          const level2Index = temp.findIndex(d => d.BUDEGET_TASK_ID === BUDEGET_TASK_ID && d.BUDEGET_EXPENDITURE1_ID === BUDEGET_EXPENDITURE1_ID && !d.BUDEGET_EXPENDITURE2_ID)
          const level2 = temp[level2Index]
          level2[col] = level3Total
          createSaveData(level2)
          const level2Total = temp.filter(d => d.BUDEGET_TASK_ID === BUDEGET_TASK_ID && d.BUDEGET_EXPENDITURE1_ID && !d.BUDEGET_EXPENDITURE2_ID).map(item => item[col]).reduce((prev, next) => parseInt(prev || 0, 10) + parseInt(next || 0, 10), 0)
          const level1Index = temp.findIndex(d => d.BUDEGET_TASK_ID === BUDEGET_TASK_ID && !d.BUDEGET_EXPENDITURE1_ID && !d.BUDEGET_EXPENDITURE2_ID)
          const level1 = temp[level1Index]
          level1[col] = level2Total
          createSaveData(level1)
          // if (level3Total > parseInt(level2[col] || 0, 10)) {
          //   dispatch(errorStatusNotificationAction({
          //     message: `${colName} exceeded by ${level3Total - parseInt(level2[col] || 0, 10)}`,
          //     type: 'budget-validate'
          //   }))
          //   temp[currentIndex][col] = null
          //   row = {
          //     ...temp[currentIndex],
          //   }
          // }
        } else if (BUDEGET_TASK_ID && BUDEGET_EXPENDITURE1_ID) {
          const level2Total = temp.filter(d => d.BUDEGET_TASK_ID === BUDEGET_TASK_ID && d.BUDEGET_EXPENDITURE1_ID && !d.BUDEGET_EXPENDITURE2_ID).map(item => item[col]).reduce((prev, next) => parseInt(prev || 0, 10) + parseInt(next || 0, 10), 0)
          const level1Index = temp.findIndex(d => d.BUDEGET_TASK_ID === BUDEGET_TASK_ID && !d.BUDEGET_EXPENDITURE1_ID && !d.BUDEGET_EXPENDITURE2_ID)
          const level1 = temp[level1Index]
          level1[col] = level2Total
          createSaveData(level1)
          // if (level2Total > parseInt(level1[col] || 0, 10)) {
          //   dispatch(errorStatusNotificationAction({
          //     message: `${colName} exceeded by ${level2Total - parseInt(level1[col] || 0, 10)}`,
          //     type: 'budget-validate'
          //   }))
          //   temp[currentIndex][col] = null
          //   row = {
          //     ...temp[currentIndex],
          //   }
          // }
        }
        const sortD = sortedData([...temp])
        createSaveData(row)
        setTimeout(() => {
          newData.splice(index + 1, temp.length, ...sortD)
          setRowsData(newData)
          setChildData({
            ...childData,
            [row.parentRowId]: sortD
          })
        }, 300)
      }
    }
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
      style={{height: 'calc(80vh*(9/13))' }} 
        ref={gridRef}
        rowHeight={40}
        headerRowHeight={60}
        noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
        rowKeyGetter={row => row.tableRowId}
        onRowsChange={setRowsData}
        otherFunctions={{ onExpand, onCellMenuItemClick, getChange, onCellBlur }}
        columns={headerColumns}
        onScroll={handleScroll}
        rows={!loading ? rowsData : []}
      />
      </Stack>
      {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}
      {openCC && <ContractorCeiling isCollectionExist open={openCC} onClose={() => setOpenCC(false)}/>}
    </div>
  )
}

export default memo(Budget)
