import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import DataGrid from 'react-data-grid'
import { fundingTableAction, saveFundingTableAction, saveFundingTableResetAction, fundingTableFlagResetAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader } from '../../atoms'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import {columns, NEW_ROW, formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { sortLevelData, generateRandomString } from '../../../helpers'
import useLazyLoad from '../../../hooks/useLazyLoad'
import AllocateToTask from './AllocateToTask'
import { fundingBudgetSummaryModalOpenAction } from '../FundingBudgetSummary/logic'
import ContractorCeiling from '../ContractorCeilings'
import ColumnFilter from '../../atoms/Filters'
import useColumns from '../../../hooks/useColumns'
import { errorStatusNotificationAction, warningStatusNotificationAction } from '../StatusNotification/logic'
import useErrorCell from '../../../hooks/useErrorCell'

function Funding(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('fundingTable')
  const { flag: saveFundingTableFlag, error: saveFundingTableError } = useSelector(state => state.saveFundingTable)
  const collectionId = useSelector(state => state.getCollectionId)
  const {columnsData, headerColumns, filteredConfig, clearFilters, filterParams = {}, filtersData} = useColumns({ columns: [...columns, ...(props?.udfGridColumns || [])], handleFiltersChange })
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { CollectionId: collectionId, ModuleId: props.moduleId || 2, ...filterParams },
    url: '/GetFundingDetails',
    rows: data,
    rowAdditionalData: {
      isExpanded: false
    },
    pageIndexKey: 'PageIndex',
    pageSizeKey: 'PageSize'
  })
  const gridRef = useRef(null)
  const { handleErrorCell, errorCell, gridRef } = useErrorCell()
  const [childData, setChildData] = useState({})
  const [openTask, setOpenTask] = useState(null)
  const [openCC, setOpenCC] = useState(false)
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  useEffect(() => {
    handleApiCall()
  }, [])

  useEffect(() => {
    if (errorCell.current) {
      setTimeout(() => {
        handleErrorCell()
      }, 300)
    }
  }, [rowsData])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(fundingTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveFundingTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveFundingTableResetAction())
    }
  }, [saveFundingTableError])

  useEffect(() => {
    if (saveFundingTableFlag) {
      prevSaveData.current = []
      setSaveData([]) 
      dispatch(saveFundingTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveFundingTableFlag])

  function handleApiCall () {
    setSaveData([])
    prevSaveData.current = []
    resetFrom()
    dispatch(fundingTableAction({
      CollectionId: collectionId,
      ModuleId: props.moduleId || 2,
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

  async function formRow (url, key, row) {
    const { AGREEMENT_ID, PROJECT_ID, tableRowId, parentRowId } = row
    const id = await getUniqueIdFromApi(url, key)
    const newUdf = {}
    props?.udfGridColumns?.forEach(d => {
      newUdf[d.key] = null
    })
    const newRow = { 
      ...NEW_ROW, AGREEMENT_ID, PROJECT_ID, 
      tableRowId: generateRandomString(),
      parentRowId: parentRowId || tableRowId,
        LEVEL_FLAG: 'C',
        ALLOCATION_SUBTOT_1_ID: id, 
      ...newUdf
    }
    createSaveData(newRow, 'I')
    return newRow
  }

  function sortedData (dat = []) {
    return sortLevelData.from(dat).sortBy("PROJECT_ID", "ALLOCATION_SUBTOT_1_ID")
  }

  async function childLevelData (val) {
    try {
      const { AGREEMENT_ID, PROJECT_ID, tableRowId } = val
      const response = await apiCall({ method: 'get', url: '/GetFundingAllocationDetails', params: { CollectionID: collectionId, ModuleID: props.moduleId || 2, AgreementID: AGREEMENT_ID, ProjectID: PROJECT_ID, ...filterParams } })
      return sortedData(response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: tableRowId })))
    } catch (error) {
      return []
    }
  }

  async function onCellMenuItemClick(type, row) {
    if (type === 'add-row') {
      const { LEVEL_FLAG, INNER_LEVEL_FLAG, tableRowId, parentRowId, FUNDING_ALLOCATION_AMOUNT } = row
      const newData = [...rowsData]
      let child = [...(childData[parentRowId ? parentRowId : tableRowId] || [])]
      if (LEVEL_FLAG === 'B') {
        const index = newData.findIndex(d => d.tableRowId === tableRowId)
        if (INNER_LEVEL_FLAG === 'N') {
          // const amount = (Number(FUNDING_ALLOCATION_AMOUNT || 2) / 2).toFixed(2)
          const newRow = await formRow('/GetFundingAll1TotalSeq', 'FUNDING_ALLOCATION_1_ID', row)
          const newRow1 = await formRow('/GetFundingAll1TotalSeq', 'FUNDING_ALLOCATION_1_ID', row)
          // child.push({...newRow, FUNDING_ALLOCATION_SUBTOTAL_1: amount })
          // child.push({...newRow1, FUNDING_ALLOCATION_SUBTOTAL_1: amount })
          child.push(newRow)
          child.push(newRow1)
          newData[index].INNER_LEVEL_FLAG = 'Y'
          newData[index].isExpanded = true
          newData.splice(index + 1, 0, ...sortedData(child))
        } else {
          if (child.length) {
            const newRow = await formRow('/GetFundingAll1TotalSeq', 'FUNDING_ALLOCATION_1_ID', row)
            const oldChildLenght = child.length
            child.push(newRow)
            if (row.isExpanded) {
              newData.splice(index + 1, oldChildLenght, ...sortedData(child))
            } else {
              newData.splice(index + 1, 0, ...sortedData(child))
            }
          } else {
            const response = await childLevelData(row)
            const newRow = await formRow('/GetFundingAll1TotalSeq', 'FUNDING_ALLOCATION_1_ID', row)
            child = [...response, newRow]
            newData[index].isExpanded = true
            newData.splice(index + 1, 0, ...sortedData(child))
          }
        }
      }
      setChildData({
        ...childData,
        [parentRowId ? parentRowId : tableRowId]: sortedData(child)
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

  const openAllocateToTask = (row, flag) => {
    const { FUNDING_ALLOCATION_SUBTOTAL_1, tableRowId, LEVEL_FLAG, FUNDING_ALLOCATION_AMOUNT, AGREEMENT_ID, PROJECT_ID, ALLOCATION_SUBTOT_1_ID, CLIENT_FUNDING_DETAILS_1_ACRN, CLIENT_FUNDING_DETAILS_2_PHASE, FUNDING_SOURCE_ID } = row
    const params = {
      CollectionId: collectionId,
      ModuleId: props.moduleId || 2,
      AGREEMENT_ID,
      ProjectId: PROJECT_ID,
      FundingSubTotal1: ALLOCATION_SUBTOT_1_ID,
      FUNDING_SOURCE_ID,
      FUNDING_ALLOCATION_AMOUNT,
      FUNDING_ALLOCATION_SUBTOTAL_1,
      CLIENT_FUNDING_DETAILS_1_ACRN,
      CLIENT_FUNDING_DETAILS_2_PHASE,
      LEVEL_FLAG,
      tableRowId
    }
    setOpenTask(params)
    if (flag) {
      const newData = [...rowsData]
      if (row?.parentRowId && childData[row.parentRowId]) {
        const child = childData[row.parentRowId]
        const childIndex = child.findIndex(d => d.tableRowId === row.tableRowId)
        child[childIndex] = {...row}
        const index = newData.findIndex(d => d.tableRowId === row.parentRowId)
        newData.splice(index + 1, child.length, ...sortedData(child))
        setChildData({
          ...childData,
          [row?.parentRowId]: sortedData(child)
        })
        setRowsData(newData)
      } else {
        const index = newData.findIndex(d => d.tableRowId === row.tableRowId)
        newData[index] = {...row}
        setRowsData(newData)
      }
      createSaveData(row)
    }
  }

  const onCloseTask = () => {
    setOpenTask(null)
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

  const fundingSourceApiCall = async (row) => {
    const { CLIENT_FUNDING_DETAILS_2_PHASE, CLIENT_FUNDING_DETAILS_1_ACRN, FUNDING_ALLOCATION_AMOUNT, FUNDING_ALLOCATION_SUBTOTAL_1, LEVEL_FLAG, AGREEMENT_ID, PROJECT_ID, FUNDING_SOURCE_ID } = row
    try {
      const [res = {}] = await apiCall({
        method: 'post',
        url: '/SaveFundingSource',
        params: {
          CollectionID: collectionId,
          AGREEMENTID: AGREEMENT_ID,
          PROJECTID: PROJECT_ID,
          FundingSourceID: FUNDING_SOURCE_ID || 0,
          FundingSourceName: `${CLIENT_FUNDING_DETAILS_1_ACRN}, ${CLIENT_FUNDING_DETAILS_2_PHASE}, $${FUNDING_ALLOCATION_SUBTOTAL_1 || FUNDING_ALLOCATION_AMOUNT}`,
        }
      })
      if (!FUNDING_SOURCE_ID && res?.FUNDING_SOURCE_ID) {
        return res?.FUNDING_SOURCE_ID
      } 
      return null
    } catch (error) {
      return null
    }
  }

  const updateFundingSource = async (editedRow, col) => {
    const row = {
      ...editedRow
    }
    let id = null
    if (col === 'FUNDING_ALLOCATION_SUBTOTAL_1' || col === 'FUNDING_ALLOCATION_AMOUNT' || col === 'CLIENT_FUNDING_DETAILS_1_ACRN' || col === 'CLIENT_FUNDING_DETAILS_2_PHASE') {
      const { FUNDING_ALLOCATION_SUBTOTAL_1, FUNDING_ALLOCATION_AMOUNT, CLIENT_FUNDING_DETAILS_1_ACRN, CLIENT_FUNDING_DETAILS_2_PHASE } = row
      if (row?.parentRowId) {
        if (FUNDING_ALLOCATION_SUBTOTAL_1 && CLIENT_FUNDING_DETAILS_1_ACRN && CLIENT_FUNDING_DETAILS_2_PHASE) {
          id = await fundingSourceApiCall(row)
        }
      } else if (CLIENT_FUNDING_DETAILS_1_ACRN && CLIENT_FUNDING_DETAILS_2_PHASE && FUNDING_ALLOCATION_AMOUNT && !childData[row.tableRowId]) {
        id = await fundingSourceApiCall(row)
      }
    }
    return id
  }

  const onCellBlur = async (editedRow, col) => {
    let row = {
      ...editedRow
    }
    let index = -1
    const newData = [...rowsData]
    const colIndex = columnsData.findIndex(d => d.key === col)
    const colName = columnsData[colIndex].name || ''
    if (row.parentRowId && childData[row?.parentRowId]) {
      const child = [...childData[row.parentRowId]].filter(d => d.tableRowId !== row.tableRowId)
      index = newData.findIndex(d => d.tableRowId === row.parentRowId)
      const temp = [...child, row]
      if (col === 'FUNDING_ALLOCATION_SUBTOTAL_1') {
        const currentIndex = temp.findIndex(d => d.tableRowId === row.tableRowId)
        let cellChange = ''
        const { PROJECT_ID, ALLOCATION_SUBTOT_1_ID } = row
        if (PROJECT_ID && ALLOCATION_SUBTOT_1_ID) {
          const level2Total = temp.filter(d => d.PROJECT_ID === PROJECT_ID && d.ALLOCATION_SUBTOT_1_ID).map(item => item[col]).reduce((prev, next) => Number(prev || 0) + Number(next || 0), 0)
          const level1 = newData[index]
          const level1Total = Number(level1.ORACLE_AGREEMENT_AMOUNT_TOTAL || 0)
          if (level2Total > level1Total) {
            dispatch(errorStatusNotificationAction({
              message: `${colName} is overallocated by ${(level2Total - level1Total).toFixed(2)}. Please review the allocation and make corrections.`,
              type: 'funding-validate'
            }))
            temp[currentIndex][col] = null
            row = {
              ...temp[currentIndex],
            }
            cellChange = 'error'
          } else {
            level1.FUNDING_ALLOCATION_AMOUNT = level2Total.toFixed(2)
            createSaveData(level1)
            cellChange = 'change'
          }
          if (cellChange) {
            if (cellChange === 'change') {
              const sourceId = await updateFundingSource(row, col)
              if (sourceId) {
                temp[currentIndex].FUNDING_SOURCE_ID = sourceId
              }
            }
            const sortD = sortedData([...temp])
            createSaveData(row)
            setTimeout(() => {
              newData.splice(index + 1, temp.length, ...sortD)
              const rowIndex = newData.findIndex(d => d.tableRowId === row.tableRowId)
              if (cellChange === 'error') {
                errorCell.current = {
                  rowIndex,
                  colIndex
                }
              }
              setRowsData(newData)
              setChildData({
                ...childData,
                [row.parentRowId]: sortD
              })
            }, 300)
          }
        }
      }
    }
    if (col === 'FUNDING_ALLOCATION_AMOUNT') {
      index = newData.findIndex(d => d.tableRowId === row.tableRowId)
      const oracleAmount = Number(row.ORACLE_AGREEMENT_AMOUNT_TOTAL || 0)
      const amount = Number(row.FUNDING_ALLOCATION_AMOUNT || 0)
      if (amount > oracleAmount) {
        dispatch(errorStatusNotificationAction({
          message: `${colName} is overallocated by ${(amount - oracleAmount).toFixed(2)}. Please review the allocation and make corrections.`,
          type: 'funding-validate'
        }))
        row = {
          ...row,
          [col]: null
        }
        createSaveData(row)
        setTimeout(() => {
          errorCell.current = {
            rowIndex: index,
            colIndex
          }
          newData[index] = row
          setRowsData(newData)
        }, 300)
      } else {
        const sourceId = await updateFundingSource(row, col)
        if (sourceId) {
          setTimeout(() => {
            row.FUNDING_SOURCE_ID = sourceId
            newData[index] = row
            setRowsData(newData)
          }, 300)
        }
      }
    }
    if (col === 'CLIENT_FUNDING_DETAILS_1_ACRN' || col === 'CLIENT_FUNDING_DETAILS_2_PHASE') {
      const sourceId = await updateFundingSource(row, col)
      if (sourceId) {
        setTimeout(() => {
          row.FUNDING_SOURCE_ID = sourceId
          createSaveData(row)
          if (row.parentRowId) {
            const child = [...childData[row.parentRowId]].filter(d => d.tableRowId !== row.tableRowId)
            index = newData.findIndex(d => d.tableRowId === row.parentRowId)
            const temp = [...child, row]
            const sortD = sortedData([...temp])
            newData.splice(index + 1, temp.length, ...sortD)
            setRowsData(newData)
            setChildData({
              ...childData,
              [row.parentRowId]: sortD
            })
          } else {
            index = index = newData.findIndex(d => d.tableRowId === row.tableRowId)
            newData[index] = row
            setRowsData(newData)
          }
        }, 300)
      }
    }
  }

  const onSaveSource = (dat, id) => {
    const newData = [...rowsData]
    const index = newData.findIndex(d => d.tableRowId === id)
    if (index !== -1) {
      if (newData[index].parentRowId) {
        const child = childData[newData[index].parentRowId] || []
        const childIndex = child.findIndex(d => d.tableRowId === id)
        child[childIndex].CLIENT_TASK_GROUP = dat
        setChildData({
          ...childData,
          [newData[index].parentRowId]: sortedData(child)
        })
      }
      newData[index].CLIENT_TASK_GROUP = dat
      setRowsData(newData)
      createSaveData(newData[index])
    }
  }

  const onSave = () => {
    const checkValidation = saveData.find(d => d.LEVEL_FLAG === 'C' && (d.FUNDING_ALLOCATION_SUBTOTAL_1 === null || d.FUNDING_ALLOCATION_SUBTOTAL_1 === ''))
    if (checkValidation) {
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === checkValidation.parentRowId)
      const colIndex = columnsData.findIndex(d => d.key === 'FUNDING_ALLOCATION_SUBTOTAL_1')
      const child = childData[checkValidation.parentRowId]
      if (!newData[index]?.isExpanded) {
        newData.splice(index + 1, 0, ...child)
        newData[index].isExpanded = true
        const rowIndex = newData.findIndex(d => d.tableRowId === checkValidation.tableRowId)
        errorCell.current = {
          rowIndex,
          colIndex
        }
        setRowsData(newData)
      } else {
        const rowIndex = newData.findIndex(d => d.tableRowId === checkValidation.tableRowId)
        errorCell.current = {
          rowIndex,
          colIndex
        }
        setTimeout(() => {
          handleErrorCell()
        }, 300)
      }
      setTimeout(() => {
        dispatch(errorStatusNotificationAction({
          type: 'funding-validate',
          message: 'Allocation Subtotal1 is not filled. Please review the allocation Subtotal1 and make corrections. '
        }))
      }, 500)
      return
    }
    const payload = {
      data: formSaveData(saveData, props.udfRawData, props.moduleId || 2),
      params: {
        CollectionId: collectionId
      }
    }
    dispatch(backDropLoaderOpenAction())
    dispatch(saveFundingTableAction(payload))
  }

  const onRefresh = () => {
    handleApiCall()
  }

  const onClear = () => {
    clearFilters()
  }

  const onSummaryView = () => {
    dispatch(fundingBudgetSummaryModalOpenAction())
  }

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            <Button variant="outlined" className={"userDefinedBtn"} onClick={() => dispatch(userDefineFieldsModalOpenAction({ moduleId: props?.moduleId || 5 }))} >User Defined Fields</Button>
            <Button disabled={!filtersData.length} variant="contained" color="secondary" onClick={onClear} >Clear Filters</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" >
            {/* <Button variant="contained" color="secondary" onClick={onRefresh} >Refresh</Button> */}
            <Button variant="contained" color="secondary" onClick={() => setOpenCC(true)} >Contract Ceilings</Button>
            <Button variant="contained" color="secondary" onClick={onSummaryView} >Summary View</Button>
            <Button disabled={!saveData?.length} variant="contained" onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid
          ref={gridRef}
          style={{height: 'calc(80vh*(9/13))' }} 
          rowHeight={40}
          headerRowHeight={60}
          noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
          rowKeyGetter={row => row.tableRowId}
          onRowsChange={setRowsData}
          otherFunctions={{ onExpand, onCellMenuItemClick, getChange, openAllocateToTask, childData, onCellBlur, dispatch }}
          columns={headerColumns}
          rows={!loading ? rowsData : []}
          onScroll={handleScroll}
        />
        {openTask && <AllocateToTask open={!!openTask} onSave={onSaveSource} onClose={onCloseTask} modalData={openTask} />}
        {openCC && <ContractorCeiling isCollectionExist open={openCC} onClose={() => setOpenCC(false)}/>}
      </Stack>
      {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}
    </div>
  )
}

export default memo(Funding)
