import { Button, Grid, Stack, FormControlLabel, Switch } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { uniqBy } from 'lodash'
import {
  employeeOverrideTableAction, saveEmployeeOverrideTableAction, saveEmployeeOverrideTableResetAction,
  employeeOverrideTableFlagResetAction, employeeOverrideBillingTitleDropdownFlagResetAction, employeeOverrideBillingTitleDropdownAction,
  employeeOverrideLevelDropdownFlagResetAction, employeeOverrideLevelDropdownAction, deleteEmployeeOverrideTableAction, deleteEmployeeOverrideTableResetAction
} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import {columns, formSaveData, validateData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import AlertModal from '../Modal/AlertModal'
import CopyEntries from './CopyEntries'
import { generateRandomString } from '../../../helpers';
import NoDataFound from '../../atoms/NoDataFound'
import {showSearchModal} from "../../../redux/common/action";
import { SearchModal } from "../Modal";
import useLazyLoad from '../../../hooks/useLazyLoad'
import AddEmployee from './AddEmployee'
import ColumnFilter from '../../atoms/Filters'
import useColumns from '../../../hooks/useColumns'
import { errorStatusNotificationAction } from '../StatusNotification/logic'
import useErrorCell from '../../../hooks/useErrorCell'

const loadingTypes = {
  'add': "Adding new row's ",
  'loading': 'Loading more rows',
  'delete': "Deleting row's"
}

function EmployeeOverride(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('employeeOverrideTable')
  const { flag: saveEmployeeOverrideTableFlag, error: saveEmployeeOverrideTableError } = useSelector(state => state.saveEmployeeOverrideTable)
  const { data: currencyOptions } = useSelector(state => state.getCurrency)
  const { data: titleOptions, flag: titleOptionsFlag } = useSelector(state => state.employeeOverrideBillingTitleDropdown)
  const { data: levelOptions, flag: levelOptionsFlag } = useSelector(state => state.employeeOverrideLevelDropdown)
  const collectionId = useSelector(state => state.getCollectionId)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteEmployeeOverrideTable)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const {columnsData, setColumnsData, headerColumns, filteredConfig, clearFilters, filterParams = {}, filtersData} = useColumns({ columns: formColumns.map(d => ({ ...d, ...(d.key === 'CURRENCY' ? { valueOptions: currencyOptions } : {}) })), handleFiltersChange })
  const [selectedRows, setSelectedRows] = useState([])
  const [oldRecords, setOldRecords] = useState('Y')
  const [openCopy, setOpenCopy] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [childData, setChildData] = useState({})
  const [openAddEmployee, setOpenAddEmployee] = useState(false)
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const { handleErrorCell, errorCell, gridRef } = useErrorCell()
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      collectionID: collectionId,
      moduleId: props.moduleId || 11,
      isOld: 'Y',
      orderBy: 1,
      ...filterParams
    },
    url: '/GetEmployeeOverrideHeaderData',
    rows: data,
    rowAdditionalData: {
      level: 1
    }
  })

  useEffect(() => {
    dispatch(employeeOverrideBillingTitleDropdownAction({
      collectionId
    }))
    dispatch(employeeOverrideLevelDropdownAction())
    handleApiCall()
  }, [oldRecords])

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
      dispatch(employeeOverrideTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (titleOptionsFlag) {
      setColumnsData(columnsData.map((d) => {
        if (d.key === 'BILLING_TITLE_CODE') {
          return ({
            ...d,
            valueOptions: titleOptions.map(d => d.description)
          })
        }
        return d
      }))
      dispatch(employeeOverrideBillingTitleDropdownFlagResetAction())
    }
  }, [titleOptionsFlag])

  useEffect(() => {
    if (levelOptionsFlag) {
      setColumnsData(columnsData.map((d) => {
        if (d.key === 'LEVEL') {
          return ({
            ...d,
            valueOptions: levelOptions.map(d => d.description)
          })
        }
        return d
      }))
      dispatch(employeeOverrideLevelDropdownFlagResetAction())
    }
  }, [levelOptionsFlag])

  useEffect(() => {
    if (saveEmployeeOverrideTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveEmployeeOverrideTableResetAction())
    }
  }, [saveEmployeeOverrideTableError])

  useEffect(() => {
    if (saveEmployeeOverrideTableFlag) {
      // prevSaveData.current = []
      // setSaveData([])
      handleApiCall()
      dispatch(saveEmployeeOverrideTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveEmployeeOverrideTableFlag])

  useEffect(() => {
    if (deleteFlag) {
      handleApiCall()
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteEmployeeOverrideTableResetAction())
    }
  }, [deleteFlag])

  useEffect(() => {
    if (deleteError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteEmployeeOverrideTableResetAction())
    }
  }, [deleteError])

  function handleApiCall () {
    setSaveData([])
    prevSaveData.current = []
    resetFrom()
    setChildData({})
    setSelectedRows([])
    dispatch(employeeOverrideTableAction({
      collectionID: collectionId,
      moduleId: props.moduleId || 11,
      isOld: 'Y',
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
      ...filterParams
    }))
  }
  function handleFiltersChange () {
    handleApiCall()
  }

  function getAllRows () {
    let tempRows = [];
    Object.keys(childData).forEach((d)=>{
      tempRows =  [...tempRows,...childData[d]]

    })
    tempRows = uniqBy([...rowsData,...tempRows],'tableRowId')
    return tempRows || []
  }

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

  async function defaultLevel () {
    const [levelData = {}] = levelOptions
    let levelNameData = {}
    if (levelData?.id) {
      [levelNameData = {}] = await apiCall({
        method: 'get',
        url: '/GetBillingLevelName',
        params: { collectionId: collectionId, seqNum: levelData?.id }
      })
    }
    return { LEVEL: levelData?.description, LEVEL_ID: levelData?.id, LEVEL_NAME_ID: (levelNameData?.COLLECTION_ID || levelNameData?.GROUP_ID || levelNameData?.PROJECT_ID || levelNameData?.TASK_GROUP_ID || levelNameData?.TASK_ID || 0), LEVEL_NAME: (levelNameData?.COLLECTION_NAME || levelNameData?.GROUP_NAME || levelNameData?.PROJECT_NAME || levelNameData?.TASK_GROUP_NAME || levelNameData?.TASK_NAME_OVERRIDE || '') }
  }

  const addUDF = () => {
    const newUdf = {}
    props?.udfGridColumns?.forEach(d => {
      newUdf[d.key] = null
    })
    return newUdf
  }

  async function onCellMenuItemClick(type, row) {
    const { tableRowId, parentRowId, EOR_ID1, COLLECTION_ID, EMPLOYEE_NAME, EMPLOYEE_RAW_RATE, EMPLOYEE_ID, EMPLOYEE_NUMBER, FLAG_IS, ...rest } = row
    if (type === 'add-row') {
      const newData = [...rowsData]
      let child = {...childData}
      const id = await getUniqueIdFromApi('/GetEmployeeOverrideSeq', 'EOR_ID')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const tempRow = {
        tableRowId: generateRandomString(), parentRowId: (parentRowId || tableRowId), EMPLOYEE_ID, EMPLOYEE_NUMBER, EOR_ID1: id, EMPLOYEE_NAME, COLLECTION_ID, BILLING_TITLE_CODE: '', BILLING_TITLE_DESC: '', CURRENCY: '', CLIENT_BILLING_RATE: '', CAPPED_RATE: '', MINIMUM_RATE: '', EFFECTIVE_DATE: null, END_DATE: null, level: 2, EMPLOYEE_RAW_RATE, LEVEL: '', LEVEL_NAME: '', LEVEL_ID: 0, LEVEL_NAME_ID: 0, BILLING_TITLE_CODE_BTR_ID: 0, ...addUDF()
      }
      if (FLAG_IS === 'N') {
        newData[index] = {
          tableRowId,
          level: 1,
          EMPLOYEE_NAME,
          FLAG_IS: 'Y',
          isExpanded: true
        }
        child = {
          ...child,
          [tableRowId]: [
            { ...rest, tableRowId: generateRandomString(), parentRowId: tableRowId, level: 2, EOR_ID1, EMPLOYEE_NAME, EMPLOYEE_RAW_RATE, EMPLOYEE_ID, EMPLOYEE_NUMBER },
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
          url: '/GetEmployeeOverrideSubLevelData',
          params: {
            collectionID: collectionId,
            moduleId: props.moduleId || 11,
            employeeName: row.EMPLOYEE_NAME,
            isOld: oldRecords,
            orderBy: 1,
            billingTitleCode: row.BILLING_TITLE_CODE,
            ...filterParams
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

  const getEnterChange = (editedRow) => {
    let updatedRow = {
      ...editedRow
    }
    const newData = [...rowsData]
    const index = newData.findIndex(d  => d.tableRowId === editedRow.tableRowId)
    if (updatedRow.parentRowId && childData[updatedRow?.parentRowId]) {
      const child = {...childData}
      const index = child[updatedRow.parentRowId].findIndex(d => d.tableRowId === updatedRow.tableRowId)
      child[updatedRow.parentRowId][index] = updatedRow
      setChildData({...child})
    }
    newData[index] = updatedRow
    setRowsData(newData)
    createSaveData(updatedRow)
  }
  
  const getChange = async (editedRow, key) => {
    let updatedRow = {
      ...editedRow
    }
    try {
      const newData = [...rowsData]
      const index = newData.findIndex(d  => d.tableRowId === updatedRow.tableRowId)
      if (key === 'BILLING_TITLE_CODE') {
        const [res] = await apiCall({
          method: 'get',
          url: '/GetBillingTitleRateDetails',
          params: { collectionId, billintTitleCode: updatedRow.BILLING_TITLE_CODE }
        })
        updatedRow = {
          ...editedRow,
          BILLING_TITLE_CODE_BTR_ID: titleOptions.find(d => d.description === updatedRow[key])?.id || 0,
          ...res
        }
        newData[index] = updatedRow
        setRowsData(newData)
        createSaveData(updatedRow)
      } else if (key === 'LEVEL'){
        updatedRow = {
          ...editedRow,
          LEVEL_NAME: null,
          LEVEL_ID: levelOptions.find(d => d.description === updatedRow.LEVEL)?.id || 0,
          LEVEL_NAME_ID: 0
        }
        newData[index] = updatedRow
        setRowsData(newData)
        createSaveData(updatedRow)
      } else if (key === 'EFFECTIVE_DATE' || key === 'END_DATE') {
        if (updatedRow.level === 2) {
          const allChildRows = getAllRows()?.filter(d => d.parentRowId === updatedRow.parentRowId && d.tableRowId !== updatedRow.tableRowId)
          const isOverlap = allChildRows.filter(d => {
            const oldStart = new Date(d.EFFECTIVE_DATE).getTime()
            const oldEnd = new Date(d.END_DATE).getTime()
            const newStart = new Date(updatedRow.EFFECTIVE_DATE).getTime()
            const newEnd = new Date(updatedRow.END_DATE).getTime()
            if (oldStart && oldEnd && updatedRow.EFFECTIVE_DATE && updatedRow.END_DATE) {
              return oldStart <= newEnd && newStart <= oldEnd
            } else if (oldStart && oldEnd && updatedRow.EFFECTIVE_DATE) {
              return oldStart <= newStart && newStart <= oldEnd
            } else if (updatedRow.EFFECTIVE_DATE) {
              return (oldStart === newStart)
            }
            if (!oldEnd) {
              return false
            }
            return (newEnd === oldEnd)
          })
          if (isOverlap.length) {
            const colIndex = columnsData.findIndex(d => d.key === key)
            const colName = columnsData[colIndex].name || ''
            updatedRow = {
              ...editedRow,
              END_DATE: '',
              ...(key === 'EFFECTIVE_DATE' ? { EFFECTIVE_DATE: '' } : {})
            }
            newData[index] = updatedRow
            errorCell.current = {
              rowIndex: index,
              colIndex
            }
            createSaveData(updatedRow)
            setRowsData(newData)
            dispatch(errorStatusNotificationAction({
              message: `The ${colName} should not overlap with the dates in between same Billing Title Code rows. Please review the ${colName} and make correction.`,
              type: 'uni-entries'
            }))
            return 
          }
        }
        if (key === 'EFFECTIVE_DATE') {
          updatedRow = {
            ...editedRow,
            END_DATE: ''
          }
          newData[index] = updatedRow
          setRowsData(newData)
        }
      }
    } catch (error) {
    }
    createSaveData(updatedRow)
    if (editedRow.parentRowId && childData[editedRow?.parentRowId]) {
      const child = {...childData}
      const index = child[editedRow.parentRowId].findIndex(d => d.tableRowId === editedRow.tableRowId)
      child[editedRow.parentRowId][index] = updatedRow
      setChildData({...child})
    }
  }

  const onSave = async () => {
    validateData.validate(saveData)
      .then(() => {
        const payload = formSaveData(saveData, props.udfRawData, props.moduleId || 11, collectionId)
        dispatch(backDropLoaderOpenAction())
        dispatch(saveEmployeeOverrideTableAction(payload))
      })
      .catch(err => {
        const [row = {}] = err.value
        const colIndex = columnsData.findIndex(d => d.key === err.message)
        const colName = columnsData[colIndex].name || ''
        const newData = [...rowsData]
        const checkTemp = () => {
          const rowIndex = newData.findIndex(d => d.tableRowId === row.tableRowId)
          errorCell.current = {
            rowIndex,
            colIndex
          }
          setTimeout(() => {
            handleErrorCell()
          }, 300)
        }
        if (row.parentRowId) {
          const index = newData.findIndex(d => d.tableRowId === row.parentRowId)
          const child = childData[row.parentRowId]
          if (!newData[index]?.isExpanded) {
            newData.splice(index + 1, 0, ...child)
            newData[index].isExpanded = true
            const rowIndex = newData.findIndex(d => d.tableRowId === row.tableRowId)
            errorCell.current = {
              rowIndex,
              colIndex
            }
            setRowsData(newData)
          } else {
            checkTemp()
          }
        } else {
          checkTemp()
        }
        dispatch(errorStatusNotificationAction({
          message: `${colName} is required field.`,
          type: 'billing_titles_save'
        }))
      })
  }

  const onCopy = () => {
    const modalData = selectedRows.map(d => getAllRows().find(m => m.tableRowId === d))
    const uni = uniqBy(modalData, 'BILLING_TITLE_CODE')
    if (uni.length !== modalData.length) {
      dispatch(errorStatusNotificationAction({
        type: 'date-error',
        message: "Only one entry could be selected within a Billing Code to copy. Please review the selected record's and make corrections."
      }))
    } else if (modalData.some(d => (!d.EFFECTIVE_DATE))) {
      dispatch(errorStatusNotificationAction({
        type: 'date-error',
        message: "Effective Date is not filled in the selected record's. Please fill the field or deselect the record's where field is not filled."
      }))
    } else {
      const getAllParentRowIds = uniqBy(uni, 'parentRowId').map(d => d.parentRowId)
      const temp = [].concat.apply([], [...modalData, ...getAllParentRowIds.map(d => (childData[d] || []))])
      setOpenCopy({
        selected: modalData,
        all: uniqBy(temp, 'tableRowId')
      })
    }
  }

  const onClear = () => {
    clearFilters()
  }

  const onCopyApply = (copyRows) => {
    const newRows = [...rowsData]
    let child = {...childData}
    copyRows.forEach(d => {
      const index = newRows.findIndex(z => z.tableRowId === d.parentRowId)
      if (index !== -1) {
        const tempRow = newRows[index]
        const { tableRowId, level, EMPLOYEE_NAME, ROW_NUM, ...rest } = tempRow
        if (tempRow.FLAG_IS === 'N') {
          newRows[index] = {
            tableRowId,
            level,
            EMPLOYEE_NAME,
            FLAG_IS: 'Y',
            isExpanded: true
          }
          child = {
            ...child,
            [tableRowId]: [
              { ...rest, tableRowId: generateRandomString(), parentRowId: tableRowId, level: 2, EMPLOYEE_NAME, ...addUDF() },
              d
            ]
          }
          newRows.splice(index + 1, 0, ...child[d.parentRowId]);
        } else {
          const index = newRows.findIndex(z => z.tableRowId === d.parentRowId)
          child = {
            ...child,
            [d.parentRowId]: [
              ...child[d.parentRowId],
              d
            ]
          }
          newRows.splice(index + 1, child[d.parentRowId].length - 1, ...child[d.parentRowId]);
        }
        createSaveData(d, 'I')
      }
    });
    setChildData(child)
    setRowsData(newRows)
    setSelectedRows([])
    setOpenCopy(null)
  }

  const onDelete = () => {
    const tempDeleteData = getAllRows().filter(d => selectedRows.includes(d.tableRowId))
    const temp = saveData.filter(d => d.SAVE_MODE === 'I').map(d => d.tableRowId)
    const temp1 = tempDeleteData.filter(d => !((d.FLAG_IS === 'Y' && d.level === 1) || temp.includes(d.tableRowId)))
    setDeleteModal(false)
    if (temp1.length) {
      dispatch(deleteEmployeeOverrideTableAction({
        EOR_ID: temp1.map(z => z.EOR_ID1).join(', ')
      }))
      dispatch(backDropLoaderOpenAction())
    } else {
      handleApiCall()
    }
  }

  
  const onRowsChange = (newRows, ...args) => {
    setRowsData(newRows)
  }
  
  const onAddEmployee = () => {
    dispatch(showSearchModal("projectmanager"));
    setOpenAddEmployee(true)
  }
  
  const onSaveEmployee = async (rows) => {
    const levelData = await defaultLevel()
    Promise.all(rows.map(() => getUniqueIdFromApi('/GetEmployeeOverrideSeq', 'EOR_ID'))).then((values) => {
      const newRows = rows.map(({ EMPLOYEE_NAME, EMPLOYEE_NUMBER, EMPLOYEE_ID }, i) => {
        const tempRow = {
          EOR_ID1: values[i],
          EMPLOYEE_NAME,
          tableRowId: generateRandomString(), EMPLOYEE_NUMBER, EMPLOYEE_ID: EMPLOYEE_ID, COLLECTION_ID: collectionId, BILLING_TITLE_CODE: '', BILLING_TITLE_DESC: '', CURRENCY: '', CLIENT_BILLING_RATE: '', CAPPED_RATE: '', MINIMUM_RATE: '', EFFECTIVE_DATE: null, END_DATE: null, level: 1, EMPLOYEE_RAW_RATE: '', BILLING_TITLE_CODE_BTR_ID: 0, FLAG_IS: 'N', ...(levelData || {}), ...addUDF()
        }
        createSaveData(tempRow, 'I')
        return tempRow
      })
      setRowsData([...newRows, ...rowsData])
    }).catch(() => {
      
    })
  }
  
  const disabledRowSelection = rowsData.filter(d=>(d.FLAG_IS === 'Y' && d.level === 1) && !childData[d.tableRowId]).map(d=>d.tableRowId)

  const renderCopy = () => {
    return <CopyEntries onCopyApply={onCopyApply} open={!!openCopy} onClose={() => setOpenCopy(null)} modalData={openCopy} />
  }

  const renderNoData = () => (
    <NoDataFound>
      <Stack spacing={3} mt={2} alignItems="center" >
        <div>Oops! There  are no employee overrides yet! Please add Employee Overrides. </div>
        <div>
          <Button onClick={onAddEmployee} size="small" variant="contained" color="secondary" >Add employee(s)</Button>
        </div>
      </Stack>
    </NoDataFound>
  )

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
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <FormControlLabel
              value={oldRecords}
              control={<Switch checked={oldRecords === 'Y' || false} onChange={e => setOldRecords(e.target.checked ? 'Y' : 'N')} />}
              label="Old records"
              labelPlacement="start"
            />
            <Button onClick={onAddEmployee} size="small" variant="contained" color="secondary" >Add employee(s)</Button>
            <Button disabled={!selectedRows.length} variant="contained" color="secondary" onClick={onCopy} >Copy Entries</Button>
            <Button disabled={!selectedRows.length} variant="contained" color="secondary" onClick={() => setDeleteModal(true)} >Delete</Button>
            <Button variant="contained" disabled={!saveData?.length} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid
          ref={gridRef}
          onScroll={handleScroll}
          otherFunctions={{ onCellMenuItemClick, onExpand, getEnterChange, getChange, selectedRows, onSelectedRowsChange, disabled: disabledRowSelection }}
          rowHeight={40}
          headerRowHeight={60}
          noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataComponent={renderNoData} style={{ height: '45vh', position: 'sticky', left: 0 }} />}
          onRowsChange={onRowsChange}
          style={{height: '60vh' }} 
          rowKeyGetter={rowKeyGetter}
          columns={headerColumns}
          rows={!loading ? rowsData : []}
        />
      </Stack>
      {deleteModal && (
        <AlertModal title="Delete selected user record's" open={deleteModal} onConfirm={onDelete} onClose={() => setDeleteModal(false)} >
          Are you sure that you want delete the selected record's and all the unsaved changes will be reverted ?
        </AlertModal>
      )}
      {!!openCopy && renderCopy()}
      {openAddEmployee && <AddEmployee saveData={saveData} open={openAddEmployee} onSave={onSaveEmployee} onClose={() => setOpenAddEmployee(false)} />}
      {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}
    </div>
  )
}

export default memo(EmployeeOverride)
