import { Box, Button, Grid, IconButton, Modal, Stack, styled, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import DataGrid from 'react-data-grid'
import { useDispatch, useSelector } from 'react-redux'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { Loader } from '../../atoms'
import Label from '../../atoms/Label'
import { INVOICE_CREATEEVENTS_COLUMNS } from './constants'
import {createEventDetailseModelCloseAction, getTiaSubconpoTableAction, getTiaSubconpoTableFlagResetAction, getTiaSubconpoTableResetAction, tiaInvoiceModalCloseAction, tiaSubconpoDetailModalOpenAction } from './logic'
import './../EventsSummary/CreateEvents.css';
import CloseIcon from '@mui/icons-material/Close';
import { grid } from '@mui/system'




function CreateEventDetailseProjectNumTableList() {
const {data: modalData = {} } = useSelector(state => state.createEventDetailseModelReducer)
const { iscreateEventDetaliseOfInvoicesModelOpen } = useSelector(state => state.createEventDetailseModelReducer)
const { open } = useSelector(state => state.createEventDetailseModelReducer)
const { data, loading, error, flag } = useIntialSelector('createEventDetailseModelReducer')

const collectionId = useSelector(state => state.getCollectionId)
const [rowsData, setRowsData] = useState([])
const [totalData, setTotalData] = useState([])
const dispatch = useDispatch()


// Event Detailse Project  Number modal open


useEffect(() => {
    const { id } = modalData
    if (iscreateEventDetaliseOfInvoicesModelOpen) {
    dispatch(getTiaSubconpoTableAction({
    CollectionID: collectionId,
    SubContractorID: id
    }))
    } else {
    dispatch(getTiaSubconpoTableResetAction())
    }
    }, [iscreateEventDetaliseOfInvoicesModelOpen])



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



const onClose = () => dispatch(createEventDetailseModelCloseAction())



const onPoDetailClick = (val) => {
dispatch(tiaSubconpoDetailModalOpenAction({...val, name: modalData?.name}))
}



return (
<Modal open={iscreateEventDetaliseOfInvoicesModelOpen}>
<Box sx={style}>
    {console.log("test table date",iscreateEventDetaliseOfInvoicesModelOpen)}
    {console.log("test table date open",open)}
<Header className='createEventInvoiceModel__header'>
    <span className="createEventInvoiceModel__headerText">Event Detailse</span>
   
<div><CloseIcon className='createEventInvoicesModel__close' variant="contained" onClick={onClose} /></div>
</Header>

<TableContent >
<Box m={3} >
<div className="EventDetailseInvoiceSub__header1" style={{borderBottom:'1px solid #E1E1E1',marginBottom:'20px'}} variant='body1'>
      <div className="EventDetailseSub__headerText1" style={{marginBottom:'10px'}}>
      <div className='EventDetailse_num1'>1</div> <div className='EventDetailse_numText'>Event Basics</div>
      </div>
    <Box sx={{ flexGrow: 1 }}>
      <Grid container spacing={3}>
        <Grid item xs={2}>
          <label>Select Template</label>
        </Grid>
        <Grid item xs={2}>
        <label>Billing Period</label>
        </Grid>
        <Grid item xs={2}>
        <label>Bill through Date</label>
        </Grid>
        <Grid item xs={2}>
        <label>event Date</label>
        </Grid>
        <Grid item xs={2}>
        <label>Event Description</label>
        </Grid>
        <Grid item xs={2}>
        <label>Event Batch Number</label>
        </Grid>
      </Grid>
    </Box>
                </div>
<div className="EventDetailseInvoiceSub__header" style={{borderBottom:'1px solid #E1E1E1',marginBottom:'20px'}} variant='body1'>
                    <div className="EventDetailseSub__headerText" style={{marginBottom:'10px'}}>
                      <div className='EventDetailse_num'>2</div><div className='EventDetailse_numText1'>Event Line Items</div>
                      </div>
                </div>
<Grid container>
<Grid item sm lg md xs >
          <Stack spacing={2} direction="row" alignItems={"center"} >
            <Button variant="contained" color="secondary"  >Customize Table</Button>
            <Button variant="contained" color="secondary"  >Clear Filters</Button>
            <Typography variant='body1'>7 rows</Typography>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <Button variant="contained" color="secondary">Delete</Button>
            
            {/* <Button variant="contained" disabled={!saveData?.length} onClick={onSave} >Save</Button> */}
          </Stack>
        </Grid>
        </Grid> 
</Box>
<Box ml={3} mr={3} mb={3}>
<Loader loading={loading} error={error} style={{ height: 200, position: 'sticky', left: 0 }} >
    <DataGrid
    rowHeight={40}
    otherFunctions={{ onPoDetailClick }}
    noRowsFallback={<Loader loading={loading} error={error} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
    style={{ height: 'calc(85vh - 135px - 9em)' }}
    rowKeyGetter={row => row.tableRowId}
    columns={INVOICE_CREATEEVENTS_COLUMNS}
    rows={rowsData}
    summaryRows={totalData}
    />
</Loader>
</Box>
</TableContent>
<Footer>
<Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
<Button size="small" onClick={onClose} >Cancel</Button>
<Button size="small" onClick={onClose} variant="contained">Save</Button>
</Stack>
</Footer>
</Box>
</Modal>
)
}



export default CreateEventDetailseProjectNumTableList




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