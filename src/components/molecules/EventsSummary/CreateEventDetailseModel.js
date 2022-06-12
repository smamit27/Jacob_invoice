import { Button, Dialog } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import downArrow from '../../../assets/custom-icons/icons8-expand-arrow-50.png';
import DataGrid from 'react-data-grid';
import { Loader } from '../../atoms';
import { useEffect, useState } from "react";
import './../EventsSummary/CreateEvents.css';


export default function CreateEventDetaliseOfInvoicesModel() {  
    const { isCreateEventOfInvoicesModelOpen } = useSelector(state => state.createEventDetailseModelReducer);

    return (
        <Dialog open={isCreateEventOfInvoicesModelOpen} fullWidth={true} maxWidth='lg'>
            <div className="">
                <div className="createEventDetailseInvoiceModel__header">
                    <span className="createEventDetailseModel__headerText">Event Detailse</span>
                </div>
                <div className="createEventDetaliseInvoiceModel__body">
                {/* <CreateEventDetailseOfModelOptions /> */}
                </div>
                </div>
        </Dialog>
    )
}
