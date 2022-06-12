import { Modal, Box, styled, Button, Stack, Grid, IconButton } from '@mui/material'
import React, { useEffect, useState, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import DataGrid from 'react-data-grid'
import { tiaSubconpoModalCloseAction, getTiaSubconpoTableAction, getTiaSubconpoTableFlagResetAction, getTiaSubconpoTableResetAction, saveTiaSubconpoTableAction, saveTiaSubconpoTableResetAction, getTiaSubconpoTotalAction, tiaSubconpoDetailModalOpenAction } from './logic'
import useIntialSelector from '../../../hooks/useIntialSelctor';
import { Loader } from '../../atoms';
import { PO_COLUMNS } from './constants';
import Label from '../../atoms/Label'

function TiaSubconpo() {
  const { open, data: modalData = {} } = useSelector(state => state.tiaSubconpoModal)
  const { data, loading, error, flag } = useIntialSelector('getTiaSubconpoTable')
  const collectionId = useSelector(state => state.getCollectionId)
  const [rowsData, setRowsData] = useState([])
  const [totalData, setTotalData] = useState([])
  const dispatch = useDispatch()

  useEffect(() => {
    const { id } = modalData
    if (open) {
      dispatch(getTiaSubconpoTableAction({ 
        CollectionID: collectionId,
        SubContractorID: id
      }))
    } else {
      dispatch(getTiaSubconpoTableResetAction())
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
      dispatch(getTiaSubconpoTableFlagResetAction())
    }
  }, [flag])


  const onClose = () => dispatch(tiaSubconpoModalCloseAction())

  const onPoDetailClick = (val) => {
    dispatch(tiaSubconpoDetailModalOpenAction({...val, name: modalData?.name}))
  }

  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <HeaderTitle>{modalData?.name ? `${modalData?.name} - Purchase Orders` : ''}</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent >
          <Box m={3} >
            <Stack spacing={2} direction="row" >
              <div>
                <Label>Subcontractor Name</Label>
                <TextView className='bold' >{modalData?.name}</TextView>
              </div>
            </Stack>
          </Box>
          <Box ml={3} mr={3} mb={3}>
          <Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }} >
            <DataGrid
            style={{height: 'calc(80vh*(9/13))' }} 
              rowHeight={40}
              otherFunctions={{ onPoDetailClick }}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              headerRowHeight={60}
              rowKeyGetter={row => row.tableRowId}
              columns={PO_COLUMNS}
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

export default TiaSubconpo


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