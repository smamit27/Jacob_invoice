import { Button, Dialog } from "@mui/material";
import './Events.css'
import useLazyLoad from '../../../hooks/useLazyLoad'
import DataGrid from 'react-data-grid';
import React, { useEffect, useState, memo, useRef } from 'react'
import useIntialSelector from '../../../hooks/useIntialSelctor'
import { useSelector } from 'react-redux'
import { useDispatch} from 'react-redux'

import { generateRandomString } from '../../../helpers';
import NoDataFound from '../../atoms/NoDataFound'
import { Stack } from '@mui/material'
import { Loader } from '../../atoms'
import { columns, eventBasicInputFields, inputFieldValues } from './constants'
import { parse } from "date-fns";
import { apiCall } from '../../../services/httpService'

import {
    Select,
    MenuItem,
    TextField,
} from "@mui/material";
import { DesktopDatePicker } from '@mui/lab';
import {getProjectNumbers, getInvoiceBillingPeriods} from './logic';


const options = [
    { id: "1", value: "Spring", label: "Spring" },
    { id: "2", value: "Summer", label: "Summer" },
    { id: "3", value: "Autumn", label: "Autumn" },
    { id: "4", value: "Winter", label: "Winter" }
  ];

export function EventModel(props) {
    let open = props.open;

    const { loading, error, data = [], flag } = useIntialSelector('travelTable')
    const [columnsData, setColumnsData] = useState(columns)
    const [selectedRows, setSelectedRows] = useState(new Set())
    const collectionId = useSelector(state => state.getCollectionId)
    const prevSaveData = useRef([])
    const [saveData, setSaveData] = useState([])
    const { data: currencyOptions } = useSelector(state => state.getCurrency)
    const [rowsData, setRowsData] = useState([])
    const [basicInputFieldsValues, setBasicInputFieldsValues] = useState(props.initialState)
    const [isValid, setIsValid] = useState(false)
    const [isOnEdit, setIsOnEdit] = useState(false)
    const [valid, setValid] = useState(false)
    const [total, setTotal] = useState(0);
    const [start, setStart] = useState(null)
    const [end, setEnd] = useState(null)
    const [billingPeriod,setBillingPeriod] = useState([])
    const [summaryRows, setSummaryRows] = useState([{
        id: 'total_0',
        key: 'TOTAL',
        name:'Total',
        totalCount: total,
    },
    {
        id: 'total_1',
        totalCount: total,
    }]);
    const {loading1, error1,data1=[], flag1 } = useSelector(state => state.searchProjectNumberIdReducer)
    const {loading3, error3,data3=[], flag3 } = useSelector(state => state.searchBillingPeriodsReducer)
  const dispatch = useDispatch()
    let batchNumber;
    // const summaryRows = useMemo(() => {
    //     const summaryRow: SummaryRow = {
    //       id: 'total_0',
    //       totalCount: rows.length,
    //       yesCount: rows.filter((r) => r.available).length
    //     };

    const { handleScroll } = useLazyLoad({
        params: {
            collectionId,
            moduleId: props.moduleId || 24,
            orderBy: 1,
        },
        url: '/GetTravelDetails',
        rows: data,
        rowAdditionalData: {
            level: 1
        }
    });

    useEffect(async () => {
            await dispatch(getProjectNumbers({
                CollectionId:1685,
                SearchString:'s'
            }))
      }, [])

    useEffect(async () => {
            await dispatch(getInvoiceBillingPeriods({
                CollectionId:1685,
            }));
      }, [])
      
    // useEffect(() => {
    //     if(rowsData.length!=0) {
    //          
    //        const updatedRow = rowsData?.map(d =>  {
    //             const PROJECT_NUMBER = d.PROJECT_NUMBER?d.PROJECT_NUMBER:'';
    //             const response =  apiCall({
    //                 method: 'get',
    //                 url: '/GetCurrencyProjectDetails',
    //                 params: {PROJECT_NUMBER:PROJECT_NUMBER},
    //               })

    //              return d.PROJECT_NUMBER?{...d,CURRENCY:response?.PROJECT_CURRENCY_CODE?response?.PROJECT_CURRENCY_CODE:'' }:d;

    //         })
    //          
    //         setRowsData(updatedRow)
    //     }
    //      
    // },[rowsData])

   
    // useEffect(() => {
    //     const response = apiCall({
    //         method: 'get',
    //         url: '/GetProjectNumbersDetails',
    //         params: payload
    //       })
         
    //     //    const rateGroupOptions = rateGroupData.map(d => ({ id: d.ID, description: d.Description }))
    //     //   setColumnsData(columnsData.map(d => d.key === 'RATE_GROUP_OVERRIDE' ? {...d, valueOptions: rateGroupOptions } : d))
    //     //   dispatch(rateGroupTableFlagResetAction())
     
    //   }, [])

    useEffect(() => {
        setSummaryRows ([{
            id: 'total_0',
            INVOICE_AMOUNT: total,
            name:'Total1'
        },
        {
            id: 'total_1',
            INVOICE_AMOUNT: total,
            name:'Total2'
        }])
    },[])

    useEffect(() => {
        if(rowsData && rowsData.length) {
            const total = rowsData.reduce((partialSum, row) => partialSum + parseFloat(row.INVOICE_AMOUNT ?? 0 ), 0);
            setTotal(total);
            
            setSummaryRows(prevState => prevState.map(row => ({...row, INVOICE_AMOUNT: total})))
        } else {
            setTotal(0);
        }
    },[rowsData]);

    function onCellMenuItemClick(type, row) {
        const { id, COLLECTION_ID } = row
        if (type === 'add-row') {
            const newData = [...rowsData]
            const index = newData.findIndex(d => d.id === id)
            const tempRow = {
                id: generateRandomString(), name: '', key: '',
            }
            createSaveData(tempRow, 'I')
            newData.splice(index + 1, 0, tempRow)
            setRowsData(newData);
            console.log('rows Data: ', rowsData);
        }
    }

    useEffect(() => {
        if (Object.values(basicInputFieldsValues).every((e) => e)) {
            setIsValid(true)
        } else {
            setIsValid(false)
        }
    }, [basicInputFieldsValues])

    const onAddNewRow = () => {
        const tempRow = {
            id: generateRandomString(),
            name: '',
            key: '',
        };
        createSaveData(tempRow, 'I')
        setRowsData([tempRow, ...rowsData]);
        console.log('add rows Data: ', rowsData);
    };


    function createSaveData(row, type = '') {
        const oldSaveData = [...prevSaveData.current]
        const oldData = oldSaveData.find(d => d.id === row.id)
        const filterData = oldSaveData.filter(d => d.id !== row.id)
        const newSaveData = [
            ...filterData,
            ...(type !== 'D' ? [{ ...row, SAVE_MODE: type || oldData?.SAVE_MODE || 'U' }] : [])
        ]
        prevSaveData.current = [...newSaveData]
        setSaveData(newSaveData)
    }

    const onRowsChange = (newRows, ...args) => {
        // 
        setRowsData(newRows);
        console.log('rows Data: ', rowsData);

    }
    function rowKeyGetter(row) {
        return row.id;
    }
    function onSelectedRowsChange(val) {
        // 
        setSelectedRows(val)
    }

    const handleCancel = () => {
        props.close();
    }

    const getChange = async (editedRow, key) => {
        let updatedRow = {
            ...editedRow
        }
        try {
            const newData = [...rowsData]
            let index = newData.length === 1 ? newData[0].id : newData.findIndex(d => d.id === editedRow.ID) 
            var currency = [];
            if (key === 'PROJECT_NUMBER') {
                console.log('on change project number',editedRow.PROJECT_NUMBER)
                
                const responseCurrency =async () => {
                    try {

                        const response = await apiCall({
                            method: 'get',
                            url: '/GetCurrencyProjectDetails',
                            params: {ProjectNumber:editedRow.PROJECT_NUMBER},
                          })
                          console.log('response currency',response)
                          return response;
                    } catch(error) {

                        console.log(error)
                    }
                   
                }
              responseCurrency().then((cur) => {
                
                console.log(cur)
                let updatedValue = rowsData.map(obj => {
                    if(obj.id === index){
                        
                        return {...obj,'PROJECT_NUMBER':editedRow.PROJECT_NUMBER,'CURRENCY':cur[0]?.PROJECT_CURRENCY_CODE}
                    } else {
                        return obj
                    } } )
                    
                    setRowsData(updatedValue)

                console.log('rows Data: ', rowsData);
              })
                   
                // setRowsData((prevState) => [...prevState,prevState.filter(obj => obj.id === index)[0]['PROJECT_NUMBER'] = editedRow.ID]);
                
            }
            if (key === 'TASK_NUMBER') {
                // setRowsData((prevState) => [...prevState,prevState.filter(obj => obj.id === index)[0]['PROJECT_NUMBER'] = editedRow.ID]);
                let updatedValue = rowsData.map(obj => {
                    if(obj.id === index){
                        
                        return {...obj,'TASK_NUMBER':editedRow.TASK_NUMBER}
                    } else {
                        return obj
                    } } )
                    
                    setRowsData(updatedValue)

                console.log('rows Data: ', rowsData);
            }
            if (key === 'VENDOR_NAME') {
                
                // setRowsData((prevState) => [...prevState,prevState.filter(obj => obj.id === index)[0]['PROJECT_NUMBER'] = editedRow.ID]);
                let updatedValue = rowsData.map(obj => {
                    if(obj.id === index){
                        
                        return {...obj,'VENDOR_NAME':editedRow.VENDOR_NAME,'VENDOR_NUMBER':editedRow.VENDOR_NUMBER}
                    } else {
                        return obj
                    } } )
                    
                    setRowsData(updatedValue)

                console.log('rows Data: ', rowsData);
            }
            // if (key === 'VENDOR_NUMBER') {
            //     // setRowsData((prevState) => [...prevState,prevState.filter(obj => obj.id === index)[0]['PROJECT_NUMBER'] = editedRow.ID]);
            //     let updatedValue = rowsData.map(obj => {
            //         if(obj.id === index){
                        
            //             return {...obj,'VENDOR_NUMBER':editedRow.VENDOR_NUMBER}
            //         } else {
            //             return obj
            //         } } )
                    
            //         setRowsData(updatedValue)

            //     console.log('rows Data: ', rowsData);
            // }
            if (key === 'PO_NUMBER') {
                // setRowsData((prevState) => [...prevState,prevState.filter(obj => obj.id === index)[0]['PROJECT_NUMBER'] = editedRow.ID]);
                let updatedValue = rowsData.map(obj => {
                    if(obj.id === index){
                        
                        return {...obj,'PO_NUMBER':editedRow.PO_NUMBER}
                    } else {
                        return obj
                    } } )
                    
                    setRowsData(updatedValue)

                console.log('rows Data: ', rowsData);
            }
        } catch (error) {

        }
        createSaveData(updatedRow)
    }

    const onCellBlur = (val, key) => {
        console.log(val, key);
    }

    const onDelete = () => {
        const temp = Array.from(selectedRows)
        const deleteData = [...rowsData].filter(d => temp.includes(d.id))
        const newData = [...rowsData].filter(d => !temp.includes(d.id))
        setRowsData(newData);
        console.log('rows Data: ', rowsData);
        deleteData.map(row => createSaveData(row, 'D'))
    }

    const onEventBasicInputFieldChange = (e) => {
         
        setBasicInputFieldsValues(prevState => ({
            ...prevState,    
            [e.target.name]: e.target.value      
        }))
    }
    const onEditClick = () => {
        setIsOnEdit(true)
        setIsValid(isValid)
    }

    const onDateChange = (val) => {
        setBasicInputFieldsValues(prevState => ({
            ...prevState,   
            EVENT_DATE: val      
        }))
    }
    const onDateChangeBtd = (val) => {
        setBasicInputFieldsValues(prevState => ({
            ...prevState,   
            BILLING_THROUGH_DATE: val      
        }))
    }

    const onNextClick = () => {
        const rateGroupOptions = data1.map(d => ({ id: d.ID, description: d.PROJECT_NUMBER }))
        
         setColumnsData(columnsData.map(d => d.key === 'PROJECT_NUMBER' ? {...d, valueOptions: rateGroupOptions } : d))
        if (isValid) {
            setIsOnEdit(false)
        }
        setValid(isValid);
    }

    console.log('api: ', data1)
    console.log('rowsData',rowsData)

    const renderNoData = () => (
        <NoDataFound>
            <Stack spacing={3} mt={2.5} alignItems="center" >
                <div>Oops! There  are no events info yet! Please add events info. </div>
                <div>
                    <Button size="small" variant="contained" color="secondary" onClick={onAddNewRow} >Add</Button>
                </div>
            </Stack>
        </NoDataFound>
    )
    const renderEmptyData = () => (
        <NoDataFound>
            <Stack spacing={3} mt={2.5} alignItems="center" >
                <div>Oops! There  are no events info yet! Please add events info. </div>
            </Stack>
        </NoDataFound>
    )

 
    console.log('state: ', basicInputFieldsValues);
    console.log('billingPeriods',data3);
    console.log('summaryRows',summaryRows)
    return (
        <Dialog open={open} fullWidth={true} maxWidth='lg'>
            <div >
                <div className="createEventModel__header">
                    <span className="createEventModel__headerText">Create Event</span>
                </div>
                <div className="createEventModel__body">
                    <div className="createEventModel__optionsContainer">
                        <span>
                            1 Event Basics
                        </span>
                    </div >
                    <div className="eventBasicsSectionContainer1">
                        <div className="eventBasicsSection1">
                            {eventBasicInputFields.map((row) => (<div key={row.id}>
                                <span>{row.name}</span>
                                {(!valid || isOnEdit) && (row.type ==='text')  && <input
                                    className="inputFields"
                                    value={basicInputFieldsValues[row?.id]}
                                    disabled={row.disabled}
                                    name={row.id}
                                    onChange={(event) => onEventBasicInputFieldChange(event)}
                                    type={row.type}
                                    required={row.required}
                                />}
                                  {(!valid || isOnEdit) && row.type ==='select' && 
                                   <div id="inputFields">
                                   <Select displayEmpty fullWidth name={row.id} value={basicInputFieldsValues[row?.id]} onChange={e => onEventBasicInputFieldChange(e)} size="small">
                                       {data3.map((d, i) => (
                                           <MenuItem key={i} value={d.DESCRIPTION}>
                                               {d.DESCRIPTION}
                                           </MenuItem>
                                       ))}
                                   </Select>
                                   </div>}
                                  {(!valid || isOnEdit) && row.type ==='date' && row.id === 'EVENT_DATE' &&
                                    <div id="inputFields">
                                   <DesktopDatePicker
                                   className="inputFields"
                                   size="small"
                                   value={basicInputFieldsValues[row?.id]}
                                   onChange={(val) => onDateChange(val)}
                                   renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                                   components={{OpenPickerIcon:()=><i class="las la-calendar"></i>}}
                                 />
                                 </div>}
                                  {(!valid || isOnEdit) && row.type ==='date' && row.id === 'BILLING_THROUGH_DATE' &&
                                   <div id="inputFields">
                                   <DesktopDatePicker
                                   value={basicInputFieldsValues[row?.id]}
                                   onChange={(val) => onDateChangeBtd(val)}
                                   renderInput={(params) => <TextField size="small" {...params} fullWidth />}
                                   components={{OpenPickerIcon:()=><i class="las la-calendar"></i>}}
                                 />
                                 </div>}
                                {valid && !isOnEdit &&
                                    <div><span>{basicInputFieldsValues[row?.id].toString()}</span></div>
                                }
                            </div>))}

                        </div >
                        {valid && !isOnEdit &&
                            <Button className="addRow" size="small" variant="contained" color="secondary" onClick={onEditClick} >Edit</Button>
                        }
                    </div>
                    <Button className="eventPopup__darkButton" disabled={!isValid} size="small" onClick={onNextClick}>Next</Button>

                </div>
                <div className="createEventModel__body">
                    <div className="createEventModel__optionsContainer">
                        <span>
                            2 Event Transactions
                        </span>
                        <Button disabled={!selectedRows.size} variant="contained" color="secondary" onClick={onDelete} >Delete</Button>

                    </div >
                    {(!valid || isOnEdit) && renderEmptyData()}
                    {valid && !isOnEdit &&
                        <div className="eventTasksSection">
                            {false && <div className="configurationSection"><span>Create a new configuration</span></div>}
                            <Stack mt={3} spacing={2} >
                                <DataGrid
                                    className='eventGrid'
                                    onScroll={handleScroll}
                                    otherFunctions={{ onCellMenuItemClick, getChange, onCellBlur }}
                                    rowHeight={40}
                                    noRowsFallback={<Loader loading={loading} error={error} noData={true} noDataComponent={renderNoData} style={{ maxHeight: '70vh', position: 'sticky', left: 0 }} />}
                                    onRowsChange={onRowsChange}
                                    headerRowHeight={60}
                                    rowKeyGetter={rowKeyGetter}
                                    selectedRows={selectedRows}
                                    onSelectedRowsChange={onSelectedRowsChange}
                                    columns={columnsData}
                                    summaryRows={summaryRows}
                                    rows={rowsData}
                                />
                                {rowsData && rowsData.length && <div>
                                    TOTAL: {total}
                                </div>}
                            </Stack>

                        </div >
                    }

                    <div className="postInvoicesModel__buttonContainer">
                        <Button className="addRow" size="small" variant="contained" color="secondary" onClick={onAddNewRow} >Add</Button>
                        <Button size="small" variant="contained" color="secondary" onClick={handleCancel}>Cancel</Button>
                    </div>
                </div>
            </div>

        </Dialog>

    )
}
