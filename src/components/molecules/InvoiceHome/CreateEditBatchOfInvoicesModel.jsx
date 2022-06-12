import { Button, CircularProgress, Dialog } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import InfoIcon from '@mui/icons-material/Info';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import Radio from '@mui/material/Radio';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import DesktopDatePicker from '@mui/lab/DesktopDatePicker';
import { useSelector, useDispatch } from 'react-redux';
import {
    createBatchInvoiceModelCloseAction,
    editBatchInvoiceModelCloseAction,
    setSelectedFieldsAction,
    resetSelectedFieldsAction,
    getBatchOfInvoicesInitialAction,
    setBatchOfInvoicesAction,
    getBatchOfInvoicesFailureAction,
    resetSelectedBatchOfInvoicesAction,
    splitInvoiceToNewBatchModelCloseAction
} from './logic';
import { useState, Fragment, useEffect } from 'react';
import { apiCall } from '../../../services/httpService';
import { useHistory } from "react-router-dom";
import { format } from 'date-fns';
import { errorStatusNotificationAction, statusNotificationAction } from '../StatusNotification/logic';
import { batch } from 'react-redux'

export function CreateEditBatchOfInvoicesModel() {
    const {
        isCreateBatchInvoiceModelOpen,
        isEditBatchInvoiceModelOpen,
        selectedFields,
    } = useSelector(state => state.createEditBatchInvoiceModel);
    const { batchOfInvoicesData, selectedBatchOfInvoices } = useSelector(state => state.createBatchInvoiceModel);
    const { isSplitInvoiceToNewBatchModelOpen } = useSelector(state => state.splitInvoiceToNewBatchModel);


    const [editInvoiceData, setEditInvoiceData] = useState([]);

    const history = useHistory();

    const collectionId = history.location.search?.split("=")[1];

    const dispatch = useDispatch();

    let isValidationError = false;



    /*---------------validation logic----------- */
    const displayValidationError = (type, message) => {

        isValidationError = true;
        dispatch(errorStatusNotificationAction({
            type,
            message,
        }));
    }



    const validateBatch = (billingPeriod, invoiceType, isSequentialSelected, applyChange) => { // same for create and edit

        if (!billingPeriod) {
            displayValidationError("createBatchOfInvoices", "Please Select Power Invoice Billing Period");
            return;
        } else if (!invoiceType) {
            displayValidationError("createBatchOfInvoices", "Please Select Invoice Type");
            return;
        } else if (!isSequentialSelected && !applyChange) {
            displayValidationError("createBatchOfInvoices", "Please Select Apply Change and Reprint Batch");
            return;
        }
        isValidationError = false;
        return;
    }


    /*------------------------------------------ */

    /*-----------------api calls---------------- */
    const displayApiError = (type, message) => {

        dispatch(errorStatusNotificationAction({
            type,
            message,
        }));
    }

    const saveInvoiceHomeBatchDetailsApi = async () => {
        try {
            const invoiceCurrentDate = format(selectedFields.invoiceDateCurrent, 'dd/MM/yyyy');
            const data = [
                {
                    "BILLING_PERIODS": selectedFields.billingPeriod.ID,
                    "INVOICE_TYPE": selectedFields.invoiceType.ID,
                    "APPLY_FUNDING": selectedFields.needToApplyFunding ? "Y" : "N",
                    "SEQUENTIAL_OR_BACKDATE": selectedFields.isSequentialSelected ? "S" : "B",
                    "INVOICE_DATE_CURRENT": invoiceCurrentDate,
                    "CURRENT_INVOICE_BATCH_NUMBER": selectedFields.invoiceBatchNumberCurrent[0].INVOICE_BATCH_NO,
                    "PREVIOUS_OR_NEW_BATCH": selectedFields.isPreviousBatch ? "P" : "N",
                    "PREVIOUS_INVOICE_BATCH_NUMBER": selectedFields.applyChange.ID ?? null,
                    "ORACLE_INVOICE_STATUS": "N",
                    "SAVE_MODE": "I"
                }
            ]

            await apiCall({
                method: 'post',
                url: '/SaveInvoiceHomeBatchDetails',
                params: {
                    CollectionID: collectionId,
                    BatchNumber: 0,
                },
                data
            })

            dispatch(statusNotificationAction({
                type: "saveInvoiceHomeBatchDetails",
                message: `Invoice Batch Number ${selectedFields.invoiceBatchNumberCurrent[0].INVOICE_BATCH_NO} is created.`,
            }));
        } catch (error) {
            displayApiError("saveInvoiceHomeBatchDetails", error.message)

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

    const editInvoiceHomeBatchDetailsApi = async () => { // need to reuse the same saveInvoiceHomeBatchDetailsApi with different data
        try {

            const data = [
                {
                    "BILLING_PERIODS": editInvoiceData[0]?.BILLING_PERIODS,
                    "INVOICE_TYPE": editInvoiceData[0]?.INVOICE_TYPE,
                    "APPLY_FUNDING": editInvoiceData[0]?.APPLY_FUNDING,
                    "SEQUENTIAL_OR_BACKDATE": editInvoiceData[0]?.SEQUENTIAL_OR_BACKDATE,
                    "INVOICE_DATE_CURRENT": editInvoiceData[0]?.INVOICE_DATE_CURRENT,
                    "CURRENT_INVOICE_BATCH_NUMBER": editInvoiceData[0]?.CURRENT_INVOICE_BATCH_NUMBER,
                    "PREVIOUS_OR_NEW_BATCH": editInvoiceData[0]?.PREVIOUS_OR_NEW_BATCH,
                    "PREVIOUS_INVOICE_BATCH_NUMBER": editInvoiceData[0]?.PREVIOUS_INVOICE_BATCH_NUMBER,    //apply change value

                    "ORACLE_INVOICE_STATUS": "N", // doubt what is the invoice status for edit

                    "SAVE_MODE": "U"
                }
            ]



            await apiCall({
                method: 'post',
                url: '/SaveInvoiceHomeBatchDetails',
                params: {
                    CollectionID: collectionId,
                    BatchNumber: editInvoiceData[0].CURRENT_INVOICE_BATCH_NUMBER,
                },
                data
            })
            dispatch(statusNotificationAction({
                type: "saveInvoiceHomeBatchDetails",
                message: `Invoice Batch Number ${selectedFields.invoiceBatchNumberCurrent[0].INVOICE_BATCH_NO} updated successfully.`,
            }));
        } catch (error) {
            displayApiError("saveInvoiceHomeBatchDetails", error.message)

        }
    }

    /*------------------------------------------ */

    /*--------------handle change--------------- */




    const handleCancel = () => {
        isValidationError = false;



        if (isEditBatchInvoiceModelOpen) {
            dispatch(editBatchInvoiceModelCloseAction());
        }

        if (isCreateBatchInvoiceModelOpen) {
            dispatch(createBatchInvoiceModelCloseAction());
        }

        if (isSplitInvoiceToNewBatchModelOpen) {
            dispatch(splitInvoiceToNewBatchModelCloseAction())
        }

        resetSelectedFields();

    }

    const handleCreate = async () => {
        validateBatch(selectedFields.billingPeriod?.DESCRIPTION, selectedFields.invoiceType?.DESCRIPTION, selectedFields.isSequentialSelected, selectedFields.applyChange?.DESCRIPTION);

        if (isValidationError) {
            return;
        }

        await saveInvoiceHomeBatchDetailsApi();
        await getInvoicePopulateHomeDataApi();
        isCreateBatchInvoiceModelOpen && dispatch(createBatchInvoiceModelCloseAction());

        resetSelectedFields();


    }

    const handleSave = async () => {
        validateBatch(editInvoiceData[0]?.BILLING_PERIOD_NAME, editInvoiceData[0]?.INVOICE_TYPE, editInvoiceData[0]?.SEQUENTIAL_OR_BACKDATE === "S", editInvoiceData[0]?.PREVIOUS_INVOICE_BATCH_NUMBER);
        if (isValidationError) {
            return;
        }

        await editInvoiceHomeBatchDetailsApi();
        dispatch(editBatchInvoiceModelCloseAction());
        await getInvoicePopulateHomeDataApi();
        resetSelectedFields();;
    }

    const handleSplitCreate = async () => {

        resetSelectedFields();
    }


    /*------------------------------------------ */

    /*-----------------local logic-------------- */


    const resetSelectedFields = () => {
        batch(() => { // to reduce multiple re-renders 
            dispatch(resetSelectedBatchOfInvoicesAction()); // for selected batch
            dispatch(resetSelectedFieldsAction()); // for selcted fields in creatBatch
        })
        setEditInvoiceData([]); // local variable for edit batch 
    }

    const getSelectedBatchOfInvoiceData = () => {
        const id = selectedBatchOfInvoices.size > 0 ? Array.from(selectedBatchOfInvoices)[0] : [];
        return batchOfInvoicesData?.filter((invoice) => invoice.CURRENT_INVOICE_BATCH_NUMBER === id);
    }

    const getHeaderText = () => {
        if (isCreateBatchInvoiceModelOpen) {
            return "Create Batch Of Invoices"
        } else if (isEditBatchInvoiceModelOpen) {
            return "Edit Batch Of Invoices"
        } else if (isSplitInvoiceToNewBatchModelOpen) {
            return "Split invoice to new batch";
        }
    }

    const getButtonText = () => {
        if (isCreateBatchInvoiceModelOpen || isSplitInvoiceToNewBatchModelOpen) {
            return "Create"
        } else if (isEditBatchInvoiceModelOpen) {
            return "Save"
        }
    }

    const handleButtonLogic = () => { // onCLick logic for create and edit batch and split invoicesvi
        if (isCreateBatchInvoiceModelOpen) {
            return handleCreate;
        } else if (isEditBatchInvoiceModelOpen) {
            return handleSave;
        } else if (isSplitInvoiceToNewBatchModelOpen) {
            return handleSplitCreate;
        }
    }

    /*------------------------------------------ */

    /*----------------use effect---------------- */

    useEffect(() => {
        if (batchOfInvoicesData && isEditBatchInvoiceModelOpen) {
            const data = getSelectedBatchOfInvoiceData(); // not an api just local filter based on id
            setEditInvoiceData(data);
        }
    }, [isEditBatchInvoiceModelOpen])

    /*------------------------------------------ */

    return (
        <Dialog open={isCreateBatchInvoiceModelOpen || isEditBatchInvoiceModelOpen || isSplitInvoiceToNewBatchModelOpen} fullWidth={true} maxWidth='md'>
            <>
                <div className="createEditInvoicesModel__header">
                    <div className="createEditInvoicesModel__headerleftSide">
                        <span className="createBatchInvoiceModel__headerText">{getHeaderText()}</span>
                        <InfoIcon className="createEditInvoicesModel__infoIcon" />
                    </div>
                    <div><CloseIcon className="createEditInvoicesModel__close" onClick={handleCancel} /></div>
                </div>

                <div className="createEditInvoicesModel__body">
                    < CreateEditBatchOfInvoicesModelBodyLeft editInvoiceData={editInvoiceData} setEditInvoiceData={setEditInvoiceData} />
                    <CreateEditBatchOfInvoicesModelBodyRight editInvoiceData={editInvoiceData} setEditInvoiceData={setEditInvoiceData} />

                </div>

                <div className="createEditInvoiceModel__buttonContainer">
                    <Button onClick={handleCancel} size="small">Cancel</Button>
                    <Button size="small" onClick={handleButtonLogic()}>{getButtonText()}</Button>
                </div>
            </>
        </Dialog>
    )
}

function CreateEditBatchOfInvoicesModelBodyLeft(props) {

    const {
        selectedFields,
        isEditBatchInvoiceModelOpen
    } = useSelector(state => state.createEditBatchInvoiceModel);
    const dispatch = useDispatch();

    const [invoiceType, setInvoiceType] = useState([]);
    const [isInvoiceTypeLoading, setIsInvoiceTypeLoading] = useState(false);

    const [billingPeriods, setBillingPeriods] = useState([]);
    const [isBillingPeriodsLoading, setIsBillingPeriodsLoading] = useState(false);

    const history = useHistory();
    const collectionId = history.location.search?.split("=")[1];

    const { editInvoiceData, setEditInvoiceData } = props;





    /*-------------local logic----------- */

    const getEditInvoiceTypeData = (id) => {
        return invoiceType?.filter((invoice) => invoice.ID === id);
    }

    /*----------------------------------- */

    const editInvoiceType = getEditInvoiceTypeData(editInvoiceData[0]?.INVOICE_TYPE) ?? "";
    const editApplyFunding = editInvoiceData[0]?.APPLY_FUNDING === "Y";
    const editIsSequential = editInvoiceData[0]?.SEQUENTIAL_OR_BACKDATE === "S";
    const editIsPrevious = editInvoiceData[0]?.PREVIOUS_OR_NEW_BATCH === "P";

    /*-----------handle change----------- */

    const handleSequentialChange = (event) => {
        if (isEditBatchInvoiceModelOpen) {
            const newEditInvoiceData = [...editInvoiceData];
            newEditInvoiceData[0].SEQUENTIAL_OR_BACKDATE = event.target.value;
            setEditInvoiceData(newEditInvoiceData);
        } else if (!isEditBatchInvoiceModelOpen) {
            const newSelectedFields = { ...selectedFields };
            newSelectedFields.isSequentialSelected = !newSelectedFields.isSequentialSelected;
            dispatch(setSelectedFieldsAction(newSelectedFields))
        }

    }

    const handleApplyFunding = (event) => {
        if (isEditBatchInvoiceModelOpen) {
            const newEditInvoiceData = [...editInvoiceData];
            newEditInvoiceData[0].APPLY_FUNDING = event.target.value;
            setEditInvoiceData(newEditInvoiceData);
        } else if (!isEditBatchInvoiceModelOpen) {
            const newSelectedFields = { ...selectedFields };
            newSelectedFields.needToApplyFunding = !newSelectedFields.needToApplyFunding;
            dispatch(setSelectedFieldsAction(newSelectedFields));
        }

    }

    const handlePreviousBatch = (event) => {
        if (isEditBatchInvoiceModelOpen) {
            const newEditInvoiceData = [...editInvoiceData];
            newEditInvoiceData[0].PREVIOUS_OR_NEW_BATCH = event.target.value;
            setEditInvoiceData(newEditInvoiceData);
        } else if (!isEditBatchInvoiceModelOpen) {
            const newSelectedFields = { ...selectedFields };
            newSelectedFields.isPreviousBatch = !newSelectedFields.isPreviousBatch;
            dispatch(setSelectedFieldsAction(newSelectedFields));
        }

    }

    const handleBillingPeriod = (event, value) => {
        if (isEditBatchInvoiceModelOpen) {
            const newEditInvoiceData = [...editInvoiceData];
            newEditInvoiceData[0].BILLING_PERIOD_NAME = value.DESCRIPTION;
            setEditInvoiceData(newEditInvoiceData);
        } else if (!isEditBatchInvoiceModelOpen) {
            const newSelectedFields = { ...selectedFields };

            newSelectedFields.billingPeriod = value;
            dispatch(setSelectedFieldsAction(newSelectedFields));
        }
    }

    const handleInvoiceType = (event, value) => {
        if (isEditBatchInvoiceModelOpen) {
            const newEditInvoiceData = [...editInvoiceData];
            newEditInvoiceData[0].INVOICE_TYPE = value.ID;
            setEditInvoiceData(newEditInvoiceData);
        } else if (!isEditBatchInvoiceModelOpen) {
            const newSelectedFields = { ...selectedFields };
            newSelectedFields.invoiceType = value;
            dispatch(setSelectedFieldsAction(newSelectedFields));
        }

    }


    /*----------------------------------- */



    /*--------------api calls------------ */

    const getInvoiceTypeDetails = async () => {
        try {
            setIsInvoiceTypeLoading(true)
            const response = await apiCall({
                method: 'get',
                url: '/GetInvoiceTypeDetails',
            })
            setInvoiceType(response);
            setIsInvoiceTypeLoading(false)
        } catch (error) {
            setIsInvoiceTypeLoading(false)
        }
    }

    const getInvoiceBillingPeriods = async () => {
        try {
            setIsBillingPeriodsLoading(true)
            const response = await apiCall({
                method: 'get',
                url: '/GetInvoiceBillingPeriods',
                params: {
                    collectionId
                }
            })

            setBillingPeriods(response);
            setIsBillingPeriodsLoading(false);

        } catch (error) {
            setIsBillingPeriodsLoading(false)
        }
    }

    /*----------------------------------- */



    /*--------------useEffect------------ */
    const getDetails = async () => {
        await getInvoiceTypeDetails();
        await getInvoiceBillingPeriods();
    }

    useEffect(() => {
        getDetails();
    }, [])




    /*----------------------------------- */



    return (
        <div className="createEditInvoicesModel__bodyLeft">
            <div className="createEditInvoicesModel__bodyLeftBorder createBatchInvoiceModel__bodySpacing">
                <div>
                    <CustomAutoComplete
                        text="Power Invoice Billing Period"
                        loading={isBillingPeriodsLoading}
                        options={billingPeriods}
                        onOpen={() => {
                            setIsBillingPeriodsLoading(true)
                        }}
                        onClose={() => {
                            setIsBillingPeriodsLoading(false)
                        }}
                        value={isEditBatchInvoiceModelOpen ? (editInvoiceData[0]?.BILLING_PERIOD_NAME ?? "") : selectedFields.billingPeriod?.DESCRIPTION}
                        onChange={handleBillingPeriod}
                    />

                    <CustomAutoComplete
                        text="Invoice Type"
                        loading={isInvoiceTypeLoading}
                        options={invoiceType}
                        onOpen={() => {
                            setIsInvoiceTypeLoading(true)
                        }}
                        onClose={() => {
                            setIsInvoiceTypeLoading(false)
                        }}
                        value={isEditBatchInvoiceModelOpen ? (editInvoiceType[0]?.DESCRIPTION ?? "") : selectedFields?.invoiceType?.DESCRIPTION}
                        onChange={handleInvoiceType}
                    />
                    <div>
                        <span>Apply Funding?</span>


                        <RadioGroup row aria-label="apply-funding" name="row-radio-buttons-group">
                            <FormControlLabel value="Y" control={<Radio checked={isEditBatchInvoiceModelOpen ? editApplyFunding : selectedFields.needToApplyFunding} onClick={handleApplyFunding} />} label="Yes" />
                            <FormControlLabel value="N" control={<Radio checked={isEditBatchInvoiceModelOpen ? !editApplyFunding : !selectedFields.needToApplyFunding} onClick={handleApplyFunding} />} label="No" />
                        </RadioGroup>
                    </div>
                </div>
            </div>
            <div className="createEditInvoicesModel__bodyLeftBorder createBatchInvoiceModel__bodySpacing">
                <div className="createBatchInvoiceModel__bodyLeftBottomHeader">
                    <span>Credit and Sequence Details</span>
                    <InfoIcon className="createEditInvoicesModel__infoIcon" />
                </div>
                <div>
                    <span>Sequential or Back Date?</span>


                    <RadioGroup row aria-label="apply-funding" name="row-radio-buttons-group">
                        <FormControlLabel value="S" control={<Radio checked={isEditBatchInvoiceModelOpen ? editIsSequential : selectedFields.isSequentialSelected} onClick={handleSequentialChange} />} label="Sequential" />
                        <FormControlLabel value="B" control={<Radio checked={isEditBatchInvoiceModelOpen ? !editIsSequential : !selectedFields.isSequentialSelected} onClick={handleSequentialChange} />} label="Back Date" />
                    </RadioGroup>
                </div>


                {(!selectedFields.isSequentialSelected || (isEditBatchInvoiceModelOpen && !editIsSequential)) &&
                    <div>
                        <span>Combine with previous batch or issue new batch?</span>
                        <RadioGroup row aria-label="combine-previous-batch" name="row-radio-buttons-group">
                            <FormControlLabel value="P" control={<Radio checked={isEditBatchInvoiceModelOpen ? editIsPrevious : selectedFields.isPreviousBatch} onClick={handlePreviousBatch} />} label="Previous Batch" />
                            <FormControlLabel value="N" control={<Radio checked={isEditBatchInvoiceModelOpen ? !editIsPrevious : !selectedFields.isPreviousBatch} onClick={handlePreviousBatch} />} label="New batch" />
                        </RadioGroup>
                    </div>
                }

            </div>
        </div>
    )
}


function CreateEditBatchOfInvoicesModelBodyRight(props) {
    const { selectedFields, isEditBatchInvoiceModelOpen } = useSelector(state => state.createEditBatchInvoiceModel);
    const dispatch = useDispatch();
    const { editInvoiceData, setEditInvoiceData } = props;

    const history = useHistory();
    const collectionId = history.location.search?.split("=")[1];

    const [batchList, setBatchList] = useState([]);
    const [isBatchListLoading, setIsBatchListLoading] = useState(false);

    const editIsSequential = editInvoiceData[0]?.SEQUENTIAL_OR_BACKDATE === "S";

    const getEditApplyChange = () => {
        let found = [];
        found = batchList?.filter((batch) => batch.ID === editInvoiceData[0]?.PREVIOUS_INVOICE_BATCH_NUMBER);

        if (found.length === 0) {
            found.DESCRIPTION = "";
            return found;
        }
        return found;
    }

    const editApplyChange = getEditApplyChange();

    const editInvoiceCurrentDate = editInvoiceData[0]?.INVOICE_DATE_CURRENT ? new Date(editInvoiceData[0].INVOICE_DATE_CURRENT) : new Date();
    /*----------------------handle change----------------------- */

    const handleApplyChange = (event, value) => {
        if (isEditBatchInvoiceModelOpen) {
            const newEditInvoiceData = [...editInvoiceData];
            newEditInvoiceData[0].PREVIOUS_INVOICE_BATCH_NUMBER = value;
            setEditInvoiceData(newEditInvoiceData);
        } else if (!isEditBatchInvoiceModelOpen) {
            const newSelectedFields = { ...selectedFields };
            newSelectedFields.applyChange = value;
            dispatch(setSelectedFieldsAction(newSelectedFields));
        }

    }

    const handleInvoiceDateCurrent = (date) => {
        if (isEditBatchInvoiceModelOpen) {
            const newEditInvoiceData = [...editInvoiceData];
            newEditInvoiceData[0].INVOICE_DATE_CURRENT = date;
            setEditInvoiceData(newEditInvoiceData);

        } else if (!isEditBatchInvoiceModelOpen) {
            const newSelectedFields = { ...selectedFields };
            newSelectedFields.invoiceDateCurrent = date;
            dispatch(setSelectedFieldsAction(newSelectedFields));
        }


    }
    /*---------------------------------------------------------- */


    /*-------------------------api calls------------------------ */


    const getBatchListApi = async () => {
        try {
            setIsBatchListLoading(true)
            const response = await apiCall({
                method: 'get',
                url: '/GetInvoiceBatchList',
                params: {
                    collectionId
                }
            })

            setBatchList(response);
            setIsBatchListLoading(false)
        } catch (error) {
            setIsBatchListLoading(false)
        }
    }

    const getCollectionInvoiceBatchNoApi = async () => {
        try {
            const response = await apiCall({
                method: 'get',
                url: '/GetCollectionInvoiceBatchNo',
                params: {
                    collectionId
                }
            })

            const newSelectedFields = { ...selectedFields };
            newSelectedFields.invoiceBatchNumberCurrent.push(response[0]);

            dispatch(setSelectedFieldsAction(newSelectedFields));
        } catch (error) {
            // api ailed
            console.log("getCollectionInvoiceBatchNoApi Failed");
        }
    }

    const getLastBatchDetails = async () => {
        try {
            const response = await apiCall({
                method: 'get',
                url: '/GetLastBatchDetails',
                params: {
                    collectionId
                }
            })

            const newSelectedFields = { ...selectedFields };
            newSelectedFields.lastBatchDetails = response;
            dispatch(setSelectedFieldsAction(newSelectedFields))
        } catch (error) {

        }
    }

    /*---------------------------------------------------------- */
    const getDetails = async () => {
        await getCollectionInvoiceBatchNoApi();
        await getLastBatchDetails();
    }

    useEffect(() => {
        getDetails();
        getBatchListApi();
    }, [])

    return (
        <div className="createBatchInvoiceModel__bodyRight">

            {(!selectedFields.isSequentialSelected || (isEditBatchInvoiceModelOpen && !editIsSequential)) && <div className="createEditInvoicesModel__bodyLeftBorder createBatchInvoiceModel__bodySpacing ">
                <CustomAutoComplete
                    text="Apply Change and Reprint Batch"
                    loading={isBatchListLoading}
                    options={batchList}
                    onOpen={() => {
                        setIsBatchListLoading(true)
                    }}
                    onClose={() => {
                        setIsBatchListLoading(false)
                    }}
                    value={isEditBatchInvoiceModelOpen ? editApplyChange[0]?.DESCRIPTION : selectedFields?.applyChange?.DESCRIPTION}
                    onChange={handleApplyChange}
                />

            </div>
            }
            <div className="createBatchInvoiceModel__bodySpacing ">
                <div className="createBatchInvoiceModel__bodyRightInvoiceDatePrevious">

                    <span>Invoice Date Previous:</span>
                    <span>{isEditBatchInvoiceModelOpen ? "" : selectedFields.lastBatchDetails[0]?.LAST_BATCH_DATE}</span>
                </div>

                <div className="createBatchInvoiceModel__bodyRightInvoiceDateCurrent">
                    <span>Invoice Date Current</span>
                    <LocalizationProvider dateAdapter={AdapterDateFns}>
                        <DesktopDatePicker
                            inputFormat="dd-MMM-yyyy"
                            value={isEditBatchInvoiceModelOpen ? editInvoiceCurrentDate : selectedFields?.invoiceDateCurrent}
                            onChange={handleInvoiceDateCurrent}
                            renderInput={(params) => <TextField size="small" {...params} />}
                        />
                    </LocalizationProvider>
                </div>

                <div className="createBatchInvoiceModel__bodyRightInvoiceBatchNumberPrevious">
                    <span>Invoice Batch Number Previous:</span>
                    <span>{isEditBatchInvoiceModelOpen ? "" : selectedFields.lastBatchDetails[0]?.LAST_BATCH_NO}</span>
                </div>

                <div className="createBatchInvoiceModel__bodyRightInvoiceBatchNumberCurrent">
                    <span>Invoice Batch Number Current</span>
                    <TextField size="small" id="outlined-basic" variant="outlined" disabled={true} value={isEditBatchInvoiceModelOpen ? editInvoiceData[0]?.CURRENT_INVOICE_BATCH_NUMBER : selectedFields?.invoiceBatchNumberCurrent[0]?.INVOICE_BATCH_NO} />
                </div>

            </div>
        </div>
    )
}


function CustomAutoComplete(props) {

    const { text, loading, onOpen, onClose, options, value, onChange } = props;


    return (
        <div className="createBatchInvoiceModel__bodyAutoComplete">
            <span>{text}</span>
            <Autocomplete
                disablePortal
                id="controllable-autocomplete"
                getOptionLabel={option => (typeof option === 'string' ? option : option?.DESCRIPTION) || ''}
                options={options}
                loading={loading}
                onOpen={onOpen}
                onClose={onClose}
                onChange={onChange}
                size="small"
                sx={{ width: 300 }}
                value={value ?? ""}
                renderInput={(params) => <TextField
                    {...params}
                    InputProps={{
                        ...params.InputProps,
                        endAdornment: (
                            <Fragment>
                                {loading ? <CircularProgress color="inherit" size={20} /> : null}
                                {params.InputProps.endAdornment}
                            </Fragment>
                        ),
                    }}
                />}
            />
        </div>

    )
}

