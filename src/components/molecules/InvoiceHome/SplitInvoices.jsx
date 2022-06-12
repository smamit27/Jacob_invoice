import { Button, Dialog } from "@mui/material"
import { useSelector, useDispatch } from "react-redux";
import {
    splitInvoiceModelCloseAction,
    splitInvoiceToExistingBatchModelOpenAction,
    splitInvoiceToNewBatchModelOpenAction,
} from './logic';

import { SplitInvoiceToExistingBatchModel } from './SplitInvoiceToExistingBatchModel';

export function SplitInvoices() {
    return (
        <div>
            <SplitInvoiceModel />
            <SplitInvoiceToExistingBatchModel />
        </div>
    )
}


function SplitInvoiceModel() {
    const { isSplitInvoiceModelOpen } = useSelector(state => state.splitInvoiceModel);
    const { selectedInvoiceRowsData } = useSelector(state => state.invoiceOptions);
    const dispatch = useDispatch();


    const getClientOrderNumbers = () => {
        return selectedInvoiceRowsData?.map((row) => {
            return row.CLIENT_DELIVERY_ORDER_NO || "";
        });
    }

    const clientOrdersNumbers = getClientOrderNumbers()?.join("");

    /*------------------handle change---------------- */

    const closeDialog = () => {
        dispatch(splitInvoiceModelCloseAction());
    }

    const handleCancel = () => {
        closeDialog();
    }

    const handleExistingBatch = () => {
        // dispatch(splitInvoiceToExistingBatchModelOpenAction())
        closeDialog();
    }

    const handleNewBatch = () => {
        dispatch(splitInvoiceToNewBatchModelOpenAction());
        closeDialog();
    }


    /*----------------------------------------------- */

    return (
        <Dialog open={isSplitInvoiceModelOpen} fullWidth={true} maxWidth='xs'>
            <div>
                <div className="splitInvoicesModel__header">
                    Split Invoice
                </div>
                <div className="splitInvoicesModel__body">
                    <span>{`Are you sure you want split the invoice for the Client Delivery Order ${clientOrdersNumbers} to another batch? Do you want to split it to a  new or existing batch?.`}</span>
                </div>

                <div className="splitInvoicesModel__footer">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handleExistingBatch}>Existing Batch</Button>
                    <Button onClick={handleNewBatch}>New Batch</Button>
                </div>
            </div>
        </Dialog>
    )
}

