import { Button } from "@mui/material";
import { useEffect, useState } from "react";
import {CreateEventOfInvoicesModelOpenAction} from './logic';
import { useDispatch, useSelector } from "react-redux";

export function InvoiceEvents() {
    const { isCreateEventOfInvoicesModelOpen } = useSelector(state => state.createEventInvoiceModelReducer);
    const dispatch = useDispatch();
    const handleCreateEvent = () => {
        // handleClearFilter();
        dispatch(CreateEventOfInvoicesModelOpenAction());
    }
    return (
        <div>
            <div className="invoiceEvents__container">
                <div ><Button size="small"  onClick={handleCreateEvent}>Create Event</Button></div>
                </div>
                {console.log("Table test",isCreateEventOfInvoicesModelOpen)}
                
         </div>
    )

}