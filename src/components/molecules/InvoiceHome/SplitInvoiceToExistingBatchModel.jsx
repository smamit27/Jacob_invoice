import { Button, Dialog } from "@mui/material";
import { useSelector } from "react-redux";


export function SplitInvoiceToExistingBatchModel() {
    const { isSplitInvoiceToExistingBatchModelOpen } = useSelector(state => state.splitInvoiceToExistingBatchModel);
    return (
        <Dialog open={isSplitInvoiceToExistingBatchModelOpen} fullWidth={true} maxWidth='md'>
            split existing model open
        </Dialog>
    )
}