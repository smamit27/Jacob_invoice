import { Button, FormControlLabel, Grid, Stack, Switch } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { groupBy, uniqBy } from 'lodash'
import { useDispatch, useSelector } from 'react-redux'
import { billingTitlesAndRatesTableAction, saveBillingTitlesAndRatesTableAction, saveBillingTitlesAndRatesTableResetAction, billingTitlesAndRatesTableFlagResetAction, deleteBillingTitlesAndRatesTableAction, deleteBillingTitlesAndRatesTableResetAction } from './logic'
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
import useLazyLoad from '../../../hooks/useLazyLoad'
import NoDataFound from '../../atoms/NoDataFound'
import ColumnFilter from '../../atoms/Filters'
import useColumns from '../../../hooks/useColumns'
import { errorStatusNotificationAction } from '../StatusNotification/logic'
import useErrorCell from '../../../hooks/useErrorCell'

const loadingTypes = {
  'add': "Adding new row's ",
  'loading': 'Loading more rows',
  'delete': "Deleting row's"
}

function BillingTitlesAndRates(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('billingTitlesAndRatesTable')
  const { flag: saveBillingTitlesAndRatesTableFlag, error: saveBillingTitlesAndRatesTableError } = useSelector(state => state.saveBillingTitlesAndRatesTable)
  const { data: currencyOptions } = useSelector(state => state.getCurrency)
  const collectionId = useSelector(state => state.getCollectionId)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteBillingTitlesAndRatesTable)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const {columnsData, headerColumns, filteredConfig, clearFilters, filterParams = {}, filtersData} = useColumns({ columns: formColumns.map(d => ({ ...d, ...(d.key === 'CURRENCY' ? { valueOptions: currencyOptions } : {}) })), handleFiltersChange })
  const [selectedRows, setSelectedRows] = useState([])
  const [oldRecords, setOldRecords] = useState('Y')
  const [openCopy, setOpenCopy] = useState(null)
  const [deleteModal, setDeleteModal] = useState(false)
  const [childData, setChildData] = useState({})
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const [onEdit, setOnEdit] = useState(false)
  const { handleErrorCell, errorCell, gridRef } = useErrorCell()
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      collectionID: collectionId,
      moduleId: props.moduleId || 10,
      isOld: oldRecords,
      orderBy: 1,
      ...filterParams
    },
    url: '/GetBillingHeaderData',
    rows: data,
    rowAdditionalData: {
      level: 1
    }
  })

  useEffect(() => {
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
      dispatch(billingTitlesAndRatesTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveBillingTitlesAndRatesTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveBillingTitlesAndRatesTableResetAction())
    }
  }, [saveBillingTitlesAndRatesTableError])

  useEffect(() => {
    if (saveBillingTitlesAndRatesTableFlag) {
      // setSaveData([])
      // prevSaveData.current = []
      // setSelectedRows([])
      // removeOldRecords()
      handleApiCall()
      dispatch(saveBillingTitlesAndRatesTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveBillingTitlesAndRatesTableFlag])

  useEffect(() => {
    if (deleteFlag) {
      handleApiCall()
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteBillingTitlesAndRatesTableResetAction())
    }
  }, [deleteFlag])

  useEffect(() => {
    if (deleteError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteBillingTitlesAndRatesTableResetAction())
    }
  }, [deleteError])

  // function removeOldRecords () {
  //   if (oldRecords !== 'Y') {
  //     const child = {}
  //     const newData = []
  //     const checkDate = (d) => {
  //       if (d.END_DATE) {
  //         const now = new Date()
  //         const old = new Date(d.END_DATE).getTime()
  //         const check = new Date(now.getFullYear(), now.getMonth(), now.getDate()).getTime()
  //         return check < old
  //       }
  //       return true
  //     }
  //     Object.keys(childData).forEach(z => {
  //       const filteredRows = childData[z]?.filter(d => checkDate(d)) || []
  //       child[z] = filteredRows
  //     })
  //     rowsData.filter(d => d.level === 1).forEach(d => {
  //       if (d.FLAG_IS === 'Y') {
  //         if (child[d.tableRowId]?.length > 1) {
  //           newData.push(...child[d.tableRowId])
  //         } else if (child[d.tableRowId]?.length === 1) {
  //           newData.push(...child[d.tableRowId].map(({ parentId, ...m }) => ({ ...m, level: 1, FLAG_IS: 'N' })))
  //           delete child[d.tableRowId]
  //         } else {
  //           delete child[d.tableRowId]
  //         }
  //       } else {
  //         if (checkDate(d)) {
  //           newData.push(d)
  //         }
  //       }
  //     })
  //     setChildData(child)
  //     setRowsData(newData)
  //   }
  // }

  function handleApiCall () {
    setSaveData([])
    prevSaveData.current = []
    resetFrom()
    setSelectedRows([])
    setChildData({})
    dispatch(billingTitlesAndRatesTableAction({
      collectionID: collectionId,
      moduleId: props.moduleId || 10,
      isOld: oldRecords,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
      ...filterParams
    }))
  }
  function handleFiltersChange () {
    handleApiCall()
  }

  function onEditStart () {
    setOnEdit(true)
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

  const addUDF = () => {
    const newUdf = {}
    props?.udfGridColumns?.forEach(d => {
      newUdf[d.key] = null
    })
    return newUdf
  }

  async function onCellMenuItemClick(type, row) {
    const { tableRowId, isExpanded, COLLECTION_ID } = row
    const udf = addUDF()
    if (type === 'add-row') {
      const newData = [...rowsData]
      const id = await getUniqueIdFromApi('/GetBillingSeq', 'BTR_ID')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const childLength = isExpanded && childData[tableRowId] ? childData[tableRowId].length : 0
      const tempRow = {
        tableRowId: generateRandomString(), BTR_ID1: id, COLLECTION_ID, BILLING_TITLE_CODE: '', BILLING_TITLE_DESC: '', CURRENCY: '', CLIENT_BILLING_RATE: '', CAPPED_RATE: '', MINIMUM_RATE: '', EFFECTIVE_DATE: null, END_DATE: null, FLAG_IS: 'N', level: 1, ...udf
      }
      createSaveData(tempRow, 'I')
      newData.splice(index + childLength + 1, 0, tempRow)
      setRowsData(newData)
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
          url: '/GetBillingSubLevelData',
          params: {
            collectionID: collectionId,
            moduleId: props.moduleId || 10,
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
  
  const onCellBlur = async (editedRow, key, prev) => {
    let changed = false
    let updatedRow = {
      ...editedRow
    }
    setTimeout(async () => {
      const newData = [...rowsData]
      const index = newData.findIndex(d  => d.tableRowId === editedRow.tableRowId)
      const colIndex = columnsData.findIndex(d => d.key === key)
      // const colName = columnsData[colIndex].name || ''
      if (key === 'BILLING_TITLE_CODE' && updatedRow?.BILLING_TITLE_CODE?.trim() && prev !== updatedRow?.BILLING_TITLE_CODE?.trim()) {
        const check = saveData.filter(d => d.tableRowId !== updatedRow.tableRowId && d?.BILLING_TITLE_CODE?.trim()).map(d => d[key]) || []
        let err = false
        if (check.includes(updatedRow[key])) {
          dispatch(errorStatusNotificationAction({
            type: 'billing-title-cde',
            message: `Billing Title Code (${updatedRow[key]}) already belongs to current Collection`
          }))
          err = true
        } else {
          try {
            const [res] = await apiCall({
              method: 'get',
              url: '/ValidateBillingTitleCode',
              params: { CollectionID: collectionId, BillingTitleCode: updatedRow[key], ...(saveData.some(d => d.tableRowId === updatedRow.tableRowId && d.SAVE_MODE === 'I') ? {} : { BtrID: updatedRow.BTR_ID1 }) }
            })
            if (res && res.FINAL_STATUS === 'FAILED') {
              dispatch(errorStatusNotificationAction({
                type: 'subconid',
                message: res.ERROR_OUT_MSG
              }))
              err = true
            }
          } catch (error) {
            dispatch(errorStatusNotificationAction({
              type: 'subconid',
              message: error.message
            }))
            err = true
          }
        }
        if (err) {
          updatedRow = {
            ...editedRow,
            [key]: prev || '',
          }
          newData[index] = updatedRow
          errorCell.current = {
            rowIndex: index,
            colIndex
          }
          changed = true
        }
      }
      if (changed) {
        createSaveData(updatedRow)
        setRowsData(newData)
        if (updatedRow.parentRowId && childData[updatedRow?.parentRowId]) {
          const child = {...childData}
          const index = child[updatedRow.parentRowId].findIndex(d => d.tableRowId === updatedRow.tableRowId)
          child[updatedRow.parentRowId][index] = updatedRow
          setChildData({...child})
        }
      }
      setOnEdit(false)
    }, 300)
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
      const index = newData.findIndex(d  => d.tableRowId === editedRow.tableRowId)
      if (key === 'EFFECTIVE_DATE' || key === 'END_DATE') {
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
    if (updatedRow.parentRowId && childData[updatedRow?.parentRowId]) {
      const child = {...childData}
      const index = child[updatedRow.parentRowId].findIndex(d => d.tableRowId === updatedRow.tableRowId)
      child[updatedRow.parentRowId][index] = updatedRow
      setChildData({...child})
    }
  }

  const onSave = async () => {
    const err = validateData(saveData)
    if (!err) {
      const payload = formSaveData(saveData, props.udfRawData, props.moduleId || 10, collectionId)
      dispatch(backDropLoaderOpenAction())
      dispatch(saveBillingTitlesAndRatesTableAction(payload))
    } else {
      const row = err?.value
      const colIndex = columnsData.findIndex(d => d.key === err?.message)
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
    }

        
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
        const { tableRowId, level, BILLING_TITLE_CODE, ROW_NUM, ...rest } = tempRow
        if (tempRow.FLAG_IS === 'N') {
          newRows[index] = {
            tableRowId,
            level,
            BILLING_TITLE_CODE,
            FLAG_IS: 'Y',
            isExpanded: true
          }
          child = {
            ...child,
            [tableRowId]: [
              { ...rest, tableRowId: generateRandomString(), parentRowId: tableRowId, level: 2, BILLING_TITLE_CODE, ...addUDF() },
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
      dispatch(deleteBillingTitlesAndRatesTableAction({
        BTR_ID: temp1.map(z => z.BTR_ID1).join(', ')
      }))
      dispatch(backDropLoaderOpenAction())
    } else {
      handleApiCall()
    }
  }
  
  const onRowsChange = (newRows) => {
    setRowsData(newRows)
  }
  
  const onAddNewRow = async () => {
    const id = await getUniqueIdFromApi('/GetBillingSeq', 'BTR_ID')
    const tempRow = {
      tableRowId: generateRandomString(), BTR_ID1: id, COLLECTION_ID: collectionId, BILLING_TITLE_CODE: '', BILLING_TITLE_DESC: '', CURRENCY: '', CLIENT_BILLING_RATE: '', CAPPED_RATE: '', MINIMUM_RATE: '', EFFECTIVE_DATE: null, END_DATE: null, FLAG_IS: 'N', level: 1, ...addUDF()
    }
    createSaveData(tempRow, 'I')
    setRowsData([tempRow])
  }
  
  const renderCopy = () => {
    return <CopyEntries onCopyApply={onCopyApply} open={!!openCopy} onClose={() => setOpenCopy(null)} modalData={openCopy} />
  }
  const disabledRowSelection = rowsData.filter(d=>(d.FLAG_IS === 'Y' && d.level === 1) && !childData[d.tableRowId]).map(d=>d.tableRowId)

  const renderNoData = () => (
    <NoDataFound>
      <Stack spacing={3} mt={2.5} alignItems="center" >
        <div>Oops! There  are no billing options currently! Please add Billing entries.</div>
        <div>
          <Button size="small" onClick={onAddNewRow} variant="contained" color="secondary" >Add Entry</Button>
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
            <Button disabled={!selectedRows.length} variant="contained" color="secondary"className="Udf_buttons" onClick={onCopy} >Copy Entries</Button>
            <Button disabled={!selectedRows.length} variant="contained" color="secondary" onClick={() => setDeleteModal(true)} >Delete</Button>
            <Button variant="contained" disabled={!saveData?.length || onEdit} className="Udf_buttons" onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid
          ref={gridRef}
          onScroll={handleScroll} 
          otherFunctions={{ onCellMenuItemClick, onEditStart, onExpand, getEnterChange, getChange, selectedRows, onSelectedRowsChange, disabled: disabledRowSelection, onCellBlur }}
          rowHeight={40}
          headerRowHeight={60}
          noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataComponent={renderNoData} style={{ height: '45vh', position: 'sticky', left: 0 }} />}
          onRowsChange={onRowsChange}
          style={{ height: '60vh' }}
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
      {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}
    </div>
  )
}

export default memo(BillingTitlesAndRates)
