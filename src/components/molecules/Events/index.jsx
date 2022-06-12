import { Button, Stack } from "@mui/material";
import './Events.css';
import downArrow from '../../../assets/custom-icons/icons8-expand-arrow-50.png';
import DataGrid from 'react-data-grid';
import { Loader } from '../../atoms';
import { EVENTS_COLUMNS, inputFieldValues } from './constants';
import { useSelector, useDispatch } from 'react-redux'
import {useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import {
    eventPopupCloseAction,
    setSelectedEventsRowsDataAction,
} from './logic'
import useLazyLoad from '../../../hooks/useLazyLoad';
import { EventModel } from "./EventModel";
import {getManualEventBatchNumber} from './logic';



export function Events() {
    const [initialState,setInitialState] = useState(inputFieldValues);
    const dispatch = useDispatch(); 
    const onClick = (data2) => {
        dispatch(eventPopupCloseAction(true));
        console.log(data2)
        
        setInitialState(prevState => ({...prevState,MANUAL_EVENT_BATCH_NO : data2[0].MANUAL_EVENT_BATCH_NO}))
    };

    const closeModel = () => {
        dispatch(eventPopupCloseAction(false));
    };

    const { showModel } = useSelector(state =>state.createEventModel);

    console.log('show model: ',showModel,initialState);

    return (
        <div>
            <EventOptions onClick={onClick} />
            {showModel && <EventModel open={showModel} initialState={initialState} close={closeModel} />}
        </div>
    )
}


function EventOptions(props) {
    const dispatch = useDispatch();
    const history = useHistory();
    const [isEventLoading, setIsEventLoading] = useState(false);
    const collectionId = history.location.search?.split("=")[1];
    const [selectedRows, setSelectedRows] = useState(new Set());
    const selectedRowsSize = selectedRows.size;
    const {onClick} = props;
    const {loading2, error2,data2=[], flag2 } = useSelector(state => state.searchManualEventBatchNumberReducer)

    /*----------------------------handle click-------------------------- */

    const handleCreateEvent = () => {
        onClick(data2);
    }

    const handleClearFilter = () => {
        setSelectedRows(new Set());
        dispatch(setSelectedEventsRowsDataAction([]));
    }

    const handleSelectedRowsChange = (row) => {
        setSelectedRows(row);
        const ids = Array.from(row);
        const found = rowsData?.filter((row, index) => row.ROW_NUM === ids[index]);
        dispatch(setSelectedEventsRowsDataAction(found)); // need to optimize this in a better way
    }

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

    /*------------------------------useEffect--------------------------- */

    useEffect(async () => {
        await dispatch(getManualEventBatchNumber())
        
    },[])

    console.log('batchnumber: ', data2)

    /*------------------------------------------------------------------ */

    return (
        <div>
            <div className="eventOptions__container">
                <div >
                    <Button className="eventHome__button eventOptions__buttonMarginRight" size="small"  >Customize Table <img src={downArrow} className="invoiceOptions__downArrow" alt="down-arrow" /></Button>
                    <Button className="eventHome__button eventOptions__buttonMarginRight" size="small" disabled={!selectedRowsSize} onClick={handleClearFilter} >Clear Filter</Button>
                    <span className="eventOptions__rowsText">{selectedRowsSize > 0 ? `${selectedRowsSize} Rows` : ""}</span>
                </div>

                <div>
                    <Button className="eventHome__button eventOptions__buttonMarginRight" size="small" disabled={!selectedRowsSize} >Data Refresh</Button>
                    <Button className="eventHome__button eventOptions__buttonMarginRight" size="small" disabled={!selectedRowsSize} >Delete</Button>
                    <Button className="eventHome__darkButton" size="small" onClick={handleCreateEvent} >Create Event</Button>
                </div>
            </div>

            <Stack mt={3} spacing={2} >
                <DataGrid
                    rowHeight={40}
                    headerRowHeight={60}
                    checkboxSelection
                    onScroll={handleScroll}
                    otherFunctions={{ }}
                    noRowsFallback={<Loader loading={isEventLoading} error={"No Data"} noData={true} style={{ height: 200, position: 'sticky', left: 0 }} />}
                    style={{ height: 'calc(85vh - 135px - 9em)' }}
                    rowKeyGetter={row => row.ROW_NUM}
                    columns={EVENTS_COLUMNS}
                    rows={rowsData}
                    selectedRows={selectedRows}
                    onSelectedRowsChange={handleSelectedRowsChange}
                />
            </Stack>
        </div>
    )
}