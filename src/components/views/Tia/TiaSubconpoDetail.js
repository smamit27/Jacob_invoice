import { Modal, Box, styled, Button, Stack, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataGrid from 'react-data-grid'
import { tiaSubconpoDetailModalCloseAction, getTiaSubconpoDetailTableAction, getTiaSubconpoDetailTableFlagResetAction, getTiaSubconpoDetailTableResetAction, saveTiaSubconpoDetailTableAction, saveTiaSubconpoDetailTableResetAction, getTiaSubconpoDetailTotalAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader } from '../../atoms';
import { PO_DETAILS_COLUMNS } from './constants';
import Label from '../../atoms/Label'
import NumberFormatter from '../../atoms/Formatters/NumberFormatter'

function TiaSubconpoDetail() {
  const { open, data: modalData = {} } = useSelector(state => state.tiaSubconpoDetailModal)
  const { data, loading, error, flag } = useIntialSelector('getTiaSubconpoDetailTable')
  const collectionId = useSelector(state => state.getCollectionId)
  const [rowsData, setRowsData] = useState([])
  const [totalData, setTotalData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const { SUBCONTRACTOR_ID, PO_NUMBER } = modalData
    if (open) {
      dispatch(getTiaSubconpoDetailTableAction({ 
        Collectionid: collectionId,
        Subcontractorid: SUBCONTRACTOR_ID,
        PONumber: PO_NUMBER
      }))
    } else {
      dispatch(getTiaSubconpoDetailTableResetAction())
    }
  }, [open])

  useEffect(() => {
    if (flag) {
      if (data.length) {
        const newData = [...data]
        const lastRow = newData.splice(data.length - 1, 1)
        setRowsData(newData)
        setTotalData(lastRow)
      }
      dispatch(getTiaSubconpoDetailTableFlagResetAction())
    }
  }, [flag])


  const onClose = () => dispatch(tiaSubconpoDetailModalCloseAction())

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <HeaderTitle>{modalData?.name ? `${modalData?.name} - PO Number ${modalData?.PO_NUMBER || ''}` : ''}</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent >
          <Box m={3} >
            <Stack spacing={2} direction="row" justifyContent="space-between" flexWrap="wrap" >
              <div>
                <Label>PO Number</Label>
                <TextView className='bold' >{modalData?.PO_NUMBER}</TextView>
              </div>
              <div>
                <Label>PO Total Amount</Label>
                <TextView className='bold' ><NumberFormatter type="Currency" value={modalData?.AMOUNT} /></TextView>
              </div>
              <div>
                <Label>PO Total Remaining</Label>
                <TextView className='bold' ><NumberFormatter type="Currency" value={modalData?.AMOUNT_REMAINING} /></TextView>
              </div>
              <div>
                <Label>PO Type</Label>
                <TextView className='bold' >{modalData?.PO_TYPE}</TextView>
              </div>
              <div>
                <Label>PO Status</Label>
                <TextView className='bold' >{modalData?.PO_STATUS}</TextView>
              </div>
              <div>
                <Label>Buyers Name</Label>
                <TextView className='bold' >{modalData?.BUYERS_NAME}</TextView>
              </div>
            </Stack>
          </Box>
          <Box ml={3} mr={3} mb={3}>
          <Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }} >
            <DataGrid
            style={{height: 'calc(80vh*(9/13))' }} 
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              headerRowHeight={60}
              rowKeyGetter={row => row.tableRowId}
              columns={PO_DETAILS_COLUMNS}
              rows={rowsData}
              summaryRows={totalData}
            />
          </Loader>
          </Box>
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button size="small" onClick={onClose} >Cancel</Button>
            <Button size="small" onClick={onClose} variant="contained">Done</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default TiaSubconpoDetail


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