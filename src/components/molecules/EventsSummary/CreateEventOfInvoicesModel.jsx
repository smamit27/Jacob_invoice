import { Button, Dialog } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import downArrow from '../../../assets/custom-icons/icons8-expand-arrow-50.png';
import DataGrid from 'react-data-grid';
import { Loader } from '../../atoms';
import { useEffect, useState } from "react";
import './../EventsSummary/CreateEvents.css';
import { INVOICE_CREATEEVENTS_COLUMNS } from './constants';

export default function CreateEventOfInvoicesModel() {  
    const { isCreateEventOfInvoicesModelOpen } = useSelector(state => state.createEventInvoiceModelReducer);

    return (
        <Dialog open={isCreateEventOfInvoicesModelOpen} fullWidth={true} maxWidth='lg'>
            <div className="">
                <div className="createEventInvoiceModel__header">
                    <span className="createEventInvoiceModel__headerText">Event Summary</span>
                </div>
                <div className="createEventInvoiceModel__body">
                <CreateEventOfInvoicesModelOptions />
                </div>
                </div>
        </Dialog>
    )
}
function CreateEventOfInvoicesModelOptions() {
    const columns = [
    {
        "width":108,
        "key":"BILLING_TITLE_CODE",
        "name":"Billing Title Code (Power Invoice)"
      },
      {
        "width":108,
        "key":"MINIMUM_RATE_OLD",
        "name":"Minimum Rate (Power Invoice)",
      },
      {
        "width":108,
        "key":"CAPPED_RATE_OLD",
        "name":"Capped Rate (Power Invoice)",
      }
    ]
      
    return (
        <div className="createEventIvoiceModel__optionsContainer">
            <div >
                <Button className="invoiceCreateEvent__button invoiceCreateEvent__buttonMarginRight" size="small"  >Customize Table <img src={downArrow} className="invoiceCreateEvent__downArrow" alt="down-arrow" /></Button>
                <Button className="invoiceCreateEvent__button invoiceCreateEvent__buttonMarginRight" size="small">Clear Filter</Button>
                {/* <span className="invoiceCreateEvent__button__rowsText">{selectedRowsSize > 0 ? `${selectedRowsSize} Rows` : ""} </span> */}
            </div>
            <div>
                
                <Button className="invoiceCreateEvent__button invoiceCreateEvent__buttonMarginRight" size="small">Data Refresh</Button>
                <Button className="invoiceCreateEvent__button invoiceCreateEvent__buttonMarginRight" size="small">Export</Button>
            </div>
            {/* {isPostInvoicesModelOpen && <PostInvoicesModel getInvoicePopulateHomeDataApi={getInvoicePopulateHomeDataApi} />} */}
            <>
            <div className="createEventInvoiceModel__tableContainer">
        {/* <DataGrid
            rowHeight={40}
            noRowsFallback={<Loader  error={"No Data"} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
            style={{ height: 'calc(85vh - 135px - 9em)' }}
            columns={INVOICE_CREATEEVENTS_COLUMNS}
            rows={[]}
            
        /> */}
        <DataGrid columns={columns} rows={[]} style={{ height: 'calc(85vh - 135px - 9em)' }} />
  
               
             
        </div>
        </>
        <div className="createEventInvoiceModel__buttonContainer">
        <Button className="invoiceEvent__button invoiceEventOptions__buttonMarginRight" size="small" >Cancel</Button>
        <Button className="invoiceEvent__darkButton " size="small">Done</Button>
        </div>
        </div >


    )   
}