import { Button } from "@mui/material";
import './InvoiceHome.css';
import downArrow from '../../../assets/custom-icons/icons8-expand-arrow-50.png';
import DataGrid from 'react-data-grid';
import { Loader } from '../../atoms';
import { INVOICE_HOME_COLUMNS } from './constants';
import { useSelector, useDispatch } from 'react-redux'
import CreateAndPostBatchOfInvoicesModel from './CreateAndPostBatchOfInvoicesModel';
import { CreateEditBatchOfInvoicesModel } from "./CreateEditBatchOfInvoicesModel";
import { useEffect, useState } from "react";
import { apiCall } from '../../../services/httpService';
import { useHistory } from "react-router-dom";
import {
    createPostBatchInvoiceModelOpenAction,
    editBatchInvoiceModelOpenAction,
    splitInvoiceModelOpenAction,
    setSelectedBatchOfInvoicesAction,
    getBatchOfInvoicesInitialAction,
    setBatchOfInvoicesAction,
    getBatchOfInvoicesFailureAction,
    setSelectedInvoiceRowsDataAction
} from './logic'
import useLazyLoad from '../../../hooks/useLazyLoad';
import { SplitInvoices } from './SplitInvoices';
import { batch } from 'react-redux'
import { errorStatusNotificationAction } from '../StatusNotification/logic';

export function InvoiceHome() {
    const { isCreatePostBatchInvoiceModelOpen } = useSelector(state => state.createBatchInvoiceModel);
    return (
        <div>
            <InvoiceOptions />
            {isCreatePostBatchInvoiceModelOpen && <CreateAndPostBatchOfInvoicesModel />}
            <CreateEditBatchOfInvoicesModel />
            <SplitInvoices />
        </div>
    )
}


function InvoiceOptions() {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isInvoiceHomeDetailsLoading, setIsInvoiceHomeDetailsLoading] = useState(false);

    const collectionId = history.location.search?.split("=")[1];
    const { selectedBatchOfInvoices } = useSelector(state => state.createBatchInvoiceModel);

    const [selectedRows, setSelectedRows] = useState(new Set());
    const selectedRowsSize = selectedRows.size;


    /*----------------------------handle click-------------------------- */

    const onInvoiceHomeDetailsClick = async (row) => {
        await getInvoicePopulateHomeDataApi();
        const newSelectedRows = new Set(selectedBatchOfInvoices);
        newSelectedRows.add(row.CURRENT_INVOICE_BATCH_NUMBER);

        batch(() => {
            dispatch(setSelectedBatchOfInvoicesAction(newSelectedRows))
            dispatch(editBatchInvoiceModelOpenAction());
        })

    }

    const handleCreateBatch = () => {
        handleClearFilter();
        dispatch(createPostBatchInvoiceModelOpenAction());
    }

    const handleClearFilter = () => {
        setSelectedRows(new Set());
        dispatch(setSelectedInvoiceRowsDataAction([]));
    }

    const handleSelectedRowsChange = (row) => {
        setSelectedRows(row);
        const ids = Array.from(row);
        const found = rowsData?.filter((row, index) => row.ROW_NUM === ids[index]);
        dispatch(setSelectedInvoiceRowsDataAction(found)); // need to optimize this in a better way
    }

    const handleSave = async () => {
        await saveInvoiceHomeData();
        await getInvoiceHomeDetailsApi();
    }

    const handleSplitInvoice = () => {
        dispatch(splitInvoiceModelOpenAction())
    }

    /*------------------------------------------------------------------ */



    /*------------------------api calls here---------------------------- */
    const { rowsData, setRowsData, handleScroll, resetFrom } = useLazyLoad({
        params: {
            collectionId,
            pageIndex: 0,
            pageSize: 10,
            orderBy: 1,
        },
        method: 'get',
        url: '/GetInvoiceHomeDetails',
        size: 10,

    })


    const getInvoiceHomeDetailsApi = async () => {
        try {

            setIsInvoiceHomeDetailsLoading(true)
            const response = await apiCall({
                method: 'get',
                url: '/GetInvoiceHomeDetails',
                params: {
                    collectionId,
                    pageIndex: 0,
                    pageSize: 10,
                    orderBy: 1,
                }
            })

            setIsInvoiceHomeDetailsLoading(false)
            setRowsData(response)
        } catch (error) {
            setIsInvoiceHomeDetailsLoading(false)
        }

    }

    const saveInvoiceHomeData = async () => {
        try {
            // save mode options only required for backend purpose
            //i insert
            // u update
            const data = rowsData.map((row) => {
                return {
                    "lasT_CLIENT_INVOICE_NUMBER": row.LAST_CLIENT_INVOICE_NUMBER,
                    "currenT_AR_DRAFT_INVOICE_NO": row.CURRENT_AR_DRAFT_INVOICE_NO,
                    "currenT_CLIENT_INVOICE_NUMBER": row.CURRENT_CLIENT_INVOICE_NUMBER,
                    "lasT_BATCH_NUMBER": row.LAST_BATCH_NUMBER,
                    "currenT_INVOICE_BATCH_NUMBER": row.CURRENT_INVOICE_BATCH_NUMBER,
                    "clienT_INVOICE_DATE": row.CLIENT_INVOICE_DATE,
                    "billinG_PERIODS": row.BILLING_PERIODS,
                    "saveMode": "i"
                }
            })

            const response = await apiCall({
                method: 'post',
                url: '/SaveInvoiceHomeData',
                params: {
                    collectionId
                },
                data,
            });
        } catch (error) {
            dispatch(errorStatusNotificationAction({
                type: "saveInvoiceHomeData",
                message: error.message,
            }));
        }
    }

    const getInvoicePopulateHomeDataApi = async () => { // need to right in a generic way 
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

    /*------------------------------------------------------------------ */

    /*------------------------------useEffect--------------------------- */

    useEffect(() => {
        getInvoiceHomeDetailsApi();

    }, [])

    /*------------------------------------------------------------------ */

    return (
        <div>
            <div className="invoiceOptions__container">
                <div >
                    <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small"  >Customize Table <img src={downArrow} className="invoiceOptions__downArrow" alt="down-arrow" /></Button>
                    <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" disabled={!selectedRowsSize} onClick={handleClearFilter} >Clear Filter</Button>
                    <span className="invoiceOptions__rowsText">{selectedRowsSize > 0 ? `${selectedRowsSize} Rows` : ""}</span>
                </div>

                <div>
                    <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" disabled={!selectedRowsSize} >Data Refresh</Button>
                    <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" onClick={handleSplitInvoice} disabled={!selectedRowsSize} >Split Invoice(s)</Button>
                    <Button className="invoiceHome__button invoiceOptions__buttonMarginRight" size="small" onClick={handleCreateBatch} >Create/Post Batch</Button>
                    <Button className="invoiceHome__darkButton" size="small" onClick={handleSave} >Save</Button>
                </div>
            </div>

            <div>
                <DataGrid
                    rowHeight={40}
                    headerRowHeight={60}
                    onScroll={handleScroll}
                    otherFunctions={{ onInvoiceHomeDetailsClick }}
                    noRowsFallback={<Loader loading={isInvoiceHomeDetailsLoading} error={"No Data"} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
                    style={{ height: 'calc(85vh - 135px - 9em)' }}
                    rowKeyGetter={row => row.ROW_NUM}
                    columns={INVOICE_HOME_COLUMNS}
                    rows={rowsData}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={handleSelectedRowsChange}
                />
            </div>
        </div>
    )
}