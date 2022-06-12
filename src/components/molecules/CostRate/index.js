import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { groupBy } from 'lodash';
import { useDispatch, useSelector } from 'react-redux'
import {
  costRateTableAction, saveCostRateTableAction, saveCostRateTableResetAction, costRateTableFlagResetAction, deleteCostRatesResetAction, deleteCostRatesAction,
} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import {columns, formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import NoDataFound from '../../atoms/NoDataFound'
import useLazyLoad from '../../../hooks/useLazyLoad'
import { tiaSubconpoModalOpenAction } from '../../views/Tia/logic'
import AlertModal from '../Modal/AlertModal'
import { errorStatusNotificationAction } from '../StatusNotification/logic';

const loadingTypes = {
  'add': "Adding new row's ",
  'loading': 'Loading more rows',
  'delete': "Deleting row's"
}

function CostRate(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('costRateTable')
  const { flag: saveCostRateTableFlag, error: saveCostRateTableError } = useSelector(state => state.saveCostRateTable)
  const { data: currencyOptions } = useSelector(state => state.getCurrency)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteCostRates)
  const collectionId = useSelector(state => state.getCollectionId)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const [columnsData, setColumnsData] = useState(formColumns.map(d => ({ ...d, ...(d.key === 'CURRENCY' ? { valueOptions: currencyOptions } : {}) })))
  const [selectedRows, setSelectedRows] = useState([])
  const [childData, setChildData] = useState({})
  const [deleteModal, setDeleteModal] = useState(false)
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      collectionId,
      moduleId: props.moduleId || 23,
      orderBy: 1,
    },
    url: '/GetCostRatesHeaderData',
    rows: data,
    rowAdditionalData: {
      level: 1
    }
  })

  useEffect(() => {
    dispatch(costRateTableAction({
      collectionId,
      moduleId: props.moduleId || 23,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
    }))
  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      dispatch(costRateTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveCostRateTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveCostRateTableResetAction())
    }
  }, [saveCostRateTableError])

  useEffect(() => {
    if (saveCostRateTableFlag) {
      prevSaveData.current = []
      setSaveData([])
      dispatch(saveCostRateTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveCostRateTableFlag])

  useEffect(() => {
    if (deleteFlag) {
      resetFrom()
      setSaveData([])
      prevSaveData.current = []
      setSelectedRows([])
      dispatch(costRateTableAction({
        collectionId,
        moduleId: props.moduleId || 23,
        orderBy: 1,
        pageIndex: 0,
        pageSize: 20,
      }))
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteCostRatesResetAction())
    }
  }, [deleteFlag])

  useEffect(() => {
    if (deleteError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteCostRatesResetAction())
    }
  }, [deleteError])

  function createSaveData (row, type = '') {
    const oldSaveData = [...prevSaveData.current]
    const oldData = oldSaveData.find(d => d.tableRowId === row.tableRowId)
    const filterData = oldSaveData.filter(d => d.tableRowId !== row.tableRowId)
    const newSaveData = [
      ...filterData,
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || 'U' }] : [])
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }

  async function onCellMenuItemClick(type, row) {
    setSelectedRows([])
    const { tableRowId, parentRowId, INFO_SR_NO, isExpanded, COLLECTION_ID, SUBCONTRACTOR_NAME, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_ID, FLAG_IS, ...rest } = row
    if (type === 'add-new-row') {
      const newData = [...rowsData]
      const id = await getUniqueIdFromApi('/GetCostRateSequence', 'INFO_SR_NO')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const childLength = isExpanded && childData[tableRowId] ? childData[tableRowId].length : 0
      const tempRow = {
        tableRowId: generateRandomString(), parentRowId: (parentRowId || tableRowId), INFO_SR_NO: id, COLLECTION_ID, SUBCONTRACTOR_ID: null, SUBCONTRACTOR_NAME: '', SUBCONTRACTOR_NUMBER: null, SUBCONTRACTOR_BILLING_TITLE: null, SUBCONTRACTOR_BILLING_TITLE_NAME: '', EFFECTIVE_START_DATE: '', EFFECTIVE_END_DATE: '', CURRENCY: '', COST_RATE: null, OT_COST_RATE: null, DT_COST_RATE: null, SDA_COST_RATE: null, level: 1, FLAG_IS: 'N'
      }
      createSaveData(tempRow, 'I')
      newData.splice(index + childLength + 1, 0, tempRow)
      setRowsData(newData)
    } else if (type === 'add-row') {
      const newData = [...rowsData]
      let child = {...childData}
      const id = await getUniqueIdFromApi('/GetCostRateSequence', 'INFO_SR_NO')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const tempRow = {
        tableRowId: generateRandomString(), parentRowId: (parentRowId || tableRowId), INFO_SR_NO: id, SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID, COLLECTION_ID, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_BILLING_TITLE: null, SUBCONTRACTOR_BILLING_TITLE_NAME: '', EFFECTIVE_START_DATE: '', EFFECTIVE_END_DATE: '', CURRENCY: '', COST_RATE: null, OT_COST_RATE: null, DT_COST_RATE: null, SDA_COST_RATE: null, level: 2
      }
      if (row.level === 1) {
        newData[index] = {
          tableRowId,
          level: 1,
          SUBCONTRACTOR_NAME,
          SUBCONTRACTOR_NUMBER,
          FLAG_IS: 'Y',
          isExpanded: true
        }
        child = {
          ...child,
          [tableRowId]: [
            { ...rest, tableRowId: generateRandomString(), parentRowId: tableRowId, level: 2, INFO_SR_NO, SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID, SUBCONTRACTOR_NUMBER },
            tempRow
          ]
        }
        newData.splice(index + 1, 0, ...child[tableRowId])
      } else {
        const index = newData.findIndex(z => z.tableRowId === parentRowId)
        const childIndex = child[parentRowId].findIndex(z => z.tableRowId === tableRowId)
        child[parentRowId].splice(childIndex + 1, 0, tempRow)
        newData.splice(index + 1, child[parentRowId].length - 1, ...child[parentRowId]);
      }
      setChildData(child)
      setRowsData(newData)
      createSaveData(tempRow, 'I')
    }
  }

  async function onExpand (row) {
    const newRows = [...rowsData]
    const index = rowsData.findIndex(d => d.tableRowId === row.tableRowId)
    newRows[index] = { ...row, isExpanded: !row.isExpanded }
    let child = childData[row.tableRowId] || []
    if (!row.isExpanded) {
      if (child && child.length) {
        newRows.splice(index + 1, 0, ...child);
      } else {
        const response = await apiCall({
          method: 'get',
          url: '/GetCostRatesSubLevelData',
          params: {
            collectionId: collectionId,
            moduleId: props.moduleId || 23,
            subcontractorId: row.SUBCONTRACTOR_ID,
            orderBy: 1,
            pageIndex: 0,
            pageSize: 10000
          }
        })
        const res = response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: row.tableRowId, level: 2 }))
        child = res
        newRows.splice(index + 1, 0, ...res);
      }
    } else {
      child = newRows.splice(index + 1, child.length);
    }
    setChildData({
      ...childData,
      [row.tableRowId]: child
    })
    setRowsData(newRows)
  }

  function rowKeyGetter(row) {
    return row.tableRowId;
  }

  function onSelectedRowsChange (checked, val, parentId) {
    if (checked) {
      let values = [val]
      if (parentId) {
        const child = childData[parentId]?.map(d => d.tableRowId) || []
        const selRows = [...selectedRows, val]
        if (child.every(d => selRows.includes(d))) {
          values = [...values, parentId]
        }
      } else if (childData[val]) {
        const child = childData[val]?.map(d => d.tableRowId) || []
        values = [...values, ...child]
      }
      setSelectedRows([...selectedRows, ...values])
    } else {
      let values = [val]
      if (parentId) {
        values = [...values, parentId]
      } else if (childData[val]) {
        const child = childData[val]?.map(d => d.tableRowId) || []
        values = [...values, ...child]
      }
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }
  
  const getChange = (editedRow, key) => {
    let updatedRow = {
      ...editedRow
    }
    try {
      const newData = [...rowsData]
      const index = newData.findIndex(d  => d.tableRowId === editedRow.tableRowId)
      if (key === 'EFFECTIVE_START_DATE') {
        updatedRow = {
          ...editedRow,
          EFFECTIVE_END_DATE: ''
        }
        newData[index] = updatedRow
        setRowsData(newData)
      }
    } catch (error) {
      
    }
    createSaveData(updatedRow)
    if (updatedRow.parentRowId && childData[updatedRow?.parentRowId]) {
      const child = {...childData}
      const index = child[updatedRow.parentRowId].findIndex(d => d.tableRowId === updatedRow.tableRowId)
      child[updatedRow.parentRowId][index] = updatedRow
      setChildData({...child})
    }
  }

  const onSave = async () => {
    if (saveData.every(d => d.SUBCONTRACTOR_ID)) {
      const payload = formSaveData(saveData, props.udfRawData, props.moduleId || 23, collectionId)
      dispatch(backDropLoaderOpenAction())
      dispatch(saveCostRateTableAction(payload, collectionId))
    } else {
      dispatch(errorStatusNotificationAction({
        type: 'saveEmployeeInfo',
        message: 'Teaming Subcontractor Name is required.'
      }))
    }
  }

  const onRefresh = () => {
    resetFrom()
    setSaveData([])
    prevSaveData.current = []
    setSelectedRows([])
    dispatch(costRateTableAction({
      collectionId,
      moduleId: props.moduleId || 23,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
    }))
  }

  const onRowsChange = (newRows, ...args) => {
    setRowsData(newRows)
  }

  const onPoClick = (val) => {
    dispatch(tiaSubconpoModalOpenAction({
      id: val.SUBCONTRACTOR_ID,
      name: val.SUBCONTRACTOR_NAME
    }))
  }

  const onAddNewRow = async () => {
    const id = await getUniqueIdFromApi('/GetCostRateSequence', 'INFO_SR_NO')
      const tempRow = {
        tableRowId: generateRandomString(), COLLECTION_ID: collectionId, INFO_SR_NO: id, SUBCONTRACTOR_ID: null, SUBCONTRACTOR_NAME: '', SUBCONTRACTOR_NUMBER: null, SUBCONTRACTOR_BILLING_TITLE: null, SUBCONTRACTOR_BILLING_TITLE_NAME: '', EFFECTIVE_START_DATE: '', EFFECTIVE_END_DATE: '', CURRENCY: '', COST_RATE: null, OT_COST_RATE: null, DT_COST_RATE: null, SDA_COST_RATE: null, level: 1, FLAG_IS: 'N'
      }
      createSaveData(tempRow, 'I')
      setRowsData([tempRow])
  }

  const onDelete = () => {
    const tempDeleteData = rowsData.filter(d => selectedRows.includes(d.tableRowId))
    const temp = saveData.filter(d => d.SAVE_MODE === 'I').map(d => d.tableRowId)
    const temp1 = tempDeleteData.filter(d => !((d.FLAG_IS === 'Y' && d.level === 1) || d.levelId || temp.includes(d.tableRowId)))
    setDeleteModal(false)
    if (temp1.length) {
      dispatch(deleteCostRatesAction({
        data: {
          subContractorList: [{
            "subcontractoR_ID": 0,
            "infoSRList": temp1.map(z => ({
              infoSRNumber: z.INFO_SR_NO
            }))
          }]
        },
        params: {
          collectionId
        }
      }))
      dispatch(backDropLoaderOpenAction())
    } else {
      onRefresh()
    }
  }

  const renderNoData = () => (
    <NoDataFound>
      <Stack spacing={3} mt={2.5} alignItems="center" >
        <div>Oops! There  are no cost rates yet! Please add Cost rate. </div>
        <div>
          <Button size="small" variant="contained" color="secondary" onClick={onAddNewRow} >Add</Button>
        </div>
      </Stack>
    </NoDataFound>
  )

  const disabledRowSelection = rowsData.filter(d=>(d.FLAG_IS === 'Y' && d.level === 1) && !childData[d.tableRowId]).map(d=>d.tableRowId)

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <Button variant="contained" color="secondary" onClick={onRefresh} >Refresh</Button>
            <Button disabled={!selectedRows.length} variant="contained" color="secondary" onClick={() => setDeleteModal(true)} >Delete</Button>
            <Button variant="contained" disabled={!saveData?.length} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid
          onScroll={handleScroll}
          otherFunctions={{ onCellMenuItemClick, onExpand, getChange, onPoClick, selectedRows, onSelectedRowsChange, saveData, disabled: disabledRowSelection }}
          rowHeight={40}
          headerRowHeight={60}
          noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataComponent={renderNoData} style={{ height: '70vh', position: 'sticky', left: 0 }} />}
          onRowsChange={onRowsChange}
          style={{height: 'calc(80vh*(9/13))' }} 
          rowKeyGetter={rowKeyGetter}
          columns={columnsData}
          rows={rowsData}
        />
      </Stack>
      {deleteModal && (
        <AlertModal title="Delete selected user row's" open={deleteModal} onConfirm={onDelete} onClose={() => setDeleteModal(false)} >
          Are you sure that you want delete the selected record's and all the unsaved changes will be reverted ?
        </AlertModal>
      )}
    </div>
  )
}

export default memo(CostRate)
