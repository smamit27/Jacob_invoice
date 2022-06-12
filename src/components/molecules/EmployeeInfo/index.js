import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { groupBy } from 'lodash';
import {
  employeeInfoTableAction, saveEmployeeInfoTableAction, saveEmployeeInfoTableResetAction,
  employeeInfoTableFlagResetAction, deleteEmployeeInfoResetAction, employeeInfoBillingTitleDropdownAction,
  deleteEmployeeInfoAction
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

const rowGrouper = (res) => {
  let response = []
  const val = groupBy([...res.filter(d => !d.levelId)], 'EMP_LEVEL_INFO_SR_NO')
  Object.keys(val).forEach((d, i)=> {
    if (val[d].length <= 1) {
      response = [...response, ...val[d]]
    } else {
      const [first] = val[d]
      const {tableRowId, parentRowId, INFO_SR_NO, COLLECTION_ID, SUBCONTRACTOR_NAME, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_ID, level, SUBCONTRACTOR_EMPLOYEE_NAME, SUBCONTRACTOR_EMPLOYEE_ID, EMP_LEVEL_INFO_SR_NO } = first
      response = [...response, { tableRowId: EMP_LEVEL_INFO_SR_NO, EMP_LEVEL_INFO_SR_NO, levelId: EMP_LEVEL_INFO_SR_NO, parentRowId, INFO_SR_NO, COLLECTION_ID, SUBCONTRACTOR_NAME, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_ID, level, SUBCONTRACTOR_EMPLOYEE_NAME, SUBCONTRACTOR_EMPLOYEE_ID }, ...val[d].map(z => ({ ...z, level: 3 }))]
    }
  })
  return [...response]
}

function EmployeeInfo(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('employeeInfoTable')
  const { flag: saveEmployeeInfoTableFlag, error: saveEmployeeInfoTableError } = useSelector(state => state.saveEmployeeInfoTable)
  const { data: currencyOptions } = useSelector(state => state.getCurrency)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteEmployeeInfo)
  const collectionId = useSelector(state => state.getCollectionId)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const [columnsData, setColumnsData] = useState(formColumns.map(d => ({ ...d, ...(d.key === 'CURRENCY' ? { valueOptions: currencyOptions } : {}) })))
  const [selectedRows, setSelectedRows] = useState([])
  const [childData, setChildData] = useState({})
  const [saveData, setSaveData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const prevSaveData = useRef([])
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      collectionId,
      moduleId: props.moduleId || 22,
      orderBy: 1,
    },
    url: '/GetEmployeeInfoHeaderData',
    rows: data,
    rowAdditionalData: {
      level: 1
    }
  })

  useEffect(() => {
    dispatch(employeeInfoBillingTitleDropdownAction({
      collectionId
    }))
    dispatch(employeeInfoTableAction({
      collectionId,
      moduleId: props.moduleId || 22,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
    }))
  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData([...data])
      dispatch(employeeInfoTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveEmployeeInfoTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveEmployeeInfoTableResetAction())
    }
  }, [saveEmployeeInfoTableError])

  useEffect(() => {
    if (saveEmployeeInfoTableFlag) {
      prevSaveData.current = []
      setSaveData([])
      dispatch(saveEmployeeInfoTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveEmployeeInfoTableFlag])

  useEffect(() => {
    if (deleteFlag) {
      resetFrom()
      setSaveData([])
      prevSaveData.current = []
      setRowsData([])
      setSelectedRows([])
      dispatch(employeeInfoTableAction({
        collectionId,
        moduleId: props.moduleId || 22,
        orderBy: 1,
        pageIndex: 0,
        pageSize: 20,
      }))
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteEmployeeInfoResetAction())
    }
  }, [deleteFlag])

  useEffect(() => {
    if (deleteError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteEmployeeInfoResetAction())
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

  async function addSubRows (row) {
    const { tableRowId, parentRowId, INNER_COUNT, INFO_SR_NO, COLLECTION_ID, EMP_LEVEL_INFO_SR_NO, SUBCONTRACTOR_NAME, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_ID, SUBCONTRACTOR_EMPLOYEE_ID, SUBCONTRACTOR_EMPLOYEE_NAME, levelParentId, ...rest } = row
    const newData = [...rowsData]
    let child = {...childData}
    const id = await getUniqueIdFromApi('/GetEmployeeInformationSequenceNumber', 'FUNDING_SOURCE_PERCENT_ID')
    const index = newData.findIndex(d => d.tableRowId === (parentRowId || tableRowId))
    const tempRow = {
      tableRowId: generateRandomString(), parentRowId: (parentRowId || tableRowId), EMP_LEVEL_INFO_SR_NO, INFO_SR_NO: id, SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID, COLLECTION_ID, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_EMPLOYEE_NAME, SUBCONTRACTOR_EMPLOYEE_ID, SUBCONTRACTOR_BILLING_TITLE: '', SUBCONTRACTOR_BILLING_TITLE_NAME: '', CLIENT_BILLING_TITLE: '', CLIENT_BILLING_TITLE_DESC: '', EXEMPT: '', EXEMPT_DISPLAY: '', level: 3
    }
    if (row.level === 1) {
      newData[index] = {
        tableRowId,
        level: 1,
        COLLECTION_ID,
        SUBCONTRACTOR_NAME,
        SUBCONTRACTOR_NUMBER,
        INNER_COUNT: INNER_COUNT + 1,
        isExpanded: true
      }
      child = {
        ...child,
        [tableRowId]: [
          { ...rest, tableRowId: generateRandomString(), parentRowId: tableRowId, level: 2, EMP_LEVEL_INFO_SR_NO, INFO_SR_NO, SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_EMPLOYEE_NAME, SUBCONTRACTOR_EMPLOYEE_ID, COLLECTION_ID },
          tempRow
        ]
      }
      newData.splice(index + 1, 0, ...rowGrouper(child[tableRowId]))
      setChildData({...child})
      setRowsData([...newData])
      createSaveData(tempRow, 'I')
    } else  {
      const childIndex = child[parentRowId].findIndex(d => d.tableRowId === tableRowId)
      const oldGroup = rowGrouper(child[parentRowId] || [])
      child[parentRowId].splice(childIndex + 1, 0, tempRow)
      newData.splice(index + 1, oldGroup.length, ...rowGrouper(child[parentRowId]))
      setChildData({...child})
      setRowsData([...newData])
      createSaveData(tempRow, 'I')
    }
  }

  async function onCellMenuItemClick(type, row) {
    setSelectedRows([])
    const newData = [...rowsData]
    if (type === 'add-new-row') {
      const { isExpanded, tableRowId, COLLECTION_ID } = row
      const id = await getUniqueIdFromApi('/GetEmployeeInformationSequenceNumber', 'FUNDING_SOURCE_PERCENT_ID')
      const EMP_LEVEL_INFO_SR_NO = await getUniqueIdFromApi('/GetEmployeelevelInfoSeq', 'EMP_LEVEL_INFO_SRNO')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const childLength = isExpanded && childData[tableRowId] ? rowGrouper(childData[tableRowId]).length : 0
      const tempRow = {
        tableRowId: generateRandomString(), INFO_SR_NO: id, EMP_LEVEL_INFO_SR_NO, SUBCONTRACTOR_NAME: '', SUBCONTRACTOR_ID: '', COLLECTION_ID, SUBCONTRACTOR_NUMBER: '', SUBCONTRACTOR_EMPLOYEE_NAME: '', SUBCONTRACTOR_EMPLOYEE_ID: '', SUBCONTRACTOR_BILLING_TITLE: '', SUBCONTRACTOR_BILLING_TITLE_NAME: '', CLIENT_BILLING_TITLE: '', CLIENT_BILLING_TITLE_DESC: '', EXEMPT: '', EXEMPT_DISPLAY: '', level: 1, INNER_COUNT: 1
      }
      createSaveData(tempRow, 'I')
      newData.splice(index + childLength + 1, 0, tempRow)
      setRowsData(newData)
    } else if (type === 'add-row') {
      let child = {...childData}
      const { isExpanded, parentRowId, tableRowId, COLLECTION_ID, INFO_SR_NO, SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID, SUBCONTRACTOR_NUMBER, INNER_COUNT, ...rest } = row
      const id = await getUniqueIdFromApi('/GetEmployeeInformationSequenceNumber', 'FUNDING_SOURCE_PERCENT_ID')
      const EMP_LEVEL_INFO_SR_NO = await getUniqueIdFromApi('/GetEmployeelevelInfoSeq', 'EMP_LEVEL_INFO_SRNO')
      const tempRow = {
        tableRowId: generateRandomString(), parentRowId: (parentRowId || tableRowId), INFO_SR_NO: id, EMP_LEVEL_INFO_SR_NO, SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID, COLLECTION_ID, SUBCONTRACTOR_NUMBER, SUBCONTRACTOR_EMPLOYEE_NAME: '', SUBCONTRACTOR_EMPLOYEE_ID: '', SUBCONTRACTOR_BILLING_TITLE: '', SUBCONTRACTOR_BILLING_TITLE_NAME: '', CLIENT_BILLING_TITLE: '', CLIENT_BILLING_TITLE_DESC: '', EXEMPT: '', EXEMPT_DISPLAY: '', level: 2
      }
      if (row.level === 1) {
        const index = newData.findIndex(d => d.tableRowId === tableRowId)
        newData[index] = { tableRowId, level: 1, COLLECTION_ID, SUBCONTRACTOR_NAME, SUBCONTRACTOR_NUMBER, INNER_COUNT: INNER_COUNT + 1, isExpanded: true }
        child = {
          ...child,
          [tableRowId]: [
            { ...rest, tableRowId: generateRandomString(), parentRowId: tableRowId, level: 2, INFO_SR_NO, COLLECTION_ID, SUBCONTRACTOR_NAME, SUBCONTRACTOR_ID, SUBCONTRACTOR_NUMBER },
            tempRow
          ]
        }
        newData.splice(index + 1, 0, ...rowGrouper(child[tableRowId]))
      } else {
        const index = newData.findIndex(z => z.tableRowId === parentRowId)
        const childIndex = child[parentRowId].findIndex(z => z.tableRowId === tableRowId)
        const oldGroup = rowGrouper(child[parentRowId])
        child[parentRowId].splice(childIndex + 1, 0, tempRow)
        newData.splice(index + 1, oldGroup.length, ...rowGrouper(child[parentRowId]));
      }
      setChildData(child)
      setRowsData(newData)
      createSaveData(tempRow, 'I')
    } else if (type === 'add-sub-row') {
      addSubRows(row)
    }
  }

  async function onExpand (row) {
    const newRows = [...rowsData]
    const index = rowsData.findIndex(d => d.tableRowId === row.tableRowId)
    newRows[index] = { ...row, isExpanded: !row.isExpanded }
    let child = childData[row.tableRowId] || []
    if (!row.isExpanded) {
      if (child && child.length) {
        newRows.splice(index + 1, 0, ...rowGrouper(child));
      } else {
        const response = await apiCall({
          method: 'get',
          url: '/GetEmployeeInfoSubLevelData',
          params: {
            collectionId: collectionId,
            moduleId: props.moduleId || 22,
            subcontractorId: row.SUBCONTRACTOR_ID,
            orderBy: 1,
            pageIndex: 0,
            pageSize: 10000
          }
        })
        const res = response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: row.tableRowId, level: 2 }))
        child = res
        newRows.splice(index + 1, 0, ...rowGrouper(res));
        setChildData({
          ...childData,
          [row.tableRowId]: child
        })
      }
    } else {
      newRows.splice(index + 1, rowGrouper(child)?.length);
    }
    setRowsData([...newRows])
  }

  function rowKeyGetter(row) {
    return row.tableRowId;
  }

  function onSelectedRowsChange (checked, val, parentId, row) {
    const {levelId, EMP_LEVEL_INFO_SR_NO, level} = row
    if (checked) {
      let values = [val]
      if (parentId) {
        const child = rowGrouper(childData[parentId]) || []
        const selRows = [...selectedRows, val]
        if (level === 3) {
          if (child.filter(d => d.EMP_LEVEL_INFO_SR_NO === EMP_LEVEL_INFO_SR_NO && d.level === 3)?.map(d => d.tableRowId).every(d => selRows.includes(d))) {
            values = [...values, EMP_LEVEL_INFO_SR_NO]
          }
        }
        if (levelId) {
          const levelChild = child.filter(d => d.EMP_LEVEL_INFO_SR_NO === levelId)?.map(d => d.tableRowId)
          values = [...values, ...levelChild]
        }
        if (child?.map(d => d.tableRowId).every(d => [...selectedRows, ...values].includes(d))) {
          values = [...values, parentId]
        }
      } else if (childData[val]) {
        const child = rowGrouper(childData[val])?.map(d => d.tableRowId) || []
        values = [...values, ...child]
      } 
      setSelectedRows([...selectedRows, ...values].filter((v, i, a) => a.indexOf(v) === i))
    } else {
      let values = [val]
      if (parentId) {
        values = [...values, parentId]
        if (EMP_LEVEL_INFO_SR_NO && level === 3) {
          values = [...values, parentId, EMP_LEVEL_INFO_SR_NO]
        }
        if (levelId) {
          const child = rowGrouper(childData[parentId]).filter(d => d.EMP_LEVEL_INFO_SR_NO === levelId)?.map(d => d.tableRowId)
          values = [...values, ...child]
        }
      } else if (childData[val]) {
        const child = rowGrouper(childData[val])?.map(d => d.tableRowId) || []
        values = [...values, ...child]
      } 
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }
  
  const onCellBlur = (row, col) => {
    if (col === 'SUBCONTRACTOR_EMPLOYEE_NAME' || col === 'SUBCONTRACTOR_EMPLOYEE_ID') {
      if (row?.parentRowId && childData[row?.parentRowId] && row.levelId) {
        const newData = [...rowsData]
        const index = newData.findIndex(d => d.tableRowId === row.parentRowId)
        const child = [...(childData[row?.parentRowId] || [])]
        const newChild = []
        child.forEach(d => {
          if (!d.levelId && d.EMP_LEVEL_INFO_SR_NO === row.EMP_LEVEL_INFO_SR_NO) {
            newChild.push({
              ...d,
              [col]: row[col]
            })
            createSaveData({
              ...d,
              [col]: row[col]
            })
          } else {
            newChild.push(d)
          }
        })
        setTimeout(() => {
          const formNewRows = rowGrouper(newChild)
          newData.splice(index + 1, formNewRows.length, ...formNewRows);
          setChildData({
            ...childData,
            [row.parentRowId]: newChild
          })
          setRowsData(newData)
        }, 500)
      }
    }
  }

  const getChange = async (editedRow) => {
    createSaveData(editedRow)
    if (editedRow.parentRowId && childData[editedRow?.parentRowId]) {
      const child = {...childData}
      const index = child[editedRow.parentRowId].findIndex(d => d.tableRowId === editedRow.tableRowId)
      child[editedRow.parentRowId][index] = editedRow
      setChildData({...child})
    } 
  }

  const onSave = async () => {
    if (saveData.every(d => d.SUBCONTRACTOR_ID)) {
      const payload = formSaveData(saveData.filter(d => !d.levelId), props.udfRawData, props.moduleId || 22, collectionId)
      dispatch(backDropLoaderOpenAction())
      dispatch(saveEmployeeInfoTableAction(payload))
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
    setRowsData([])
    setSelectedRows([])
    dispatch(employeeInfoTableAction({
      collectionId,
      moduleId: props.moduleId || 22,
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
    const id = await getUniqueIdFromApi('/GetEmployeeInformationSequenceNumber', 'FUNDING_SOURCE_PERCENT_ID')
    const EMP_LEVEL_INFO_SR_NO = await getUniqueIdFromApi('/GetEmployeelevelInfoSeq', 'EMP_LEVEL_INFO_SRNO')
    const tempRow = {
      tableRowId: generateRandomString(), INFO_SR_NO: id, EMP_LEVEL_INFO_SR_NO, SUBCONTRACTOR_NAME: '', SUBCONTRACTOR_ID: '', COLLECTION_ID: collectionId, SUBCONTRACTOR_NUMBER: '', SUBCONTRACTOR_EMPLOYEE_NAME: '', SUBCONTRACTOR_EMPLOYEE_ID: '', SUBCONTRACTOR_BILLING_TITLE: '', SUBCONTRACTOR_BILLING_TITLE_NAME: '', CLIENT_BILLING_TITLE: '', CLIENT_BILLING_TITLE_DESC: '', EXEMPT: '', EXEMPT_DISPLAY: '', level: 1, INNER_COUNT: 1
    }
    createSaveData(tempRow, 'I')
    setRowsData([tempRow])
  }

  const onDelete = () => {
    const tempDeleteData = rowsData.filter(d => selectedRows.includes(d.tableRowId))
    const temp = saveData.filter(d => d.SAVE_MODE === 'I').map(d => d.tableRowId)
    const temp1 = tempDeleteData.filter(d => !((d.INNER_COUNT > 1 && d.level === 1) || d.levelId || temp.includes(d.tableRowId)))
    setDeleteModal(false)
    if (temp1.length) {
      dispatch(deleteEmployeeInfoAction({
        collectioN_ID: collectionId,
        subconData: [{
          "subcontractoR_ID": 0,
          "employeeData": temp1.map(z => ({
            infO_SR_NO: z.INFO_SR_NO
          }))
        }]
      }))
      dispatch(backDropLoaderOpenAction())
    } else {
      onRefresh()
    }
  }

  const renderNoData = () => (
    <NoDataFound>
      <Stack spacing={3} mt={2.5} alignItems="center" >
        <div>Oops! There  are no employee info yet! Please add Employee info. </div>
        <div>
          <Button size="small" variant="contained" color="secondary" onClick={onAddNewRow} >Add</Button>
        </div>
      </Stack>
    </NoDataFound>
  )

  const disabledRowSelection = rowsData.filter(d=>(d.INNER_COUNT > 1 && d.level === 1) && !childData[d.tableRowId]).map(d=>d.tableRowId)

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
          otherFunctions={{ onCellMenuItemClick, onExpand, getChange, onPoClick, selectedRows, onSelectedRowsChange, saveData, disabled: disabledRowSelection, onCellBlur  }}
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

export default memo(EmployeeInfo)
