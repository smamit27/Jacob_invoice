import React, { useEffect, useState,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { projectInvoiceDetailModalClose, projectInvoiceDetail,getProjectInvoiceSummaryTotalResetAction, projectInvoiceDetailReset ,getProjectInvoiceSummaryTotalAction} from './logic'
import { Loader } from '../../atoms';
import { Modal, Box, styled, Button, Stack, Grid, IconButton } from '@mui/material'
import DataGrid from 'react-data-grid'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { PROJECT_INVOICE_COLUMNS } from './constants';
import Label from '../../atoms/Label'
import NumberFormatter from '../../atoms/Formatters/NumberFormatter'

function ProjectInvoice() {
  const { open ,data: modalData = {}} = useSelector(state => state.projectInvoiceDetailModalReducer)
  const { data, loading, error,flag } = useIntialSelector('projectInvoiceDetailReducer')
  const { data: total } = useSelector(state => state.getProjectInvoiceSummaryTotalReducer)
  const [rowsData, setRowsData] = useState(data);
  const collectionId = useSelector(state => state.getCollectionId)
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(projectInvoiceDetail({
        collectionId: collectionId,
        projectId: modalData.PROJECT_ID,
        pageIndex: 1,
        pageSize: 10,
        orderBy: 1
      }))
      dispatch(getProjectInvoiceSummaryTotalAction({
        collectionId: collectionId,
        projectId: modalData.PROJECT_ID,
        pageIndex: 1,
        pageSize: 10,
        orderBy: 1
      }))
    } else {
      dispatch(projectInvoiceDetailReset())
      dispatch(getProjectInvoiceSummaryTotalResetAction())
    }
  }, [open])

  useEffect(() => {
    if (data.length|| flag) {
      const newData = [...data]
      setRowsData(newData)
    }
  }, [flag])

   const onClose = () => dispatch(projectInvoiceDetailModalClose())
 
  
  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <HeaderTitle>Project Invoices - {modalData?.PROJECT_NUMBER || ''}`</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent >
          <Box m={3} >
            <Stack spacing={2} direction="row" justifyContent="space-between" flexWrap="wrap" >
              <div>
                <Label>Project Number</Label>
                <TextView className='bold' >{modalData?.PROJECT_NUMBER}</TextView>
              </div>
              <div>
                <Label>Project Name</Label>
                <TextView className='bold' >{modalData?.PROJECT_NAME}</TextView>
              </div>
              <div>
                <Label>Project Status</Label>
                <TextView className='bold'style={{ backgroundColor: "#B6B6B6", color: "#222222",borderRadius: "10px",padding:"0px 18px" }} >{modalData?.PROJECT_STATUS}</TextView>
              </div>
              <div>
                <Label>Billing Periods</Label>
                <TextView className='bold' >{modalData?.BILLING_PERIOD}</TextView>
              </div>
              <div>
                <Label></Label>
                <TextView className='bold' ></TextView>
              </div>
            </Stack>
          </Box>
          <Box ml={3} mr={3} mb={3}>
          <Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }} >
            <DataGrid
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              headerRowHeight={60}
              rowKeyGetter={row => row.tableRowId}
              columns={PROJECT_INVOICE_COLUMNS}
              rows={rowsData}
              summaryRows={total}
              style={{height: 'calc(80vh*(9/13))' }} 
            />
          </Loader>
          </Box>
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button size="small" onClick={onClose} variant="contained">Close</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default ProjectInvoice



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
  fontWeight: '500',
  fontsize: '14px',
  lineHeight: '24px',
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
