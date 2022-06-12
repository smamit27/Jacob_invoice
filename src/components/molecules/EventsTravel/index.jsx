import { Button, Stack } from "@mui/material";
import './Events.css';
import downArrow from '../../../assets/custom-icons/icons8-expand-arrow-50.png';
import DataGrid from 'react-data-grid';
import { Loader } from '../../atoms';
import { EVENTS_COLUMNS } from './constants';
import { useSelector, useDispatch } from 'react-redux'
import {useState } from "react";
import { useHistory } from "react-router-dom";
import {
    eventPopupCloseAction,
    setSelectedEventsRowsDataAction,
} from './logic'
import useLazyLoad from '../../../hooks/useLazyLoad';
import { EventModel } from "./EventModel";


export function Events() {
    const dispatch = useDispatch();

    const onClick = () => {
        dispatch(eventPopupCloseAction(true));
    };

    const closeModel = () => {
        dispatch(eventPopupCloseAction(false));
    };

    const { showModel } = useSelector(state =>state.createEventModel);

    console.log('show model: ',showModel);

    return (
        <div>
            <EventOptions onClick={onClick} />
            {showModel && <EventModel open={showModel} close={closeModel} />}
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

    /*----------------------------handle click-------------------------- */

    const handleCreateEvent = () => {
        onClick();
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
                    <Button className="eventHome__darkButton" size="small" onClick={handleCreateEvent} >Create Template</Button>
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