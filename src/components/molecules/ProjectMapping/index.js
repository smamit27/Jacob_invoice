import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { clientProjectGroupModalOpenAction, clientProjectGroupTableAction, projectMappingTableAction, projectMappingTableResetAction, saveProjectMappingTableAction, saveProjectMappingTableResetAction, projectMappingTableFlagResetAction, projectMappingInvoiceFormatListAction, projectMappingInvoiceFormatListFlagResetAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader } from '../../atoms'
import DataGrid from 'react-data-grid'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import AssignProjects from './AssignProjects'
import {columns, formSaveData } from './projectConstant'
import { apiCall } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import useLazyLoad from '../../../hooks/useLazyLoad'
import { generateRandomString } from '../../../helpers'
import useColumns from '../../../hooks/useColumns'
import ColumnFilter from '../../atoms/Filters'
import '../ProjectMapping/ProjectMappingStyles.css'

function ProjectMapping(props) {
  const dispatch = useDispatch()
  const { loading, error, data = [], flag } = useIntialSelector('projectMappingTable')
  const { flag: saveProjectMappingTableFlag, error: saveProjectMappingTableError } = useSelector(state => state.saveProjectMappingTable)
  const { data: clientProjectGroupData, flag: clientProjectGroupFlag } = useIntialSelector('clientProjectGroupTable')
  const { flag: saveAllianceFlag } = useSelector(state => state.saveProjectMappingByAlliance)
  const { data: invoiceFormat, flag: invoiceFormatFlag } = useSelector(state => state.projectMappingInvoiceFormatList)
  const collectionId = useSelector(state => state.getCollectionId)
  const { flag: saveAlliancProjectFlag } = useSelector(state => state.saveAllianceProjectReducer)
  const {flag: projectOrAllianceChangeFlag } = useSelector(state => state.projectOrAllianceChange)
  const [childData, setChildData] = useState({})
  const {columnsData, setColumnsData, headerColumns, filteredConfig, clearFilters, filterParams = {}, filtersData = []} = useColumns({ columns: [...columns, ...(props?.udfGridColumns || [])], handleFiltersChange})
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { collectionID: collectionId, moduleId: props?.moduleId || 4, ...filterParams },
    url: '/GetProjectMappingAlianceGroup',
    rows: data,
    rowAdditionalData: {
      isExpanded: false
    },
  })
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  useEffect(() => {
    dispatch(projectMappingTableAction({
      collectionID: collectionId,
      moduleId: props?.moduleId || 4,
      PageIndex: 0,
      PageSize: 20,
      ...filterParams
    }))
    dispatch(clientProjectGroupTableAction({
      CollectionID: collectionId
    }))
    dispatch(projectMappingInvoiceFormatListAction())
  }, [])

  useEffect(() => {
    if (flag) {
      setRowsData(data)
      const col = columnsData.map(d => d.udf ? ({
        ...d,
        editor: ({ row, ...rest }) => row.IS_GROUP ==='Y' ? null : <d.editor row={row} {...rest} />
      }) : d)
      setColumnsData(col)
      dispatch(projectMappingTableFlagResetAction())
    }
  }, [flag])

  useEffect(() => {
    if (saveAlliancProjectFlag || projectOrAllianceChangeFlag) {
      resetFrom()
      setSaveData([])
      prevSaveData.current = []
      handleApiCall()
    }
  }, [saveAlliancProjectFlag, projectOrAllianceChangeFlag])

  useEffect(() => {
    if (saveProjectMappingTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveProjectMappingTableResetAction())
    }
  }, [saveProjectMappingTableError])

  useEffect(() => {
    if (saveProjectMappingTableFlag) {
      setSaveData([])
      prevSaveData.current = []
      dispatch(saveProjectMappingTableResetAction())
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveProjectMappingTableFlag])

  useEffect(() => {
    if (saveAllianceFlag) {
      resetFrom()
      setSaveData([])
      prevSaveData.current = []
      handleApiCall()
      dispatch(backDropLoaderCloseAction())
    }
  }, [saveAllianceFlag])

  useEffect(() => {
    if (clientProjectGroupFlag) {
      const projectGroupOption = clientProjectGroupData.map(d => ({ id: d.GROUP_ID, description: d.GROUP_NAME }))
      setColumnsData(columnsData.map(d => d.key === 'CLIENT_PROJECT_GROUP' ? {...d, valueOptions: projectGroupOption } : d))
    }
  }, [clientProjectGroupFlag])

  useEffect(() => {
    if (invoiceFormatFlag) {
      dispatch(projectMappingInvoiceFormatListFlagResetAction())
      setColumnsData(columnsData.map(d => d.key === 'INVOICE_NUMBER_FORMAT' ? {...d, valueOptions: invoiceFormat } : d))
    }
  }, [invoiceFormatFlag])

  function handleApiCall () {
    setSaveData([])
    prevSaveData.current = []
    resetFrom()
    dispatch(projectMappingTableAction({
      collectionID: collectionId,
      moduleId: props?.moduleId || 4,
      PageIndex: 0,
      PageSize: 20,
      ...filterParams,
    }))
  }

  function handleFiltersChange () {
    handleApiCall()
  }

  const onExpand = async (val) => {
    const { isExpanded, tableRowId, ALLC_PROJ_GROUP_ID = '', ALLC_PROJ_MAP_ID = '' } = val
    try {
      const newData = [...rowsData]
      const index = newData.findIndex(d => d.tableRowId === tableRowId)
      let child = childData[tableRowId] || []
      if (!isExpanded) {
        if (child && child.length) {
          newData.splice(index + 1, 0, ...child)
        } else {
          const response = await apiCall({
            method: 'get',
            url: '/GetAllProjects',
            params: {
              collectionId,
              moduleId: props.moduleId || 4,
              allcProjMapId: ALLC_PROJ_MAP_ID,
              allcProjGroupId: ALLC_PROJ_GROUP_ID,
              ...filterParams
            }
          })
          child = [...response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: tableRowId }))]
          newData.splice(index + 1, 0, ...child)
        }
        newData[index].isExpanded = true
      } else {
        child = newData.splice(index + 1, childData[tableRowId].length)
        newData[index].isExpanded = false
      }
      setChildData({
        ...childData,
        [tableRowId]: child
      })
      setRowsData(newData)
    } catch (error) {
    }
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

  const getChange = (editedRow, key) => {
    let updatedRow = {
      ...editedRow
    }
    try {
      if (key === 'CLIENT_START_DATE') {
        const newData = [...rowsData]
        const index = newData.findIndex(d  => d.tableRowId === editedRow.tableRowId)
        updatedRow = {
          ...editedRow,
          CLIENT_END_DATE: ''
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

  const onSave = () => {
    dispatch(backDropLoaderOpenAction())
    const projectData = formSaveData(saveData.filter(d => d.IS_GROUP !== 'Y'), props.udfRawData, collectionId)
    const addData = saveData.filter(d => d.IS_GROUP === 'Y')
    dispatch(saveProjectMappingTableAction(projectData, addData, collectionId))
  }

  const onClear = () => {
    clearFilters()
  }

  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            <Button variant="outlined" className={"userDefinedBtn"} onClick={() => dispatch(userDefineFieldsModalOpenAction({ moduleId: (props?.moduleId || 5) }))} >User Defined Fields</Button>
            <Button disabled={!filtersData.length} variant="contained" color="secondary" onClick={onClear} >Clear Filters</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" >
            {/* <Button variant="contained" color="secondary" onClick={onRefresh} >Refresh</Button> */}
            <Button variant="contained" color="secondary" onClick={() => dispatch(clientProjectGroupModalOpenAction())} >Client Project Groups</Button>
            <AssignProjects />
            <Button variant="contained" disabled={!saveData?.length} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} className='projectMapping-tableContainer'>
        <DataGrid
          rowHeight={40}
          headerRowHeight={60}
          noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0}} />}
          style={{ height: 'calc(80vh*(9/13))' }}
          rowKeyGetter={row => row.tableRowId}
          onRowsChange={setRowsData}
          otherFunctions={{ onExpand, getChange }}
          columns={headerColumns}
          rows={loading ? [] : rowsData}
          onScroll={handleScroll}
          className='projectMappingTableBody'
        />
        {filteredConfig?.open && <ColumnFilter filteredConfig={filteredConfig} />}
      </Stack>
    </div>
  )
}

export default memo(ProjectMapping)
