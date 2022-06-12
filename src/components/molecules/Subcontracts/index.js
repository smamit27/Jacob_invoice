import React, { useEffect, useState, useRef } from 'react'
import { useDispatch ,useSelector} from 'react-redux'
import { clientSubcontractPOModalOpen,saveSubcontractorResetAction,subcontractStatusResetAction,subcontractStatusAction, subcontractTableAction, subcontractTableResetAction, saveSubcontractsAction} from './logic'
import { Loader } from '../../atoms';
import { Modal, Box, styled, Button, Stack, Grid, IconButton } from '@mui/material'
import DataGrid from 'react-data-grid'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { SUBCONTRACT_COLUMNS } from './subcontractConstant';
import Label from '../../atoms/Label';
import NumberFormatter from '../../atoms/Formatters/NumberFormatter';
import useLazyLoad from '../../../hooks/useLazyLoad';
import { backDropLoaderCloseAction, backDropLoaderOpenAction } from '../BackDropLoader/logic';
import '../Subcontracts/SubcontractsStyles.css'

function SubcontractSummary(props) {
  const dispatch = useDispatch()
  const { loading, error, data=[], flag } = useIntialSelector('subcontractTableReducer')
  const { data: statusFormat, flag: statusFormatFlag } = useSelector(state => state.subcontractStatusReducer) 
  const { flag: saveSubcontractorFlag, error: saveSubcontractorError } = useSelector(state => state.saveSubcontractorReducer)
  const [columnsData, setColumnsData] = useState([...SUBCONTRACT_COLUMNS])
    const [saveData, setSaveData] = useState([])
    const prevSaveData = useRef([])
    const collectionId = useSelector(state => state.getCollectionId)

  const {rowsData, setRowsData, handleScroll, resetFrom} = useLazyLoad({
    params: { CollectionID: collectionId, ModuleID: props?.moduleId || 7 },
    url: '/GetSubcontractDetails',
    rows: data,
    rowAdditionalData: {
      isExpanded: false
    },
  })
  
  useEffect(() => {
    if (saveSubcontractorFlag) {
      setSaveData([])
      prevSaveData.current = []
      dispatch(saveSubcontractorResetAction())
      dispatch(backDropLoaderCloseAction())    
    }
  }, [saveSubcontractorFlag])

  useEffect(() => {
    if (saveSubcontractorError) {
      dispatch(saveSubcontractorResetAction())
      dispatch(backDropLoaderCloseAction())    
    }
  }, [saveSubcontractorError])

  useEffect(() => {
    if (statusFormatFlag) {
      dispatch(subcontractStatusResetAction())
      const statusFormatOptions = statusFormat.map(d => ({ id: d.ID, description: d.Description }))
      setColumnsData(columnsData.map(d => (d.key === 'STATUS_1' || d.key === 'STATUS_2' || d.key === 'STATUS_3' ||d.key === 'STATUS_4' ) ? {...d, valueOptions: statusFormatOptions } : d))
    }
  }, [statusFormatFlag])


  useEffect(() => {
    dispatch(subcontractTableAction({
      CollectionID: collectionId,
      ModuleID:  props?.moduleId || 7,
      PageIndex: 0,
      PageSize:20
    }))
    dispatch(subcontractStatusAction())   
    return () => {
    dispatch(subcontractTableResetAction())
    }
  }, [])
  useEffect(() => {
    if (flag) {
      setRowsData(data)
    }
  }, [flag])
  const onRowsChange = (newRows) => {
    setRowsData(newRows)
  }

  const save = () =>{
    if(saveData.length > 0){
      const request = saveData.map((d)=>({
        "teaminG_SUBCONTRACTOR": d.TEAMING_SUBCONTRACTOR,
        "subcontactoR_ID":d.SUBCONTRACTOR_ID,
        "statuS_1": d.STATUS_1,
        "statuS_2": d.STATUS_2,
        "statuS_3": d.STATUS_3,
        "statuS_4": d.STATUS_4,
        "worK_DESCRIPTION": d.WORK_DESCRIPTION,
        "savE_MODE": d.SAVE_MODE
      }))
      dispatch(backDropLoaderOpenAction())
      dispatch(saveSubcontractsAction({
        CollectionId: collectionId,
        SubContractorId: ''
        }, request)
      )
    }   
  }


const onPoClick = (val) => {
  dispatch(clientSubcontractPOModalOpen({
    id: val.SUBCONTRACTOR_ID,
    name: val.SUBCONTRACTOR_NAME,
    WORK_DESCRIPTION: val.WORK_DESCRIPTION,
    
  }))
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

const getChange = (row) => {
  createSaveData(row)
 }


  return (
    <div>
       <Grid container  flexWrap="wrap" >
        <Grid item  sm lg md xs >
          <Stack  direction="row" >
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" mb={2} >
          <Stack  direction="row" flexWrap="wrap" >
            <Button variant="contained"  onClick={save} disabled={!saveData.length}>Save</Button>
             </Stack>
        </Grid>
      </Grid>
      <Stack mt={3} spacing={2} className='subContractorTable'>
 <DataGrid
            className='subConlisttable'
            style={{height: '60vh'}} 
              otherFunctions={{ getChange,onPoClick }}
              rowHeight={40}
              onRowsChange={onRowsChange}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0}} />}
              headerRowHeight={60}
              rowKeyGetter={row => row.tableRowId}
              columns={columnsData}
              rows={rowsData}
              onScroll={handleScroll}
             
            />
            </Stack>
            
    </div>
  )
}


export default SubcontractSummary



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '95%',
  height: '85vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  borderBottom: '1px solid #E1E1E1',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  width: '100%'
})

const HeaderTitle = styled('div')({
  color: '#222222',
  fontWeight: '800',
  fontSize: '14px',
  lineHeight: '24px',
  fontFamily: " Jacobs Chronos Bold"
})

const Footer = styled('div')({
  padding: '1.2em 1.5em',
  color: '#fff',
  display: 'flex',
  alignItems: 'center',
  height: 70,
  borderBottomLeftRadius: '6px',
  borderBottomRightRadius: '6px',
  borderTop: '1px solid #E1E1E1',
  width: '100%'
})


const TableContent = styled('div')({
  height: 'calc(85vh - 130px)',
  overflow: 'auto'
})

const TextView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#222222',
  fontSize: '14px',
  lineHeight: '24px',
})

const subContractorTable = styled('div')({
 boxShadow:'none !important'
})
// .rdg-cell-frozen-last {
  // borderRight: '1px solid #E1E1E1 !important';
// }


