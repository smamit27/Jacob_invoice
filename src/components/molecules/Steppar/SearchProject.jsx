import { Modal, Box, styled, Button, Stack, IconButton } from '@mui/material'
import DataGrid, { SelectColumn } from 'react-data-grid'
import React, { useState, useEffect } from 'react'
import { useDispatch,useSelector } from 'react-redux'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { SEARCH_PROJECT_COLUMNS } from './constants'
import { Loader } from '../../atoms'
import { getProjectSearchAction, getProjectSearchResetAction } from '../Modal/logic'

function SearchProject({ active = [], open = false, onClose = () => null, params = {},onCancel, onSave = () => null }) {
  const { loading, error, data = [], flag } = useIntialSelector('getProjectSearchReducer')
  const [selectedRows, setSelectedRows] = useState(new Set())
  const [otherSelectedRows, setOtherSelectedRows] = useState([])
  const { setCollectionData } = useSelector(({ common }) => common);

  const dispatch = useDispatch()
  useEffect(() => {
    if (open) {
      dispatch(getProjectSearchAction(params))
    }
  }, [open])

  useEffect(() => {
    if (flag) {
      const activeRows = active.filter(d => data.findIndex(z => z.PROJECT_ID === d.PROJECT_ID) !== -1)
      const otherActiveRows = active.filter(d => data.findIndex(z => z.PROJECT_ID === d.PROJECT_ID) === -1)
      setSelectedRows(new Set(activeRows.map(d => d.PROJECT_ID)))
      setOtherSelectedRows(otherActiveRows)
      getProjectSearchResetAction()
    }
  }, [flag])

  const onDone = () => {
    const temp = Array.from(selectedRows)
    const selectedData = temp.map(d => data.find(m => m.PROJECT_ID === d))
    onSave([...selectedData, ...otherSelectedRows], active)
    onClose()
  }
  console.log(selectedRows.size,setCollectionData?.IS_GROUP_OF_PROJECT)
  const disabled = (setCollectionData?.IS_GROUP_OF_PROJECT === 'N' && selectedRows.size > 1)
  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <HeaderTitle data-testid="search-projects">Search Project(s)</HeaderTitle>
          <IconButton onClick={onClose} ><i className="lar la-times-circle" /></IconButton>
        </Header>
        <TableContent>
          <Box m={3}>
            <DataGrid
            style={{height: 'calc(80vh*(9/13))' }} 
              rowHeight={40}
              noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
              headerRowHeight={60}
              rowKeyGetter={row => row.PROJECT_ID}
              columns={[SelectColumn, ...SEARCH_PROJECT_COLUMNS]}
              rows={data}
              selectedRows={selectedRows}
              onSelectedRowsChange={setSelectedRows}
            />
          </Box>
        </TableContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            {/* <Button onClick={onCancel} >Cancel</Button> */}
            <Button disabled={!selectedRows.size || disabled } onClick={onDone} variant="contained">Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default SearchProject


const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '70%',
  height: '85vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  borderBottom: '1px solid #E1E1E1',
  width: '100%'
})

const HeaderTitle = styled("div")({
  fontWeight: "800",
  fontSize: "14px",
  lineHeight: "24px",
  fontFamily: " Jacobs Chronos Bold"
});

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
  height: 'calc(85vh - 80px - 3em)',
  overflow: 'auto'
})

const BootstrapButton = styled('div')({
  textDecoration: 'underline',
  fontSize: 14,
  lineHeight: 1.5,
  cursor: 'pointer'
});