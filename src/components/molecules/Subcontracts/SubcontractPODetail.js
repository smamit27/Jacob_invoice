import React, { useEffect, useState,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { subcontractPODetailModalClose,getSubcontractorPODetailTotalAction,getSubcontractorPODetailTotalResetAction, subcontractPODetail, subcontractPODetailReset } from './logic'
import { Loader } from '../../atoms';
import { Modal, Box, styled, Button, Stack, Grid, IconButton } from '@mui/material'
import DataGrid from 'react-data-grid'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { PO_DETAILS_COLUMNS } from './subcontractConstant';
import Label from '../../atoms/Label'
import NumberFormatter from '../../atoms/Formatters/NumberFormatter'

function SubcontractPODetail() {
  const { open ,data: modalData = {}} = useSelector(state => state.subcontractPODetailModalReducer)
  const { data, loading, error,flag } = useIntialSelector('subcontractPODetailReducer')
  const { data: total } = useSelector(state => state.getSubcontractorPODetailTotalReducer)

  const [rowsData, setRowsData] = useState(data);
  const collectionId = useSelector(state => state.getCollectionId)
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(subcontractPODetail({
        CollectionID: collectionId,
        SubcontractorID: modalData?.SUBCONTRACTOR_ID,
        PONumber: modalData?.PO_NUMBER,
        LocalFilter: '',
        GlobalFilter:'',
        Orderby:1
      }))
      dispatch(getSubcontractorPODetailTotalAction({
        CollectionID: collectionId,
        SubcontractorID: modalData?.SUBCONTRACTOR_ID,
        PONumber: modalData?.PO_NUMBER,
        LocalFilter: '',
        GlobalFilter:'',
        Orderby:''
      }))
    } else {
      dispatch(getSubcontractorPODetailTotalResetAction())
      dispatch(subcontractPODetailReset())
    }
  }, [open])

  useEffect(() => {
    if (data.length) {
      const newData = [...data]
      setRowsData(newData)
    }
    else{
      setRowsData([])

    }
  }, [flag])

   const onClose = () => dispatch(subcontractPODetailModalClose())
 
  
  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <HeaderTitle data-testid='subcon-po-number' >{modalData?.name ? `${modalData?.name} - PO Number ${modalData?.PO_NUMBER || ''}` : ''}</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent >
          <Box m={3} >
            <Stack spacing={2} direction="row" justifyContent="space-between" flexWrap="wrap" >
              <div className='subConLabel'>
                <Label>PO Number</Label>
                <TextView className='bold' >{modalData?.PO_NUMBER}</TextView>
              </div>
              <div>
                <Label className='subConLabel'>PO Total Amount</Label>
                <TextView className='bold' ><NumberFormatter type="Currency" value={modalData?.AMOUNT} /></TextView>
              </div>
              <div>
                <Label className='subConLabel'>PO Total Amount Spent</Label>
                <TextView className='bold' ><NumberFormatter type="Currency" value={modalData?.AMOUNT_SPENT} /></TextView>
              </div>
              <div>
                <Label className='subConLabel'>PO Total Remaining</Label>
                <TextView className='bold' ><NumberFormatter type="Currency" value={modalData?.AMOUNT_REMAINING} /></TextView>
              </div>
              <div>
                <Label className='subConLabel'>PO Type</Label>
                <TextView className='bold' >{modalData?.PO_TYPE}</TextView>
              </div>
              <div>
                <Label className='subConLabel'>PO Status</Label>
                <TextView className='bold' >{modalData?.PO_STATUS}</TextView>
              </div>
              <div>
                <Label className='subConLabel'>Buyers Name</Label>
                <TextView className='bold' >{modalData?.BUYERS_NAME}</TextView>
              </div>
            </Stack>
          </Box>
          <Box ml={3} mr={3} mb={3} className='subConpodetailse'>
          <Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }} >
            <DataGrid
              className='rdg-header-white'
              style={{height: '60vh' }} 
              rowHeight={40}
              headerRowHeight={60}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0, }} />} 
              rowKeyGetter={row => row.tableRowId}
              columns={PO_DETAILS_COLUMNS}
              rows={rowsData}
              summaryRows={rowsData.length> 0 ? total: []}
            />
          </Loader>
          </Box>
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button size="small" onClick={onClose} variant="contained">Done</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default SubcontractPODetail



const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '95%',
  height: '95vh',
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
  height: 'calc(95vh - 130px)',
  overflow: 'auto'
})

const TextView = styled('div')({
  display: 'flex',
  alignItems: 'center',
  color: '#222222',
  fontSize: '14px',
  lineHeight: '24px',
})