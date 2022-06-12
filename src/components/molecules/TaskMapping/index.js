import { Button, Grid, Stack } from '@mui/material'
import React, { useEffect, useState, memo, useRef } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { taskBillingMethodTableFlagResetAction,taskBillingMethodTableAction, tasksGroupTableFlagResetAction, tasksGroupTableAction, taskMappingTableAction,saveTaskMappingTableResetAction,taskMappingTableResetAction,saveTaskMappingTableAction} from './logic'
import {sharedTaskMappingProject} from '../../../redux/common/action';
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader } from '../../atoms'
import { userDefineFieldsModalOpenAction } from '../UserDefineFields/logic'
import QuickTaskMapping from './QuickTaskMapping'
import QuickTaskGrouping from './QuickTaskGrouping'
import {columns,formSaveData} from './constants'
import { apiCall, getUniqueIdFromApi } from '../../../services/httpService'
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic'
import {uniqBy,sortBy} from 'lodash'
import DataGrid, { SelectColumn }  from 'react-data-grid'
import useLazyLoad from '../../../hooks/useLazyLoad'
import { generateRandomString} from '../../../helpers'


function TaskMapping(props) {
  const dispatch = useDispatch()
  const { loading, error, data, flag } = useIntialSelector('taskMappingTableReducer')
  const { data: taskGroupData, flag: taskGroupFlag } = useSelector(state => state.getTaskMappingTableReducer)
  const { data: taskBillingMethod, flag: taskBillingFlag } = useSelector(state => state.taskBillingMethodTableReducer)
  const { flag: saveTaskMappingTableFlag, error: saveTaskMappingTableError } = useSelector(state => state.saveTaskMappingTableReducer)
  const { error:saveErrorCharacter, flag:saveFlagCharacter } = useSelector(state=>state.saveQuickTaskMappingTableReducer)
  const { error:saveErrorTaskNumber, flag:saveFlagTaskNumber } = useSelector(state=>state.saveTaskNumberNameReducer)
  const{ error:taskLevelError,flag:taskLevelFlag} = useSelector(state=>state.getTaskLevelMappingReducer)
  const{ error:taskNumberNameError,flag:taskNumberNameFlag} = useSelector(state=>state.getTaskNumberNameMappingReducer)
  const{ error:taskNameError,flag:taskNameFlag} = useSelector(state=>state.getNameOfCharactersMappingReducer)

  const collectionId = useSelector(state => state.getCollectionId)
  const [columnsData, setColumnsData] = useState([...columns, ...(props?.udfGridColumns || [])])
  const [selectedRows, setSelectedRows] = useState([])
  const [childData, setChildData] = useState({})
  const [saveData, setSaveData] = useState([])
  const prevSaveData = useRef([])
  const groupID = useRef([])
  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { CollectionId: collectionId, ModuleId: props.moduleId || 5, },
    url: '/GetProjectGroupTasksData',
    rows: data,
    rowAdditionalData: {
      isExpanded: false
    }
  })
  useEffect(() => {
    dispatch(taskMappingTableAction({
      CollectionID: collectionId,
      ModuleID: props.moduleId || 5,
      PageIndex: 0,
      PageSize: 20,
      
    }))
    dispatch(taskBillingMethodTableAction())
    dispatch(saveTaskMappingTableResetAction())
    }, [])

    useEffect(()=>{
      if(saveFlagCharacter || saveFlagTaskNumber || taskLevelFlag || taskNumberNameFlag || taskNameFlag){
        setSelectedRows([])
        setSaveData([])
        prevSaveData.current = []
        dispatch(sharedTaskMappingProject([]))
        resetFrom()
        dispatch(taskMappingTableAction({
          CollectionID: collectionId,
          ModuleID: props.moduleId || 5,
          PageIndex: 0,
          PageSize: 20          
        }))      

      }
      return ()=> {
        dispatch(saveTaskMappingTableResetAction())
      }
  }, [saveFlagCharacter,saveFlagTaskNumber,taskLevelFlag,taskNumberNameFlag,taskNameFlag])


  useEffect(() => {
    if (flag) {
      dispatch(sharedTaskMappingProject([]))
      setRowsData(data)
      const col = columnsData.map(d => d.udf ? ({
        ...d,
        editor: ({ row, ...rest }) => row.IS_GROUP ==='Y' ? null : <d.editor row={row} {...rest} />
      }) : d)
      setColumnsData(col)
    dispatch(saveTaskMappingTableResetAction())
    dispatch(backDropLoaderCloseAction())

    }
  }, [flag])

  useEffect(() => {
    if (saveTaskMappingTableError) {
      dispatch(backDropLoaderCloseAction())
      dispatch(saveTaskMappingTableResetAction())
    }
  }, [saveTaskMappingTableError])

 useEffect(() => {
    if (saveTaskMappingTableFlag) {
      setSaveData([])
      prevSaveData.current = []
      // resetFrom()
      dispatch(saveTaskMappingTableResetAction())
      dispatch(backDropLoaderCloseAction())
      // dispatch(taskMappingTableAction({
      //   CollectionID: collectionId,
      //   ModuleID: props.moduleId || 5,
      //   PageIndex: 0,
      //   PageSize: 20          
      // })) 

    }
  }, [saveTaskMappingTableFlag])

  useEffect(() => {
    if (taskGroupFlag) {
      const taskGroupOptions = taskGroupData.map(d => ({ id: d.ID, description: d.Description }))
      setColumnsData(columnsData.map(d => d.key === 'CLIENT_TASK_GROUP_ID' ? {...d, valueOptions: taskGroupOptions } : d))
      dispatch(tasksGroupTableFlagResetAction())
    }
  }, [taskGroupFlag])
  useEffect(() => {
    if (taskBillingFlag) {
      const taskBillingOptions = taskBillingMethod.map(d => ({ id: d.ID, description: d.DESCRIPTION }))
      setColumnsData(columnsData.map(d => d.key === 'TASK_BILL_GROUP_ID' ? {...d, valueOptions: taskBillingOptions } : d))
       dispatch(taskBillingMethodTableFlagResetAction())
    }
  }, [taskBillingFlag])

  const onExpand = async (val) => {
    const { isExpanded, tableRowId, PROJECT_ID = ''} = val
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
            url: '/GetProjectTaskDetails',
            params: {
              CollectionID: collectionId,
              ModuleID: props?.moduleId || 5,
              ProjectId:PROJECT_ID,
              PageIndex: 0,
              PageSize: 20,
              }
          })
          child = [...response.map(d => ({ ...d, tableRowId: generateRandomString(), parentRowId: tableRowId, FLAG_IS:'N',isExpanded: true }))]
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
      ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || row.SAVE_MODE, COLLECTION_ID: collectionId, }] : [])
    ]
    prevSaveData.current = [...newSaveData]
    setSaveData(newSaveData)
  }
  
  function onSelectedRowsChange (checked, val, parentId= "") {
    if (checked) {
      let values = [val]
      if (parentId) {
        const child = childData[parentId]?.filter(d=>!(d.IS_GROUP === 'Y' || d.IS_ORACLE_TASK === 'N')).map(d => d.tableRowId) || []
        const selRows = [...selectedRows, val]
        if (child.every(d => selRows.includes(d))) {
          values = [...values, parentId] 
        }      
      } else if (childData[val]) {
        const child = childData[val]?.filter(d=>!(d.IS_GROUP === 'Y' || d.IS_ORACLE_TASK === 'N')).map(d => d.tableRowId) || []
        values = [...values, ...child] 
      }
      let tempTask = [];
      Object.keys(childData).forEach((d)=>{
        tempTask =  [...tempTask,...childData[d]]
      })
      tempTask = uniqBy([...rowsData,...tempTask],'tableRowId')      
      const tempData = [...selectedRows, ...values]
      const modalData = tempTask.filter(d=>tempData.includes(d.tableRowId) && d.IS_GROUP !== 'Y')
      dispatch(sharedTaskMappingProject(modalData))
      setSelectedRows([...selectedRows, ...values])
    } else {
      let values = [val]
      if (parentId) {
        values = [...values, parentId]
      } else if (childData[val]) {
        const child = childData[val]?.map(d => d.tableRowId) || []
        values = [...values, ...child]
      }
      let tempTask = [];
      Object.keys(childData).forEach((d)=>{
        tempTask =  [...tempTask,...childData[d]]

      })
      tempTask = uniqBy([...rowsData,...tempTask],'tableRowId')      
      const tempData = selectedRows.filter(d => !values.includes(d))
      const modalData = tempTask.filter(d=>tempData.includes(d.tableRowId) && d.IS_GROUP !== 'Y')
      dispatch(sharedTaskMappingProject(modalData));
      setSelectedRows(selectedRows.filter(d => !values.includes(d)))
    }
  }

  const getChange = (editedRow,key) => {
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
            const child = [...childData[updatedRow.parentRowId]].filter(d => d.tableRowId !== updatedRow.tableRowId)
            setChildData({
              ...childData,
              [updatedRow.parentRowId]: [...child, updatedRow]
            })
            if(updatedRow?.GROUP === 'Y' && updatedRow.CLIENT_TASK_GROUP_ID ){             
              const newData = childData[updatedRow.parentRowId]
              const ClientTaskId = newData.filter(d => d.CLIENT_TASK_GROUP_ID === updatedRow.CLIENT_TASK_GROUP_ID)
              const filterGroupId = newData?.map(d=> d.GROUP_ID_AS_TASK === updatedRow.CLIENT_TASK_GROUP_ID).every(d=>d === false)
              if(ClientTaskId.length === 0 && filterGroupId){
                onAddNewRow(updatedRow)
              }
             }
          }    
  }


  const onAddNewRow = async (row) => {
    const {  tableRowId,parentRowId,isExpanded, PROJECT_ID,CLIENT_TASK_GROUP_NAME, TASK_NAME_OVERRIDE,CLIENT_FIELD1_SSID_DESC,CLIENT_FIELD1_SITE_NAME,CLIENT_START_DATE,CLIENT_END_DATE,TASK_BILL_GROUP_NAME,CLIENT_FIELD_1,OVERRIDE_STATUS,GROUP_ID_AS_TASK,CLIENT_TASK_GROUP_ID,TASK_BILL_GROUP_ID } = row;
    const newData = [...rowsData]
      let tempChildData = {...childData}

      let child = sortBy([...(tempChildData[parentRowId] || [])],'ROW_NUM')
      const index = newData.findIndex(d => d.tableRowId === parentRowId)
      const oldChildLength= child.length
      const id = await getUniqueIdFromApi('/GetTASKGroupSEQ', 'FUNDING_SOURCE_PERCENT_ID')
    const tempRow = { tableRowId: generateRandomString(), TASK_ID: id, PROJECT_ID,TASK_NUMBER_OVERRIDE:CLIENT_TASK_GROUP_NAME,TASK_NAME_OVERRIDE:'',TASK_BILL_GROUP_ID:0,CLIENT_TASK_GROUP_ID:0,CLIENT_FIELD1_SSID_DESC:'',CLIENT_FIELD1_SITE_NAME:'',CLIENT_START_DATE,
                       CLIENT_END_DATE,TASK_BILL_GROUP_NAME,GROUP_ID_AS_TASK:CLIENT_TASK_GROUP_ID,TASK_GROUP_BUDGET_QUANTITY:0, TASK_GROUP_BUDGET_AMOUNT:0, TASK_BUDGET_QUANTITY:0,TASK_BUDGET_AMOUNT:0,CLIENT_FIELD_1:'', OVERRIDE_STATUS:'N',IS_ORACLE_TASK: 'N' }
    child.push(tempRow)
    newData.splice(index + 1, oldChildLength, ...child)

  setChildData({
    ...childData,
    [parentRowId]: child
  })  
  setRowsData(newData)

  createSaveData(tempRow, 'I')


  }

  const onSave = () => {
    dispatch(backDropLoaderOpenAction())
    const projectData = formSaveData(saveData.filter(d => d.IS_GROUP !== 'Y'), props.udfRawData, collectionId)
    dispatch(saveTaskMappingTableAction({
    COLLECTION_ID: collectionId,
    TaskData: projectData
    }))
    
  }
 
  const disabled = rowsData.filter(d=>(d.IS_GROUP === 'Y' || d.IS_ORACLE_TASK === 'N') && !childData[d.tableRowId]).map(d=>d.tableRowId)
 
  return (
    <div>
      <Grid container spacing={3} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            <Button variant="outlined" className={"userDefinedBtn"}
             onClick={() => dispatch(userDefineFieldsModalOpenAction({ moduleId: (props?.moduleId || 5) }))}
             >User Defined Fields</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" > 
            <QuickTaskGrouping />
            <QuickTaskMapping /> 
            <Button variant="contained" disabled={!saveData?.length} onClick={onSave} >Save</Button>
          </Stack>
        </Grid>
      </Grid>      
      <Stack mt={3} spacing={2} >
      <DataGrid
      style={{height: 'calc(80vh*(9/13))' }} 
        onScroll={handleScroll}
        rowHeight={40}
        headerRowHeight={60}
        noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
        rowKeyGetter={row => row.tableRowId}
        onRowsChange={setRowsData}
        otherFunctions={{ onExpand,disabled, getChange,selectedRows,onSelectedRowsChange }}
        columns={[...columnsData]}
        rows={rowsData}
      />
      </Stack>

    </div>
  )
}

export default memo(TaskMapping)
