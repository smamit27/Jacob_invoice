import { Modal, Box, styled, Button, Stack,  Grid} from '@mui/material'
import { generateRandomString} from "../../../helpers"

import React, { useEffect, useState,  } from 'react'
import 'react-datasheet/lib/react-datasheet.css';
import { ImportCsv, ModalTitle} from '../../atoms'
import {importColumns} from './constants'
import DataGrid from 'react-data-grid'
import { format } from 'date-fns';
import { Icon } from '../../atoms';
import {  getUniqueIdFromApi } from '../../../services/httpService'

function ImportCopyViewOptions({ open, type, valueOptions = [], onClose, onSaveOptions }) {
  
  const [rowsData, setRowsData] = useState([])
  const [columnsData, setColumnsData] = useState(importColumns)

  const onUpload = (uploadData) => {
    const newRows = uploadData.map(d => ({
      BILLING_START_DATE: format(new Date(d.BILLING_START_DATE), 'dd-MMM-yyyy'),
      BILL_THROUGH_DATE: format(new Date(d.BILL_THROUGH_DATE), 'dd-MMM-yyyy')      
    })) 
    setRowsData(newRows)   
  }
  const onSave = async () => {
    const id = await getUniqueIdFromApi('/GetBillingPeriodSeq', 'biP_ID') 
    const currentDate =  new Date();  
    const newRows = rowsData.map(d => ({
      ...d,
      BILLING_PERIOD_NAME: format(currentDate,'MMMM/yyyy'),
      BILLING_TYPE: "",
      ADDED_DATE: format(currentDate, 'dd-MMM-yyyy'),
      ADDED_BY: "",
      UPDATED_DATE: format(currentDate, 'dd-MMM-yyyy'),
      UPDATED_BY: "",

    })) 
    const rowBillingImport = [...newRows].map((d, i) => ({ ...d,BIP_ID: id+(i+1), tableRowId: generateRandomString(),SAVE_MODE: 'I', level: 1 }))
    onSaveOptions(rowBillingImport,"billing_import")
    onClose()  
}

  const importExcel = () =>{   


  }
  return (
    <Modal  open={open}>
      <Box sx={style}>
        <Header>
          <ModalTitle data-testid='import-bill-periods' >{'Import Bill Periods'}</ModalTitle>
          <div onClick={onClose}>
              <Icon name="close" />
          </div>
        </Header>
        
        <FormContent>
        <Grid container spacing={3} p={1} flexWrap="wrap">
        <Grid item  sm lg md xs >
          <Stack spacing={2} direction="row" >
            <Button variant="contained" color="secondary" >Clear Filter</Button>
          </Stack>
        </Grid>
        <Grid item alignSelf="flex-end" >
          <Stack spacing={2} direction="row" flexWrap="wrap" >
            <Button  variant="contained" color="secondary" onClick={() => importExcel('setup_billing_period')} >Export</Button>
             <ImportCsv onUpload={onUpload} all />
          </Stack>
        </Grid>
      </Grid>

          <Stack m={2}>
            <DataGrid rowHeight={40} headerRowHeight={60}  columns={columnsData} rows={rowsData} style={{height: 'calc(80vh*(9/13))' }}/>

          </Stack>
        </FormContent>
        <Footer>
          <Stack width="100%" spacing={2} direction="row" justifyContent="flex-end" >
            <Button type="button" onClick={onClose} >Cancel</Button>
            <Button disabled={rowsData.length === 0} onClick={() => onSave()} variant="contained">Save</Button>
          </Stack>
        </Footer>
      </Box>
    </Modal>
  )
}

export default ImportCopyViewOptions

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  width: '50%',
  height: '85vh',
  transform: 'translate(-50%, -50%)',
  bgcolor: '#FDFDFD',
  boxShadow: 24,
  borderRadius: '6px'
};

const Header = styled('div')({
  padding: '1.2em 1.5em',
  background: 'transparent',
  color: '#fff',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  height: 60,
  borderTopLeftRadius: '6px',
  borderTopRightRadius: '6px',
  width: '100%',
  borderBottom: '1px solid #E1E1E1'

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


const FormContent = styled('div')({
  height: 'calc(85vh - 80px - 3em)',
  overflow: 'auto'
})