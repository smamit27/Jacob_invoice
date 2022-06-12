import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import {
  travelTableAction, saveTravelTableAction, saveTravelTableResetAction, travelTableFlagResetAction, deleteTravelTableResetAction, deleteTravelTableAction
} from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import DataGrid from 'react-data-grid'
import {columns, formSaveData, validateData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import { Loader } from '../../atoms'
import { generateRandomString } from '../../../helpers';
import NoDataFound from '../../atoms/NoDataFound'
import useLazyLoad from '../../../hooks/useLazyLoad'
import { errorStatusNotificationAction } from '../StatusNotification/logic'
import useErrorCell from '../../../hooks/useErrorCell'
import AlertModal from '../Modal/AlertModal'

const loadingTypes = {
  'add': "Adding new row's ",
  'loading': 'Loading more rows',
  'delete': "Deleting row's"
}

function Travel(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('travelTable')
  const { flag: saveTravelTableFlag, error: saveTravelTableError } = useSelector(state => state.saveTravelTable)
  const { data: currencyOptions } = useSelector(state => state.getCurrency)
  const { flag: deleteFlag, error: deleteError } = useSelector(state => state.deleteTravelTable)
  const collectionId = useSelector(state => state.getCollectionId)
  const formColumns = [...columns, ...(props?.udfGridColumns || [])]
  const [columnsData] = useState(formColumns.map(d => ({ ...d, ...(d.key === 'CURRENCY' ? { valueOptions: currencyOptions } : {}) })))
  const [selectedRows, setSelectedRows] = useState([])
  const [saveData, setSaveData] = useState([])
  const [deleteModal, setDeleteModal] = useState(false)
  const [onEdit, setOnEdit] = useState(false)
  const { handleErrorCell, errorCell, gridRef } = useErrorCell()
  const prevSaveData = useRef([])
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: {
      collectionId,
      moduleId: props.moduleId || 24,
      orderBy: 1,
    },
    url: '/GetTravelDetails',
    rows: data,
    rowAdditionalData: {
      level: 1
    }
  })

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
      dispatch(travelTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveTravelTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveTravelTableResetAction())
    }
  }, [saveTravelTableError])

  useEffect(() => {
    if (saveTravelTableFlag) {
      prevSaveData.current = []
      setSaveData([])
      dispatch(saveTravelTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveTravelTableFlag])

  useEffect(() => {
    if (deleteFlag) {
      handleApiCall()
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteTravelTableResetAction())
    }
  }, [deleteFlag])

  useEffect(() => {
    if (deleteError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(deleteTravelTableResetAction())
    }
  }, [deleteError])

  function handleApiCall () {
    setSaveData([])
    prevSaveData.current = []
    resetFrom()
    setSelectedRows([])
    dispatch(travelTableAction({
      collectionId,
      moduleId: props.moduleId || 24,
      orderBy: 1,
      pageIndex: 0,
      pageSize: 20,
    }))
  }

  function onEditStart () {
    setOnEdit(true)
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

  async function onCellMenuItemClick(type, row) {
    
    const { tableRowId, COLLECTION_ID } = row
    if (type === 'add-row') {
      const newData = [...rowsData]
      const id = await getUniqueIdFromApi('/GetTravelSequence', 'TRAVEL_ID')
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      const tempRow = {
        tableRowId: generateRandomString(), TRAVEL_ID: id, COLLECTION_ID, TRIP_NUMBER: "", EMPLOYEE_ID: null, EMPLOYEE_NAME: "", EMPLOYEE_NUMBER: "", FROM_DESTINATION: "", TO_DESTINATION: "", FROM_DATE: "", TO_DATE: "", TRAVEL_PURPOSE: "", 
      }
      createSaveData(tempRow, 'I')
      newData.splice(index + 1, 0, tempRow)
      setRowsData(newData)
    }
  }

  function rowKeyGetter(row) {
    return row.tableRowId;
  }

  function onSelectedRowsChange (checked, val) {
    if (checked) {
      const values = [val]
      setSelectedRows([...selectedRows, ...values])
    } else {
      const values = [val]
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }
  
  const getChange = async (editedRow, key) => {
    let updatedRow = {
      ...editedRow
    }
    try {
      const newData = [...rowsData]
      const index = newData.findIndex(d  => d.tableRowId === editedRow.tableRowId)
      if (key === 'FROM_DATE') {
        updatedRow = {
          ...editedRow,
          TO_DATE: ''
        }
        newData[index] = updatedRow
        setRowsData(newData)
      }
    } catch (error) {
      
    }
    createSaveData(updatedRow)
  }

  const onSave = async () => {
    const err = validateData(saveData)
    if (!err) {
      const payload = formSaveData(saveData, props.udfRawData, props.moduleId || 24, collectionId)
      dispatch(backDropLoaderOpenAction())
      dispatch(saveTravelTableAction(payload, { CollectionID: collectionId }))
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
      checkTemp()
      dispatch(errorStatusNotificationAction({
        message: `${colName} is required field.`,
        type: 'TRAVEL_SAVE'
      }))
    }   
  }

  const onDelete = () => {
    const tempDeleteData = [...rowsData].filter(d => selectedRows.includes(d.tableRowId))
    const temp = saveData.filter(d => d.SAVE_MODE === 'I').map(d => d.tableRowId)
    const oldRows = tempDeleteData.filter(d => !(temp.includes(d.tableRowId)))
    if (oldRows?.length) {
      dispatch(backDropLoaderOpenAction())
      dispatch(deleteTravelTableAction({
        data: {
          "deleteTripList": oldRows.map(d => ({ deleteTripId: d.TRAVEL_ID }))
        },
        params: {
          collectionId
        }
      }))
    } else {
      handleApiCall()
    }
    setDeleteModal(false)
  }

  const onRowsChange = (newRows, ...args) => {
    
    setRowsData(newRows)
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
      if (key === 'TRIP_NUMBER' && updatedRow?.TRIP_NUMBER?.trim() && prev !== updatedRow?.TRIP_NUMBER?.trim()) {
        const check = saveData.filter(d => d.tableRowId !== updatedRow.tableRowId && d?.TRIP_NUMBER?.trim()).map(d => d[key]) || []
        let err = false
        if (check.includes(updatedRow[key])) {
          dispatch(errorStatusNotificationAction({
            type: 'travel',
            message: `Trip Number (${updatedRow[key]}) already belongs to current Collection`
          }))
          err = true
        } else {
          try {
            const [res] = await apiCall({
              method: 'get',
              url: '/ValidateTripNumber',
              params: { CollectionID: collectionId, tripNumber: updatedRow[key], ...(saveData.some(d => d.tableRowId === updatedRow.tableRowId && d.SAVE_MODE === 'I') ? {} : { TravelID: updatedRow.TRAVEL_ID }) }
            })
            if (res && res.FINAL_STATUS === 'FAILED') {
              dispatch(errorStatusNotificationAction({
                type: 'travel',
                message: `Trip Number (${updatedRow[key]}) already belongs to current Collection`
              }))
              err = true
            }
          } catch (error) {
            dispatch(errorStatusNotificationAction({
              type: 'travel',
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
      }
      setOnEdit(false)
    }, 300)
  }

  const onAddNewRow = async () => {
    
    const id = await getUniqueIdFromApi('/GetTravelSequence', 'TRAVEL_ID')
      const tempRow = {
        tableRowId: generateRandomString(), TRAVEL_ID: id, COLLECTION_ID: collectionId, TRIP_NUMBER: "", EMPLOYEE_ID: null, EMPLOYEE_NAME: "", EMPLOYEE_NUMBER: "", FROM_DESTINATION: "", TO_DESTINATION: "", FROM_DATE: "", TO_DATE: "", TRAVEL_PURPOSE: "", 
      }
      createSaveData(tempRow, 'I')
      setRowsData([tempRow])
  }

  const renderNoData = () => (
    <NoDataFound>
      <Stack spacing={3} mt={2.5} alignItems="center" >
        <div>Oops! There  are no travel info yet! Please add travel info. </div>
        <div>
          <Button size="small" variant="contained" color="secondary" onClick={onAddNewRow} >Add</Button>
        </div>
      </Stack>
    </NoDataFound>
  )

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs />
        <Grid item alignSelf="flex-end">
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <Button disabled={!selectedRows.length} variant="contained" color="secondary" onClick={() => setDeleteModal(true)} >Delete</Button>
            <Button variant="contained" disabled={!saveData?.length || onEdit} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} >
        <DataGrid
          ref={gridRef}
          style={{height: '60vh' }} 
          onScroll={handleScroll}
          otherFunctions={{ onCellMenuItemClick, getChange, onCellBlur, onEditStart, selectedRows, onSelectedRowsChange }}
          rowHeight={40}
          noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataComponent={renderNoData} style={{ height: '45vh', position: 'sticky', left: 0 }} />}
          onRowsChange={onRowsChange}
          headerRowHeight={60}
          rowKeyGetter={rowKeyGetter}
          columns={columnsData}
          rows={rowsData}
        />
        {deleteModal && (
          <AlertModal title="Delete selected user row's" open={deleteModal} onConfirm={onDelete} onClose={() => setDeleteModal(false)} >
            Are you sure that you want delete the selected record's and all the unsaved changes will be reverted ?
          </AlertModal>
        )}
      </Stack>
    </div>
  )
}

export default memo(Travel)
