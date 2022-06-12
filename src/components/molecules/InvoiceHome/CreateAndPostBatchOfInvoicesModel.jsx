import { Button, Dialog } from "@mui/material";
import { useSelector, useDispatch } from 'react-redux'
import downArrow from '../../../assets/custom-icons/icons8-expand-arrow-50.png';
import DataGrid from 'react-data-grid';
import { Loader } from '../../atoms';
import { INVOICE_BATCH_COLUMNS } from './constants';
import {
    createPostBatchInvoiceModelCloseAction,
    createBatchInvoiceModelOpenAction,
    editBatchInvoiceModelOpenAction,
    getBatchOfInvoicesInitialAction,
    setBatchOfInvoicesAction,
    getBatchOfInvoicesFailureAction,
    setSelectedBatchOfInvoicesAction,
    resetSelectedBatchOfInvoicesAction,
    setPostInvoicesModelOpenAction,
    setPostInvoicesModelCloseAction
} from './logic';
import { useEffect, useState } from "react";
import { apiCall } from '../../../services/httpService';
import { useHistory } from "react-router-dom";
import CloseIcon from '@mui/icons-material/Close';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import TextField from '@mui/material/TextField';
import { format } from 'date-fns';
import { batch } from 'react-redux'
import { errorStatusNotificationAction, statusNotificationAction } from '../StatusNotification/logic';


export default function CreateAndPostBatchOfInvoicesModel() {
    const { isCreatePostBatchInvoiceModelOpen } = useSelector(state => state.createBatchInvoiceModel);

    return (
        <Dialog open={isCreatePostBatchInvoiceModelOpen} fullWidth={true} maxWidth='lg'>
            <div className="">
                <div className="createBatchInvoiceModel__header">
                    <span className="createBatchInvoiceModel__headerText">Create and Post Batch of Invoices</span>
                </div>
                <div className="createBatchInvoiceModel__body">
                    <CreateBatchOfInvoicesModelOptions />
                    <CreateBatchOfInvoicesTable />
                </div>
            </div>
        </Dialog>
    )
}

function CreateBatchOfInvoicesModelOptions() {
    const dispatch = useDispatch();

    const history = useHistory();
    const collectionId = history.location.search?.split("=")[1];
    const { batchOfInvoicesData, selectedBatchOfInvoices } = useSelector(state => state.createBatchInvoiceModel);

    const { isPostInvoicesModelOpen } = useSelector(state => state.postInvoicesModel);

    const selectedRowsSize = selectedBatchOfInvoices.size;

    /*---------------------api calls-------------------- */
    const displayApiError = (type, message) => {

        dispatch(errorStatusNotificationAction({
            type,
            message,
        }));
    }
    const deleteInvoiceHomeDetailApi = async () => {
        try {
            const ids = Array.from(selectedBatchOfInvoices);
            let batchNumber = [];
            batchOfInvoicesData.map((row, index) => {
                if (row.CURRENT_INVOICE_BATCH_NUMBER === ids[index]) {
                    batchNumber.push(row.CURRENT_INVOICE_BATCH_NUMBER);
                }
            });

            batchNumber = batchNumber.join(',');

            await apiCall({
                method: 'delete',
                url: '/DeleteInvoiceHomeDetail',
                params: {
                    collectionId,
                    batchNumber
                }
            });

        } catch (error) {
            displayApiError("deleteInvoiceHomeDetail", error.message)

        }

    }

    const getInvoicePopulateHomeDataApi = async () => {
        try {
            dispatch(getBatchOfInvoicesInitialAction());
            const response = await apiCall({
                method: 'get',
                url: '/GetInvoicePopulateHomeData',
                params: {
                    collectionId
                }
            })
            dispatch(setBatchOfInvoicesAction(response));

        } catch (error) {
            dispatch(getBatchOfInvoicesFailureAction());
        }

    }
    /*-------------------------------------------------- */


    /*------------------handle Click-------------------- */
    const handleClearFilter = () => {
        dispatch(resetSelectedBatchOfInvoicesAction());
    }

    const handleCreateBatch = () => {
        batch(() => {
            handleClearFilter();
            dispatch(createBatchInvoiceModelOpenAction());
        })

    }

    const handleDelete = async () => {
        await deleteInvoiceHomeDetailApi();
        await getInvoicePopulateHomeDataApi();
    }

    const handlePostInvoices = () => {
        dispatch(setPostInvoicesModelOpenAction());
    }
    /*-------------------------------------------------- */

    return (
        <div className="createBatchInvoiceModel__optionsContainer">
            <div >
                <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small"  >Customize Table <img src={downArrow} className="invoiceOptions__downArrow" alt="down-arrow" /></Button>
                <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" disabled={!selectedRowsSize} onClick={handleClearFilter}>Clear Filter</Button>
                <span className="invoiceOptions__rowsText">{selectedRowsSize > 0 ? `${selectedRowsSize} Rows` : ""} </span>
            </div>
            <div>
                <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" disabled={!selectedRowsSize} onClick={handleDelete}>Delete</Button>
                <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" onClick={handleCreateBatch} >Create Batch </Button>
                <Button className="invoiceOptions__buttonMarginRight invoiceHome__darkButton" size="small" disabled={selectedBatchOfInvoices.size !== 1} onClick={handlePostInvoices}>Post Invoices</Button>
            </div>
            {isPostInvoicesModelOpen && <PostInvoicesModel getInvoicePopulateHomeDataApi={getInvoicePopulateHomeDataApi} />}
        </div >
    )
}

function CreateBatchOfInvoicesTable() {
    const dispatch = useDispatch();
    const { batchOfInvoicesData, isGetBatchOfInvoicesLoading, selectedBatchOfInvoices } = useSelector(state => state.createBatchInvoiceModel);

    const history = useHistory();

    const collectionId = history.location.search?.split("=")[1];
    /*------------------handle Click-------------------- */
    const onEdit = (row) => {
        const newSelectedRows = new Set(selectedBatchOfInvoices);
        newSelectedRows.add(row.CURRENT_INVOICE_BATCH_NUMBER);
        dispatch(setSelectedBatchOfInvoicesAction(newSelectedRows))
        dispatch(editBatchInvoiceModelOpenAction())
    }

    const handleCancel = () => {
        dispatch(createPostBatchInvoiceModelCloseAction());
    }

    const handleDone = () => {
        dispatch(createPostBatchInvoiceModelCloseAction());
    }

    const handleSelectedRowsChange = (row) => {
        dispatch(setSelectedBatchOfInvoicesAction(row))
    }

    /*-------------------------------------------------- */

    /*----------------------api calls------------------- */

    const getInvoicePopulateHomeDataApi = async () => {
        try {
            dispatch(getBatchOfInvoicesInitialAction());
            const response = await apiCall({
                method: 'get',
                url: '/GetInvoicePopulateHomeData',
                params: {
                    collectionId
                }
            })
            dispatch(setBatchOfInvoicesAction(response));

        } catch (error) {
            dispatch(getBatchOfInvoicesFailureAction());
        }

    }


    /*-------------------------------------------------- */
    useEffect(() => {
        getInvoicePopulateHomeDataApi();
    }, [])


    return (
        <>
            <div className="createBatchInvoiceModel__tableContainer">
                <DataGrid
                    rowHeight={40}
                    headerRowHeight={60}
                    otherFunctions={{ onEdit }}
                    noRowsFallback={<Loader loading={isGetBatchOfInvoicesLoading} error={"No Data"} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
                    style={{ height: 'calc(85vh - 135px - 9em)' }}
                    rowKeyGetter={row => row.CURRENT_INVOICE_BATCH_NUMBER}
                    columns={INVOICE_BATCH_COLUMNS}
                    rows={batchOfInvoicesData}
                    selectedRows={selectedBatchOfInvoices}
                    onSelectedRowsChange={handleSelectedRowsChange}
                />
            </div>
            <div className="createBatchInvoiceModel__buttonContainer">
                <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" onClick={handleCancel} >Cancel</Button>
                <Button className="invoiceHome__darkButton " size="small" onClick={handleDone}>Done</Button>
            </div>
        </>
    )
}

function PostInvoicesModel(props) {
    const { getInvoicePopulateHomeDataApi } = props;
    const { isPostInvoicesModelOpen } = useSelector(state => state.postInvoicesModel);
    const { batchOfInvoicesData, selectedBatchOfInvoices } = useSelector(state => state.createBatchInvoiceModel);
    const dispatch = useDispatch();

    const history = useHistory();

    const collectionId = history.location.search?.split("=")[1];
    const ids = Array.from(selectedBatchOfInvoices);

    const getSelectedInvoiceDate = () => {
        return batchOfInvoicesData?.filter((invoice, index) => invoice.CURRENT_INVOICE_BATCH_NUMBER === ids[index])[0]
    }

    const [selectedInvoiceData, setSelectedInvoiceData] = useState(getSelectedInvoiceDate());
    const applyFunding = selectedInvoiceData?.APPLY_FUNDING === "Y" ?? false;

    /*------------------handle change------------------ */
    const closeDialog = () => {
        dispatch(setPostInvoicesModelCloseAction())
    }

    const handleCloseIcon = () => {
        closeDialog();
    }

    const resetSelectedBatchOfInvoice = () => {
        dispatch(resetSelectedBatchOfInvoicesAction());
    }

    const handleCancel = () => {
        batch(() => {
            resetSelectedBatchOfInvoice();
            closeDialog();
        })

    }

    const handlePost = async () => {
        await saveInvoicePostBatchHomeApi();
        await getInvoicePopulateHomeDataApi();
        batch(() => {
            closeDialog();
            resetSelectedBatchOfInvoice();
        })

    }

    const handleApplyFunding = () => {
        const newSelectedInvoice = { ...selectedInvoiceData };
        if (selectedInvoiceData.APPLY_FUNDING === "Y") {
            newSelectedInvoice.APPLY_FUNDING = "N";
            setSelectedInvoiceData(newSelectedInvoice)
        } else {
            newSelectedInvoice.APPLY_FUNDING = "Y";
            setSelectedInvoiceData(newSelectedInvoice)
        }
    }

    const handleInvoiceDateCurrent = (date) => {
        const newSelectedInvoice = { ...selectedInvoiceData };
        newSelectedInvoice.INVOICE_DATE_CURRENT = date;
        setSelectedInvoiceData(newSelectedInvoice)
    }


    /*------------------------------------------------- */




    /*-----------------------api calls------------------ */
    const saveInvoicePostBatchHomeApi = async () => {
        try {
            const date = selectedInvoiceData?.INVOICE_POST_DATE ? format(selectedInvoiceData.INVOICE_POST_DATE, "dd/MM/yyyy") : format(new Date(), "dd/MM/yyyy")
            await apiCall({
                method: 'post',
                url: '/SaveInvoicePostBatchHome',
                params: {
                    COLLECTION_ID: collectionId,
                    BatchNumber: selectedInvoiceData.CURRENT_INVOICE_BATCH_NUMBER,
                    PostedDate: date,
                },
            })
            dispatch(statusNotificationAction({
                type: "saveInvoicePostBatchHome",
                message: `${date} Invoice Batch ${selectedInvoiceData.CURRENT_INVOICE_BATCH_NUMBER} was posted to the client`,
            }));

        } catch (error) {
            dispatch(errorStatusNotificationAction({
                type: "saveInvoicePostBatchHome",
                message: error.message,
            }));
        }

    }

    /*------------------------------------------------- */



    return <Dialog open={isPostInvoicesModelOpen} fullWidth={true} maxWidth='md'>
        <div>
            <div className="postInvoicesModel__header">
                <div><span>Post Invoices</span></div>
                <div><CloseIcon onClick={handleCloseIcon} /></div>
            </div>

            <div className="postInvoicesModel__body">

                <div className="postInvoicesModel__bodyDetailsContainer">
                    <div className="postInvoicesModel__bodyDetails">
                        <span style={{ fontSize: 12 }}>Power Invoice Billing Period</span>
                        <span style={{ fontSize: 14 }}>{selectedInvoiceData?.BILLING_PERIOD_NAME ?? ""}</span>
                    </div>


                    <div className="postInvoicesModel__bodyDetails">
                        <span style={{ fontSize: 12 }}>Invoice Type</span>
                        <span style={{ fontSize: 14 }}>{selectedInvoiceData?.INVOICE_TYPE ?? ""}</span>
                    </div>

                    <div className="postInvoicesModel__bodyDetails">
                        <span style={{ fontSize: 12 }}>Invoice Batch Number</span>
                        <span style={{ fontSize: 14 }}>{selectedInvoiceData?.CURRENT_INVOICE_BATCH_NUMBER ?? ""}</span>
                    </div>
                </div>


                <div className="postInvoicesModel__bodyDetailsContainer">
                    <div className="postInvoicesModel__bodyDetails">
                        <span>Oracle PA Draft Invoice Status</span>
                        <span>{selectedInvoiceData?.ORACLE_INVOICE_STATUS_DISPLAY ?? ""}</span>
                    </div>


                    <div className="postInvoicesModel__bodyDetails">
                        <span>Oracle PA Draft Invoice Total</span>
                        <span>USD1,000.00</span>
                    </div>

                    <div className="postInvoicesModel__bodyDetails">
                        <span>Power Invoice Batch Total</span>
                        <span>USD1,000.00</span>
                    </div>
                </div>

                <div className="postInvoicesModel__bodyApplyFunding">
                    <span>Apply Funding?</span>


                    <RadioGroup row aria-label="post-invoices-apply-funding" name="post-invoices-apply-funding-group">
                        <FormControlLabel value="Yes" control={<Radio checked={applyFunding} onClick={handleApplyFunding} />} label="Yes" />
                        <FormControlLabel value="No" control={<Radio checked={!applyFunding} onClick={handleApplyFunding} />} label="No" />
                    </RadioGroup>
                </div>


                <div className="postInvoicesModel__bodyDate">
                    <span>Invoice Date Current</span>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            maxDate={new Date()}
                            inputFormat="dd/MM/yyyy"
                            value={selectedInvoiceData?.INVOICE_DATE_CURRENT ?? ""}
                            onChange={handleInvoiceDateCurrent}
                            renderInput={(params) => <TextField {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div className="postInvoicesModel__buttonContainer">
                    <Button onClick={handleCancel}>Cancel</Button>
                    <Button onClick={handlePost} className="postInvoicesModel__postButton">Post</Button>
                </div>




            </div>
        </div>
    </Dialog>
}