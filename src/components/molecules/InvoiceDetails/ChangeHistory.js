import React, { useEffect, useState,useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { projectInvoiceDetailModalClose, changeHistoryReset,changeHistoryAction} from './logic'
import { Loader } from '../../atoms';
import { Modal, Box, styled, Button, Stack, Grid, IconButton } from '@mui/material'
import DataGrid from 'react-data-grid'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { CHANGE_HISTORY_COLUMNS } from './constants';
import Label from '../../atoms/Label'
import NumberFormatter from '../../atoms/Formatters/NumberFormatter'

function ChangeHistory() {
  const { open ,data: modalData = {}} = useSelector(state => state.projectInvoiceDetailModalReducer)
  const { data, loading, error,flag } = useIntialSelector('changeHistoryReducer')
  const [rowsData, setRowsData] = useState(data);
  const collectionId = useSelector(state => state.getCollectionId)
  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(changeHistoryAction({
        collectionId: collectionId,
        projectId: modalData.PROJECT_ID,
        pageIndex: 1,
        pageSize: 10,
        orderBy: 1
      }))

    } else {
      dispatch(changeHistoryReset())
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
          <HeaderTitle>Change History</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent >
          <Box ml={3} mr={3} mb={3}>
          <Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }} >
            <DataGrid
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              style={{ height: 'calc(80vh - 135px - 9em)' }}
              rowKeyGetter={row => row.tableRowId}
              columns={CHANGE_HISTORY_COLUMNS}
              rows={rowsData}
              headerRowHeight={60}
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

export default ChangeHistory



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
